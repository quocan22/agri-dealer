using System.Collections.Generic;
using AgriApi.Entities;
using MongoDB.Driver;

namespace AgriApi.Services
{
    public class CategoryService
    {
        private readonly IMongoCollection<Category> _cate;
        public CategoryService(IAgriDealDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _cate = database.GetCollection<Category>(settings.CategoryCollectionName);
        }

        public List<Category> Get() =>
            _cate.Find(cate => true).ToList();

        public string Get(string id) =>
            _cate.Find(cate => cate.Id == id).FirstOrDefault().CategoryName; 

        public string GetCateIdByCateName(string cateName) =>
            _cate.Find(cate => cate.CategoryName == cateName).FirstOrDefault().Id;
    }
}