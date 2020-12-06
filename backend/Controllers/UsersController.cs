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

    /*
     * 
     * Controller decommissioned for Identity
     * 
     */

  }
}
