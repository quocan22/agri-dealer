using AgriApi.Entities;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;

namespace AgriApi.Models
{
    public class CartResponse
    {
        public string Id { get; set; }
        public double Total { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? BuyDate { get; set; }
        public string UserId { get; set; }
        public List<CartDetailResponse> Details { get; set; }
        public CartResponse(Cart cart, List<CartDetailResponse> details)
        {
            Id = cart.Id;
            Total = cart.Total;
            BuyDate = cart.BuyDate;
            UserId = cart.UserId;
            Details = details;
        }
    }
}