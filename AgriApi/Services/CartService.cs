using System.Collections.Generic;
using System.Linq;
using System;
using AgriApi.Entities;
using AgriApi.Services.Identity;
using AgriApi.Models;
using MongoDB.Driver;

namespace AgriApi.Services
{
    public class CartService
    {
        private readonly IMongoCollection<Cart> _cart;
        private readonly UserService _userService;
        private readonly ProductService _productService;

        public CartService(IAgriDealDatabaseSettings settings, UserService userService, ProductService productService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _userService = userService;
            _productService = productService;

            _cart = database.GetCollection<Cart>(settings.CartCollectionName);
        }

        public List<Cart> Get() =>
            _cart.Find(cart => true).ToList();

        public Cart Get(string id) =>
            _cart.Find<Cart>(cart => cart.Id == id).FirstOrDefault();

        public List<CartDetailResponse> GetDetailCurrentCart(string userId)
        {
            var cart = _cart.Find<Cart>(cart => (cart.UserId == userId && cart.Paid == false)).FirstOrDefault();
            var detailResponse = new List<CartDetailResponse>();
            detailResponse.Clear();

            if (cart != null)
            {
                foreach (var d in cart.Details)
                {
                    var productInfo = _productService.Get(d.ProductId);
                    detailResponse.Add(new CartDetailResponse(d, productInfo));
                }
            }

            return detailResponse;
        }

        public bool AddProduct(string userId, CartDetail cartDetail)
        {
            var res = _userService.Get(userId);
            if (res == null)
            {
                return false;
            }

            var curCart = _cart.Find<Cart>(cart => (cart.UserId == userId && cart.Paid == false)).FirstOrDefault();
            
            if (curCart == null)
            {
                curCart = new Cart() {
                    UserId = userId,
                    Details = new List<CartDetail>() {cartDetail},
                    Paid = false
                };
                _cart.InsertOne(curCart);
                return true;
            }
            foreach (var d in curCart.Details)
            {
                if (d.ProductId == cartDetail.ProductId)
                {
                    d.BuyQuantity += cartDetail.BuyQuantity;
                    Update(curCart.Id, curCart);
                    return true;
                }
            }
            curCart.Details.Add(cartDetail);
            Update(curCart.Id, curCart);
            return true;
        }

        public bool RemoveProduct(string id, string productId)
        {
            var cart = Get(id);
            if (cart == null)
            {
                return false;
            }
            foreach (var d in cart.Details)
            {
                if (d.ProductId == productId)
                {
                    cart.Details.Remove(d);
                    break;
                }
            }
            if (!cart.Details.Any())
            {
                Remove(id);
                return true;
            }
            Update(id, cart);
            return true;
        }

        public bool UpdateProductAmount(string id, string productId, int newAmount)
        {
            var cart = Get(id);

            if (cart == null)
            {
                return false;
            }
            foreach (var d in cart.Details)
            {
                if (d.ProductId == productId)
                {
                    d.BuyQuantity = newAmount;
                    break;
                }
            }
            Update(id, cart);
            return true;
        }

        public bool PaidCart(string id)
        {
            var cart = Get(id);
            if (cart == null)
            {
                return false;
            }
            double totalAmount = 0;
            foreach (var d in cart.Details)
            {
                var price = _productService.Get(d.ProductId).Price;
                totalAmount += (d.BuyQuantity * price);
            }
            cart.Total = totalAmount;
            cart.Paid = true;
            _cart.ReplaceOne(cart => cart.Id == id, cart);
            return true;
        }

        public Cart Create(Cart cart)
        {
            _cart.InsertOne(cart);
            return cart;
        }

        public void Update(string id, Cart cartIn) =>
            _cart.ReplaceOne(cart => cart.Id == id, cartIn);

        public void Remove(Cart cartIn) =>
            _cart.DeleteOne(cart => cart.Id == cartIn.Id);

        public void Remove(string id) => 
            _cart.DeleteOne(cart => cart.Id == id);
    }
}