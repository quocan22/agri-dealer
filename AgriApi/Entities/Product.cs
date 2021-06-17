using System;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AgriApi.Entities
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRequired]
        public string ProductName { get; set; }
        [BsonRequired]
        public double Price { get; set; }
        [BsonRequired]
        public string Unit { get; set; }
        [BsonRequired]
        public int Quantity { get; set; }
        [BsonRequired]
        public int MinPurchase { get; set; }
        public string Description { get; set; }
        public string Introduction { get; set; }
        public string ImageName { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string UserId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string CategoryId { get; set; }
    }
}