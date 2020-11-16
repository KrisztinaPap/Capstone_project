using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using dotenv.net;

namespace Api
{
  public class Program
  {
      public static void Main(string[] args)
      {
          CreateHostBuilder(args).Build().Run();
      }

      public static IHostBuilder CreateHostBuilder(string[] args)
      {
        // If a `.env` file exists in the project root, add the
        // variables to the applications environment variables.
        DotEnv.Config(false, "../.env", Encoding.UTF8, true);

        return Host
          .CreateDefaultBuilder(args)
          .ConfigureAppConfiguration(x =>
            {
              // Include environment variables in App Configuration.
              x.AddEnvironmentVariables();
            })
          .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
      }
  }
}
