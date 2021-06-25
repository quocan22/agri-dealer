using System.Collections.Generic;
using AgriApi.Entities;
using MongoDB.Driver;

namespace AgriApi.Services
{
    public class QuotationRequestService
    {
        private readonly IMongoCollection<QuotationRequest> _quotationRequest;

        public QuotationRequestService(IAgriDealDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _quotationRequest = database.GetCollection<QuotationRequest>(settings.QuotationRequestCollectionName);
        }

        public List<QuotationRequest> Get() =>
            _quotationRequest.Find(quotationRequest => true).ToList();

        public QuotationRequest Get(string id) =>
            _quotationRequest.Find<QuotationRequest>(quotationRequest => quotationRequest.Id == id).FirstOrDefault();

        public List<QuotationRequest> GetByUserId(string userId) =>
            _quotationRequest.Find<QuotationRequest>(quotationRequest => quotationRequest.UserId == userId).ToList();

        public string GetRequestOwner(string id) =>
            _quotationRequest.Find<QuotationRequest>(quotationRequest => quotationRequest.Id == id).FirstOrDefault().UserId;

        public QuotationRequest Create(QuotationRequest quotationRequest)
        {
            _quotationRequest.InsertOne(quotationRequest);
            return quotationRequest;
        }

        public void Update(string id, QuotationRequest quotationRequestIn) =>
            _quotationRequest.ReplaceOne(quotationRequest => quotationRequest.Id == id, quotationRequestIn);

        public void Remove(QuotationRequest quotationRequestIn) =>
            _quotationRequest.DeleteOne(quotationRequest => quotationRequest.Id == quotationRequestIn.Id);

        public void Remove(string id) => 
            _quotationRequest.DeleteOne(quotationRequest => quotationRequest.Id == id);
    }
}