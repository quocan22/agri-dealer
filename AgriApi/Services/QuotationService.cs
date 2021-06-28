using System.Collections.Generic;
using AgriApi.Entities;
using AgriApi.Models;
using AgriApi.Services.Identity;
using AgriApi.Services;
using MongoDB.Driver;

namespace AgriApi.Services
{
    public class QuotationService
    {
        private readonly IMongoCollection<Quotation> _quotation;
        private readonly UserService _userService;
        private readonly QuotationRequestService _quotationRequestService;

        public QuotationService(IAgriDealDatabaseSettings settings, UserService userService, QuotationRequestService quotationRequestService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _userService = userService;
            _quotationRequestService = quotationRequestService;

            _quotation = database.GetCollection<Quotation>(settings.QuotationCollectionName);
        }

        public List<Quotation> Get() =>
            _quotation.Find(quotation => true).ToList();

        public Quotation Get(string id) =>
            _quotation.Find<Quotation>(quotation => quotation.Id == id).FirstOrDefault();

        public List<Quotation> GetByUserId(string userId) =>
            _quotation.Find<Quotation>(quotation => quotation.UserId == userId).ToList();

        public List<Quotation> GetByRequestId(string requestId) =>
            _quotation.Find<Quotation>(quotation => quotation.RequestId == requestId).ToList();

        public List<QuotationResponse> GetResponses(List<Quotation> quotations)
        {
            var quoResponses = new List<QuotationResponse>();
            foreach(var q in quotations)
            {
                var userId = _quotationRequestService.GetRequestOwner(q.RequestId);
                var rqName = _quotationRequestService.GetRequestName(q.RequestId);
                var rqUnit = _quotationRequestService.GetRequestUnit(q.RequestId);
                var ownerName = _userService.GetDisplayNameById(userId);
                quoResponses.Add(new QuotationResponse(q, ownerName, rqName, rqUnit));
            }
            return quoResponses;
        }

        public Quotation Create(Quotation quotation)
        {
            quotation.State = Quotation.QuotationState.pending;
            _quotation.InsertOne(quotation);
            return quotation;
        }

        public void Update(string id, Quotation quotationIn) =>
            _quotation.ReplaceOne(quotation => quotation.Id == id, quotationIn);

        public bool BrowseQuotation(string id, string status)
        {
            var quotation = _quotation.Find<Quotation>(quotation => quotation.Id == id).FirstOrDefault();

            switch(status)
            {
                case "confirmed":
                    quotation.State = Quotation.QuotationState.confirmed;
                    break;
                case "canceled":
                    quotation.State = Quotation.QuotationState.canceled;
                    break;
                default:
                    return false;
            }

            Update(id, quotation);
            return true;
        }

        public void Remove(Quotation quotationIn) =>
            _quotation.DeleteOne(quotation => quotation.Id == quotationIn.Id);

        public void Remove(string id) => 
            _quotation.DeleteOne(quotation => quotation.Id == id);
    }
}