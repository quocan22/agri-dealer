using System.Collections.Generic;
using AgriApi.Entities;
using MongoDB.Driver;

namespace AgriApi.Services
{
    public class CommentService
    {
        private readonly IMongoCollection<Comment> _comment;

        public CommentService(IAgriDealDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _comment = database.GetCollection<Comment>(settings.CommentCollectionName);
        }

        public List<Comment> Get() =>
            _comment.Find(comment => true).ToList();

        public Comment Get(string id) =>
            _comment.Find<Comment>(comment => comment.Id == id).FirstOrDefault();

        public List<Comment> GetByProductId(string productId) =>
            _comment.Find<Comment>(comment => comment.ProductId == productId).ToList();

        public Comment Create(Comment comment)
        {
            comment.CommentDate = System.DateTime.Now;

            try
            {
                _comment.InsertOne(comment);
                return comment;
            }
            catch
            {
                return null;
            }
        }

        public void Update(string id, Comment commentIn) =>
            _comment.ReplaceOne(comment => comment.Id == id, commentIn);

        public void Remove(Comment commentIn) =>
            _comment.DeleteOne(comment => comment.Id == commentIn.Id);

        public void Remove(string id) => 
            _comment.DeleteOne(comment => comment.Id == id);
    }
}