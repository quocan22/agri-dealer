using AgriApi.Entities;
using AgriApi.Entities.Identity;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace AgriApi.Services.Identity
{
    public class UserService
    {
        private readonly IMongoCollection<User> _user;

        public UserService(IAgriDealDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _user = database.GetCollection<User>(settings.UserCollectionName);
        }

        public List<User> Get() =>
            _user.Find(user => true).ToList();

        public User Get(string id) =>
            _user.Find<User>(user => user.Id == id).FirstOrDefault();

        public bool IsExisted(string email)
        {
            var count = _user.Find<User>(user => user.Email == email).CountDocuments();

            if (count == 0)
                return false;

            return true;
        }

        public User Create(User user)
        {
            _user.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn) =>
            _user.ReplaceOne(user => user.Id == id, userIn);

        public void Remove(User userIn) =>
            _user.DeleteOne(user => user.Id == userIn.Id);

        public void Remove(string id) => 
            _user.DeleteOne(user => user.Id == id);
    }
}