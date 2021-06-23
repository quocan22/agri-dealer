using System;
using System.Collections.Generic;
using AgriApi.Entities;
using MongoDB.Driver;

namespace AgriApi.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _product;

        public ProductService(IAgriDealDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _product = database.GetCollection<Product>(settings.ProductCollectionName);
        }

        public List<Product> Get() =>
            _product.Find(product => true).ToList();

        public Product Get(string id) =>
            _product.Find<Product>(product => product.Id == id).FirstOrDefault();

        public List<Product> GetProductByName(string name) =>
            _product.Find<Product>(product => product.ProductName.ToLower().Contains(name.ToLower())).ToList();

        public List<Product> GetProductByCate(string cateid) =>
            _product.Find<Product>(product => product.CategoryId == cateid).ToList();

        public List<Product> GetProductByUserId(string userId) =>
            _product.Find<Product>(product => product.UserId == userId).ToList();

        public Product Create(Product product)
        {
            _product.InsertOne(product);
            return product;
        }

        public bool IsExisted(string productName)
        {
            var count = _product.Find<Product>(product => product.ProductName == productName).CountDocuments();

            if (count == 0)
                return false;

            return true;
        }
        
        public byte[] GetImage(string sBase64String)
        {
            byte[] bytes = null;
            if (!string.IsNullOrEmpty(sBase64String))
            {
                bytes = Convert.FromBase64String(sBase64String);
            }
            return bytes;
        }

        public void Update(string id, Product productIn) =>
            _product.ReplaceOne(product => product.Id == id, productIn);

        public void Remove(Product productIn) =>
            _product.DeleteOne(product => product.Id == productIn.Id);

        public void Remove(string id) => 
            _product.DeleteOne(product => product.Id == id);
    }
}