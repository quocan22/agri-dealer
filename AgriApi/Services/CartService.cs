using System.Collections.Generic;
using AgriApi.Entities;
using MongoDB.Driver;

namespace AgriApi.Services
{
    public class CartService
    {
        private readonly IMongoCollection<Cart> _cart;

        public CartService(IAgriDealDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _cart = database.GetCollection<Cart>(settings.CartCollectionName);
        }

        public List<Cart> Get() =>
            _cart.Find(cart => true).ToList();

        public Cart Get(string id) =>
            _cart.Find<Cart>(cart => cart.Id == id).FirstOrDefault();

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