using System;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AgriApi.Entities
{
    public class QuotationRequest
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string UserId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string CategoryId { get; set; }
        [BsonRequired]
        public string CategoryName { get; set; }
        [BsonRequired]
        public string ProductName { get; set; }
        [BsonIgnoreIfNull]
        public int Quantity { get; set; }
        [BsonIgnoreIfNull]
        public string Unit { get; set; }
        [BsonIgnoreIfNull]
        public double WishPrice { get; set; }
        [BsonRequired]
        public string Description { get; set; }
        [BsonRequired]
        [BsonDateTimeOptions(DateOnly = true)]
        public DateTime? StartDate { get; set; }
        [BsonRequired]
        [BsonDateTimeOptions(DateOnly = true)]
        public DateTime? EndDate { get; set; }
    }
}