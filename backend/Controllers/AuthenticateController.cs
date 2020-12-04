using Api.Authentication;
using Api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api.Controllers
{
  // This controller was taken from the link below.
  // Citation: A controller file needed to be created to handle authentication of the application. The application uses ASPNETCore Identity to handle user information.
  // A controller file containing the API endpoints was required to allow the React components to interact with the backend server.
  // Link @ https://www.c-sharpcorner.com/article/authentication-and-authorization-in-asp-net-core-web-api-with-json-web-tokens/
  [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
      private readonly UserManager<User> userManager;
      // The UserManager class provides a persistent store for managing users.
      private readonly RoleManager<IdentityRole> roleManager;
      // The RoleManager class provides a persistent store for managing user roles.
      // It tracks roles for users by roleID and provides role names.
      private readonly IConfiguration _configuration;

      private readonly IWebHostEnvironment hostingEnvironment;

      public AuthenticateController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IWebHostEnvironment _hostingEnvironment)
      {
        this.userManager = userManager;
        this.roleManager = roleManager;
        _configuration = configuration;
        hostingEnvironment = _hostingEnvironment;
      }

      [HttpPost]
      [Route("login")]
      public async Task<IActionResult> Login([FromBody] LoginModel model)
      {
      // Check the store for the username. If the username exists then check the password provided against the database.
        var user = await userManager.FindByNameAsync(model.Username);
        if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
        {
          // Obtain the users permission level.
          var userRoles = await userManager.GetRolesAsync(user);
        // Create a list of permissions that the user has.
          var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    // Claim provides context for the data associated with it.
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    // JTI (JWT ID) provides a unique identifier for the JWT. 
                };

          foreach (var userRole in userRoles)
          {
            // Adding the user roles to the claims list.
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
          }

          // Assign a new authorization sign key to the user.
          var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

          // Token parameters for the users login.
          var token = new JwtSecurityToken(
              issuer: _configuration["JWT:ValidIssuer"],
              audience: _configuration["JWT:ValidAudience"],
              expires: DateTime.Now.AddHours(3),
              claims: authClaims,
              signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
              );

        // Return the token data to the user.
          return Ok(new
          {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = token.ValidTo,
            name = user.Name,
            email = user.Email
          });
        }
        return Unauthorized();
      }

      [HttpPost]
      [Route("register")]
      public async Task<IActionResult> Register([FromBody] RegisterModel model)
      {
        // Check if the username is inside the store.
        var userExists = await userManager.FindByNameAsync(model.Username);
        if (userExists != null)
          return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

        // Create a new user object.
        User user = new User()
        {
          Name = model.Name,
          Email = model.Email,
          SecurityStamp = Guid.NewGuid().ToString(),
          UserName = model.Username
        };
        // Insert the user object into UserManager
        var result = await userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
        {
          List<string> errorList = new List<string>();
          foreach(IdentityError errorMessage in result.Errors)
          {
            errorList.Add(errorMessage.Description);
          }
          return StatusCode(StatusCodes.Status500InternalServerError, new Response {
            Status = "Error",
            Message = $"User creation failed! Please check user details and try again.",
            ErrorList = errorList
          });
        }

      // Create image upload folder
      string uploadsFolder = Path.Combine(hostingEnvironment.WebRootPath, $"images/User_{user.Id}");
      Directory.CreateDirectory(uploadsFolder);

      return Ok(new Response { Status = "Success", Message = "User created successfully!" });
      }

      [HttpPost]
      [Route("register-admin")]
      public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
      {
        var userExists = await userManager.FindByNameAsync(model.Username);
        if (userExists != null)
          return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

        User user = new User()
        {
          Name = model.Name,
          Email = model.Email,
          SecurityStamp = Guid.NewGuid().ToString(),
          UserName = model.Username
        };
        var result = await userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
        {
          List<string> errorList = new List<string>();
          foreach (IdentityError errorMessage in result.Errors)
          {
            errorList.Add(errorMessage.Description);
          }
          return StatusCode(StatusCodes.Status500InternalServerError, new Response {
            Status = "Error",
            Message = "User creation failed! Please check user details and try again.",
            ErrorList = errorList
          });
        }

        // If the RoleManager store does not contain the Admin or User role then add it into the store.
        if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
        {
            await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
        }
        if (!await roleManager.RoleExistsAsync(UserRoles.User))
        {
            await roleManager.CreateAsync(new IdentityRole(UserRoles.User));
        }

        // Add the Admin role to the User in the store.
        await userManager.AddToRoleAsync(user, UserRoles.Admin);
        return Ok(new Response { Status = "Success", Message = "User created successfully!" });
      }
    }
}
