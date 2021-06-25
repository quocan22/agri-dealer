using AgriApi.Entities;
using AgriApi.Services;
using AgriApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AgriApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotationRequestsController : ControllerBase
    {
        private readonly QuotationRequestService _quoReqService;

        public QuotationRequestsController(QuotationRequestService quotationRequestService)
        {
            _quoReqService = quotationRequestService;
        }

        [HttpGet]
        [Authorize("user, seller")]
        public ActionResult<List<QuotationRequest>> GetActionResult() =>
            _quoReqService.Get();

        [HttpGet("search/", Name = "GetQuoReqByValue")]
        public ActionResult<List<QuotationRequest>> GetQuoReqByValue([FromQuery] string type, [FromQuery] string value)
        {
            var quoReqs = new List<QuotationRequest>();
            quoReqs.Clear();

            switch(type)
            {
                case "userid":
                    quoReqs = _quoReqService.GetByUserId(value);
                    break;
                default:
                    break;
            }
            if(quoReqs == null)
            {
                return NotFound();
            }
            return quoReqs;
        }

        [HttpGet("{id:length(24)}", Name = "GetQuotationRequest")]
        [Authorize("user, seller")]
        public ActionResult<QuotationRequest> Get(string id)
        {
            var quoReq = _quoReqService.Get(id);

            if (quoReq == null)
            {
                return NotFound();
            }

            return quoReq;
        }

        [HttpPost]
        [Authorize("user, seller")]
        public ActionResult<QuotationRequest> Create([FromForm] QuotationRequest quoReq)
        {
            _quoReqService.Create(quoReq);

            return CreatedAtRoute("GetQuotationRequest", new { id = quoReq.Id.ToString() }, quoReq);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize("user, seller")]
        public IActionResult Update(string id, QuotationRequest quoReqIn)
        {
            var quoReq = _quoReqService.Get(id);

            if (quoReq == null)
            {
                return NotFound();
            }

            _quoReqService.Update(id, quoReqIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("user, seller")]
        public IActionResult Delete(string id)
        {
            var quoReq = _quoReqService.Get(id);

            if (quoReq == null)
            {
                return NotFound();
            }

            _quoReqService.Remove(quoReq.Id);

            return NoContent();
        }
    }
}