using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Api.Controllers
{

  [ApiController]
  [Route("api/[controller]")]
  public class UsersController : ControllerBase
  {

    private readonly DBContext _context;
    private readonly UserManager<User> userManager;
    // The UserManager class provides a persistent store for managing users.

    public UsersController(DBContext context, UserManager<User> userManager)
    {
      _context = context;
      this.userManager = userManager;
    }

    // GET: api/users/{id}
    [Authorize]
    [HttpGet]
    [Route("{id:length(8,50):required}")]
    public ActionResult<User> GetUserById(string id)
    {
      ClaimsPrincipal currentUser = this.User;
      string claimUserID = userManager.GetUserId(currentUser);
      string requestUserID = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
      if(claimUserID == requestUserID)
      {
        // Users ID is a GUID string.
        var result = _context.Users
                      .Where(x => x.Id == id)
                      .Select(x => new { Id = x.Id, name = x.Name, email = x.Email })
                      .SingleOrDefault();
        if (result != null)
        {
          return Ok(result);
        }
      }
      return NotFound();
    }
  }
}
