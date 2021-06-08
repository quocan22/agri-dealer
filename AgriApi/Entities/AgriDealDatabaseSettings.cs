namespace AgriApi.Entities
{
  public class AgriDealDatabaseSettings : IAgriDealDatabaseSettings
  {
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
    public string UserCollectionName { get; set; }
    public string ProductCollectionName { get; set; }
    public string CategoryCollectionName { get; set; }
    public string CartCollectionName { get; set; }
    public string CommentCollectionName { get; set; }
    public string QuotationRequestCollectionName { get; set; }
    public string QuotationCollectionName { get; set; }
  }

  public interface IAgriDealDatabaseSettings
  {
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
    string UserCollectionName { get; set; }
    string ProductCollectionName { get; set; }
    string CategoryCollectionName { get; set; }
    string CartCollectionName { get; set; }
    string CommentCollectionName { get; set; }
    string QuotationRequestCollectionName { get; set; }
    string QuotationCollectionName { get; set; }
  }
}