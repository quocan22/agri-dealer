namespace AgriApi.Entities
{
  public class AgriDealDatabaseSettings : IAgriDealDatabaseSettings
  {
    public string UserCollectionName { get; set; }
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
  }

  public interface IAgriDealDatabaseSettings
  {
    string UserCollectionName { get; set; }
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
  }
}