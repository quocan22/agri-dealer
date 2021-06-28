using AgriApi.Entities;
using AgriApi.Services;
using AgriApi.Services.Identity;
using AgriApi.Utils;
using AgriApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AgriApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotationsController : ControllerBase
    {
        private readonly QuotationService _quotationService;

        public QuotationsController(QuotationService quotationService)
        {
            _quotationService = quotationService;
        }

        [HttpGet]
        public ActionResult<List<Quotation>> GetActionResult() =>
            _quotationService.Get();

        [HttpGet("{id:length(24)}", Name = "GetQuotation")]
        public ActionResult<Quotation> Get(string id)
        {
            var quotation = _quotationService.Get(id);

            if (quotation == null)
            {
                return NotFound();
            }

            return quotation;
        }

        [HttpGet("filter/", Name = "GetQuotationByValue")]
        public ActionResult<List<QuotationResponse>> GetQuoByValue([FromQuery] string type, [FromQuery] string value)
        {
            var quotations = new List<Quotation>();
            quotations.Clear();

            switch(type)
            {
                case "userid":
                    quotations = _quotationService.GetByUserId(value);
                    break;
                case "requestid":
                    quotations = _quotationService.GetByRequestId(value);
                    break;
                default:
                    break;
            }
            if(quotations == null)
            {
                return NotFound();
            }
            var quoResponse = new List<QuotationResponse>(_quotationService.GetResponses(quotations));

            return quoResponse;
        }

        [HttpPost]
        [Authorize("seller")]
        public ActionResult<Quotation> Create([FromForm] Quotation quotation)
        {
            _quotationService.Create(quotation);

            return CreatedAtRoute("GetQuotation", new { id = quotation.Id.ToString() }, quotation);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize("seller")]
        public IActionResult Update(string id, Quotation quotationIn)
        {
            var quotation = _quotationService.Get(id);

            if (quotation == null)
            {
                return NotFound();
            }

            _quotationService.Update(id, quotationIn);

            return NoContent();
        }

        [HttpPut("browse", Name = "BrowseQuotation")]
        public IActionResult BrowseQuotation([FromForm] string id, [FromForm] string status)
        {
            bool res = _quotationService.BrowseQuotation(id, status);

            if (res)
            {
                return Ok(new {message = "Xác nhận thành công"});
            }
            return BadRequest(new {message = "Xác nhận thất bại"});
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("seller")]
        public IActionResult Delete(string id)
        {
            var quotation = _quotationService.Get(id);

            if (quotation == null)
            {
                return NotFound();
            }

            _quotationService.Remove(quotation.Id);

            return NoContent();
        }
    }
}