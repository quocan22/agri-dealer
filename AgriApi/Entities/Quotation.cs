using System;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AgriApi.Entities
{
    public class Quotation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string RequestId { get; set; }
        [BsonRequired]
        public double QuotePrice { get; set; }
        [BsonRequired]
        public string Description { get; set; }
    }
}