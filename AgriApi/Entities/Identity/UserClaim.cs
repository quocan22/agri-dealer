using System;
using System.Text.Json.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace AgriApi.Entities.Identity
{
    public class UserClaim
    {
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Displayname { get; set; }
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string PhoneNumber { get; set; }
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Address { get; set; }
        [BsonDateTimeOptions(DateOnly = true)]
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? JoinDate { get; set; }
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string AvatarUrl { get; set; }
    }
}