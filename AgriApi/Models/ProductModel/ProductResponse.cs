using System;
using AgriApi.Entities;
using System.Text.Json.Serialization;

namespace AgriApi.Models
{
    public class ProductResponse
    {
        public string Id { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string Unit { get; set; }
        public int MinPurchase { get; set; }
        public string ImageName { get; set; }
        public string ImageUrl { get; set; }
        public string SellerName { get; set; }
        public string CategoryId { get; set; }

        public ProductResponse(Product product, string sellerName, string url)
        {
            Id = product.Id;
            ProductName = product.ProductName;
            Price = product.Price;
            Unit = product.Unit;
            MinPurchase = product.MinPurchase;
            ImageName = product.ImageName;
            ImageUrl = url;
            SellerName = sellerName;
            CategoryId = product.CategoryId;
        }
    } 
}