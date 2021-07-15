using AgriApi.Entities;

namespace AgriApi.Models
{
    public class CartDetailResponse
    {
        public string ProductId { get; set; }
        public int BuyQuantity { get; set; }
        public string ProductName { get; set; }
        public string ProductUnit { get; set; }
        public string ProductImage { get; set; }
        public double ProductPrice { get; set; }
        public int MinPurchase { get; set; }
        public int MaxPurchase { get; set; }

        public CartDetailResponse(CartDetail cartDetail, Product product)
        {
            ProductId = cartDetail.ProductId;
            BuyQuantity = cartDetail.BuyQuantity;
            ProductName = product.ProductName;
            ProductUnit = product.Unit;
            ProductImage = product.ImageName;
            ProductPrice = product.Price;
            MinPurchase = product.MinPurchase;
            MaxPurchase = product.Quantity;
        }
    }
}