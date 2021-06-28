using AgriApi.Entities;
using AgriApi.Entities.Identity;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;

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

        public User GetUserByEmail(string email) =>
            _user.Find<User>(user => user.Email == email).FirstOrDefault();

        public string GetSellerNameById(string id) =>
            _user.Find<User>(user => user.Id == id).FirstOrDefault().SellerClaims.SellerName;

        public string GetDisplayNameById(string id) =>
            _user.Find<User>(user => user.Id == id).FirstOrDefault().UserClaims.DisplayName;
        
        public string GetRepName(string id)
        {
            var user = _user.Find<User>(user => user.Id == id).FirstOrDefault();

            if (user.SellerClaims == null)
            {
                return user.UserClaims.DisplayName;
            }

            return user.SellerClaims.SellerName;
        }

        public string GetImageNameById(string id)
        {
            var user =_user.Find<User>(user => user.Id == id).FirstOrDefault();
            if (user.UserClaims.AvatarUrl == null)
            {
                return "noavatar.png";
            }
            return user.UserClaims.AvatarUrl;
        }

        public List<User> GetAllSeller() => 
            _user.Find<User>(user => user.Role == "seller").ToList();

        public string GetRole(string id) =>
            _user.Find<User>(user => user.Id == id).FirstOrDefault().Role;

        public bool IsExisted(string email)
        {
            var count = _user.Find<User>(user => user.Email == email).CountDocuments();

            if (count == 0)
                return false;

            return true;
        }

        public bool SellerNameUsed(string sellerName)
        {
            var count = _user.Find<User>(user => user.SellerClaims.SellerName == sellerName).CountDocuments();

            if (count == 0)
            {
                return false;
            }
            return true;
        }

        public User Create(User user)
        {
            user.UserClaims.JoinDate = System.DateTime.Now;
            try
            {
                _user.InsertOne(user);
                return user;
            }
            catch
            {
                return null;
            }
        }

        public void Update(string id, User userIn) =>
            _user.ReplaceOne(user => user.Id == id, userIn);

        public void Remove(User userIn) =>
            _user.DeleteOne(user => user.Id == userIn.Id);

        public void Remove(string id) => 
            _user.DeleteOne(user => user.Id == id);

        public bool Update(string id, string field, object value)
        {
            var update = Builders<User>.Update.Set(field, value);
            var res = _user.UpdateOne(user => user.Id == id, update);
            if (res.ModifiedCount == 1)
            {
                return true;
            }
            return false;
        }

        public DateTime? GetJoinDate(string id) =>
            _user.Find<User>(user => user.Id == id).FirstOrDefault().UserClaims.JoinDate;
    }
}