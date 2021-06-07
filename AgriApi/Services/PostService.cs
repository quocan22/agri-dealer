using System.Collections.Generic;
using AgriApi.Entities;
using MongoDB.Driver;

namespace AgriApi.Services
{
    public class PostService
    {
        private readonly IMongoCollection<Post> _post;

        public PostService(IAgriDealDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _post = database.GetCollection<Post>(settings.PostCollectionName);
        }

        public List<Post> Get() =>
            _post.Find(post => true).ToList();

        public Post Get(string id) =>
            _post.Find<Post>(post => post.Id == id).FirstOrDefault();

        public Post Create(Post post)
        {
            _post.InsertOne(post);
            return post;
        }

        public void Update(string id, Post postIn) =>
            _post.ReplaceOne(post => post.Id == id, postIn);

        public void Remove(Post postIn) =>
            _post.DeleteOne(post => post.Id == postIn.Id);

        public void Remove(string id) => 
            _post.DeleteOne(post => post.Id == id);
    }
}