using AgriApi.Entities;

namespace AgriApi.Models
{
    public class ProductDetailResponse
    {
        public string Id { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string Unit { get; set; }
        public int Quantity { get; set; }
        public int MinPurchase { get; set; }
        public string Description { get; set; }
        public string Introduction { get; set; }
        public string ImageName { get; set; }
        public string UserId { get; set; }
        public string CategoryId { get; set; }
        public string ImageUrl { get; set; }

        public ProductDetailResponse(Product _product, string url)
        {
            Id = _product.Id;
            ProductName = _product.ProductName;
            Price = _product.Price;
            Unit = _product.Unit;
            Quantity = _product.Quantity;
            MinPurchase = _product.MinPurchase;
            Description = _product.Description;
            Introduction = _product.Introduction;
            ImageName = _product.ImageName;
            UserId = _product.UserId;
            CategoryId = _product.CategoryId;
            ImageUrl = url;
        }
    }
}