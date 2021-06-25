using System.Text.Json.Serialization;
using AgriApi.Entities;
using static AgriApi.Entities.Quotation;

namespace AgriApi.Models
{
  public class QuotationResponse
  {
    public string Id { get; set; }
    public string RequestId { get; set; }
    public double QuotePrice { get; set; }
    public string Description { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public QuotationState State { get; set; }
    public string RequestUser { get; set; }

    public QuotationResponse(Quotation quotation, string owner)
    {
      Id = quotation.Id;
      RequestId = quotation.RequestId;
      QuotePrice = quotation.QuotePrice;
      Description = quotation.Description;
      State = quotation.State;
      RequestUser = owner;
    }
  }
}