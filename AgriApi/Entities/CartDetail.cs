using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AgriApi.Entities
{
    public class CartDetail
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string ProductId { get; set; }
        [BsonRequired]
        public int BuyQuantity { get; set; }
    }
}