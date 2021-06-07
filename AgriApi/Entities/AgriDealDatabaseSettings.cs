namespace AgriApi.Entities
{
  public class AgriDealDatabaseSettings : IAgriDealDatabaseSettings
  {
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
    public string UserCollectionName { get; set; }
    public string ProductCollectionName { get; set; }
    public string CategoryCollectionName { get; set; }
    public string PostCollectionName { get; set; }
  }

  public interface IAgriDealDatabaseSettings
  {
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
    string UserCollectionName { get; set; }
    string ProductCollectionName { get; set; }
    string CategoryCollectionName { get; set; }
    string PostCollectionName { get; set; }
  }
}