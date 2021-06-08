using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AgriApi.Entities.Identity
{
  public class User
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonRequired]
    public string Email { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.Always)]
    [BsonRequired]
    public string PasswordHash { get; set; }
    [BsonRequired]
    public string Role { get; set; }
    [BsonIgnoreIfNull]
    public UserClaim UserClaims { get; set; }
    [BsonIgnoreIfNull]
    public SellerClaim SellerClaims { get; set; }
  }
}