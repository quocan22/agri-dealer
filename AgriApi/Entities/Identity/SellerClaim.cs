using System;
using System.Text.Json.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace AgriApi.Entities.Identity
{
    public class SellerClaim
    {
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string SellerName { get; set; }
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string BrandName { get; set; }
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Production { get; set; }
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Scale { get; set; }
    }
}