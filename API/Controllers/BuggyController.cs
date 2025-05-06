using API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController(ApplicationDbContext _db) : ControllerBase
    {
        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            var thing = _db.Users.Find(-1);
            if (thing == null) return NotFound();
            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {

                var thing = _db.Users.Find(-1);
                var thingToReturn = thing.ToString();
                return Ok(thingToReturn);                     
        }

            [HttpGet("bad-request")]
            public ActionResult GetBadRequest()
            {
                return BadRequest("This was not a good request");
            }
        }
    }
