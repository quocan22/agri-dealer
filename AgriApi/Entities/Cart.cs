using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AgriApi.Entities
{
    public class Cart
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRequired]
        public double Total { get; set; }
        [BsonRepresentation(BsonType.DateTime)]
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? BuyDate { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string UserId { get; set; }
        [BsonRequired]
        public List<CartDetail> Details { get; set; }
        [BsonRequired]
        public bool Paid { get; set; }
    }
}