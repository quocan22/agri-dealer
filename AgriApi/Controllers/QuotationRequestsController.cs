using AgriApi.Entities;
using AgriApi.Services;
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
        public ActionResult<List<QuotationRequest>> GetActionResult() =>
            _quoReqService.Get();

        [HttpGet("{id:length(24)}", Name = "GetQuotationRequest")]
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
        public ActionResult<QuotationRequest> Create([FromForm] QuotationRequest quoReq)
        {
            _quoReqService.Create(quoReq);

            return CreatedAtRoute("GetQuotationRequest", new { id = quoReq.Id.ToString() }, quoReq);
        }

        [HttpPut("{id:length(24)}")]
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