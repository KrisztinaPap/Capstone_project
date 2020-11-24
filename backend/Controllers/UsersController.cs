using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Controllers
{

  [ApiController]
  [Route("api/[controller]")]
  public class UsersController : ControllerBase
  {

    private readonly DBContext _context;

    public UsersController(DBContext context)
    {
      _context = context;
    }

    // GET: api/users/{id}
    [HttpGet]
    [Route("{id:int:required}")]
    public ActionResult<User> GetUserById(int id)
    {
      string idString = $"{id}";
      var result = _context.Users
                    .Where(x => x.Id == idString)
                    .Select(x => new { Id = x.Id, name = x.Name, email = x.Email })
                    .SingleOrDefault();

      if (result == null)
      {
        return NotFound();
      }

      return Ok(result);
    }

    /*
     * TODO:
     * 1. Password Salt Algorithm
     * 2. User Signin & Authentication
     * 3. User Profile Update
     * 
     */
  }
}
