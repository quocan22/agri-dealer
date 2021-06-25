using AgriApi.Entities;
using System.Text.Json.Serialization;
using System;

namespace AgriApi.Models
{
    public class QuotationRequestResponse
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string RequestOwner { get; set; }
        public string CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string ProductName { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public int Quantity { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public string Unit { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public double WishPrice { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public QuotationRequestResponse(QuotationRequest quoReq, string owner)
        {
            Id = quoReq.Id;
            UserId = quoReq.UserId;
            RequestOwner = owner;
            CategoryId = quoReq.CategoryId;
            CategoryName = quoReq.CategoryName;
            ProductName = quoReq.ProductName;
            Quantity = quoReq.Quantity;
            Unit = quoReq.Unit;
            WishPrice = quoReq.WishPrice;
            Description = quoReq.Description;
            StartDate = quoReq.StartDate;
            EndDate = quoReq.EndDate;
        }
    }
}