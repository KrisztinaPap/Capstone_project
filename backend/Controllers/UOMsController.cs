using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class UOMsController : ControllerBase
  {
    private readonly DBContext _context;
    public UOMsController(DBContext context)
    {
      _context = context;
    }

    // GET: api/UOMs/all
    [HttpGet]
    [Route("all")]
    public ActionResult<IEnumerable<UOM>> GetAllUOM()
    {
      // This API endpoing will return all the UOM Id's in the database.

      var result = _context.UOMs.Select(x => x.Id).ToList();

      if(result.Count <= 0)
      {
        return NotFound();
      }
      return Ok(result);
    }
  }
}
