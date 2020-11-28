using System;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using dotenv.net;
using Microsoft.Extensions.Hosting;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.Extensions.Configuration;

namespace Api.Tests
{
  public class ApplicationFactory<TStartup>
    : WebApplicationFactory<TStartup> where TStartup: class
  {

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
      // If a `.env` file exists in the project root, add the
      // variables to the applications environment variables.
      // Note: This is brittle but it works for our purposes.
      //
      DotEnv.Config(false, "../../../../.env", Encoding.UTF8, true);

      builder
        .UseEnvironment("Testing")
        .ConfigureServices(services =>
        {

          services.AddDbContext<Models.DBContext>(options =>
          {
            string host = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost";
            string port = Environment.GetEnvironmentVariable("DB_PORT") ?? "3306";
            string version = Environment.GetEnvironmentVariable("DB_VERSION") ?? "10.4.14";

            string user = Environment.GetEnvironmentVariable("DB_USER") ?? "root";
            string password = Environment.GetEnvironmentVariable("DB_PASS");
            string name = Environment.GetEnvironmentVariable("DB_TEST_NAME") ?? "puddlejumper_capstone_tests";

            string connection = $"server={host};port={port};database={name};";
            connection += (user != null) ? $"user={user};" : string.Empty;
            connection += (password != null) ? $"password={password};" : string.Empty;

            options.UseMySql(connection, x => x.ServerVersion(Version.Parse(version), ServerType.MariaDb));
          });

          using (var scope = services.BuildServiceProvider().CreateScope())
          {
            var db = scope.ServiceProvider.GetRequiredService<Api.Models.DBContext>();

            // Delete the test database then recreate it every time
            // we run our test suite.
            db.Database.EnsureDeleted();
            db.Database.Migrate();
          }
        });
    }
  }
}
