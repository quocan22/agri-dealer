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
    public class QuotationRequestsController : ControllerBase
    {
        private readonly QuotationRequestService _quoReqService;
        private readonly UserService _userService;

        public QuotationRequestsController(QuotationRequestService quotationRequestService, UserService userService)
        {
            _quoReqService = quotationRequestService;
            _userService = userService;
        }

        [HttpGet]
        [Authorize("user, seller")]
        public ActionResult<List<QuotationRequestResponse>> GetActionResult()
        {
            var quoReqs = _quoReqService.Get();
            var quoReqResponses = new List<QuotationRequestResponse>();
            quoReqResponses.Clear();
            if (quoReqs != null)
            {
                foreach(var q in quoReqs)
                {
                    var owner = _userService.GetDisplayNameById(q.UserId);
                    quoReqResponses.Add(new QuotationRequestResponse(q, owner));
                }
            }

            if (quoReqResponses == null)
            {
                return NotFound();
            }
            return quoReqResponses;
        }

        [HttpGet("search/", Name = "GetQuoReqByValue")]
        public ActionResult<List<QuotationRequestResponse>> GetQuoReqByValue([FromQuery] string type, [FromQuery] string value)
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
            var quoReqResponses = new List<QuotationRequestResponse>();
            quoReqResponses.Clear();
            if (quoReqs != null)
            {
                foreach(var q in quoReqs)
                {
                    var owner = _userService.GetDisplayNameById(q.UserId);
                    quoReqResponses.Add(new QuotationRequestResponse(q, owner));
                }
            }

            if (quoReqResponses == null)
            {
                return NotFound();
            }
            return quoReqResponses;
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