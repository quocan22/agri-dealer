using System;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AgriApi.Entities
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonDateTimeOptions(DateOnly = true)]
        public DateTime? PostDate { get; set; }
        public int MinQuantity { get; set; }
        public string Describe { get; set; }
        public string Introduce { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProductId { get; set; }
    }
}