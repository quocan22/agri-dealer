using System.Collections.Generic;
using AgriApi.Entities;
using MongoDB.Driver;

namespace AgriApi.Services
{
    public class QuotationService
    {
        private readonly IMongoCollection<Quotation> _quotation;

        public QuotationService(IAgriDealDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _quotation = database.GetCollection<Quotation>(settings.QuotationCollectionName);
        }

        public List<Quotation> Get() =>
            _quotation.Find(quotation => true).ToList();

        public Quotation Get(string id) =>
            _quotation.Find<Quotation>(quotation => quotation.Id == id).FirstOrDefault();

        public Quotation Create(Quotation quotation)
        {
            _quotation.InsertOne(quotation);
            return quotation;
        }

        public void Update(string id, Quotation quotationIn) =>
            _quotation.ReplaceOne(quotation => quotation.Id == id, quotationIn);

        public void Remove(Quotation quotationIn) =>
            _quotation.DeleteOne(quotation => quotation.Id == quotationIn.Id);

        public void Remove(string id) => 
            _quotation.DeleteOne(quotation => quotation.Id == id);
    }
}