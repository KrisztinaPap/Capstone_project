using System;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace Api
{
  public class Startup
  {
    private const string DBHost = "DB_HOST";
    private const string DBVersion = "DB_VERSION";
    private const string DBPort = "DB_PORT";
    private const string DBUser = "DB_USER";
    private const string DBPass = "DB_PASS";
    private const string DBName = "DB_NAME";

    private const string FrontendPort="FRONTEND_PORT";

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services
        .AddControllers()
        .AddNewtonsoftJson(ns =>
          {
              ns.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
          })
        .AddFluentValidation(fv =>
          {
              fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
              fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
          });

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "../frontend/build";
        });

      // Configure DBContext using Environment Variables.
      services.AddDbContext<Models.DBContext>(options =>
        {
          string host = Configuration.GetValue(DBHost, "localhost");
          string port = Configuration.GetValue(DBPort, "3306");
          string version = Configuration.GetValue(DBVersion, "10.4.14");

          string user = Configuration.GetValue(DBUser, "root");
          string password = Configuration.GetValue<string>(DBPass, null);
          string name = Configuration.GetValue(DBName, "puddlejumper_capstone");

          string connection = $"server={host};port={port};database={name};";
          connection += (user != null) ? $"user={user};" : string.Empty;
          connection += (password != null) ? $"password={password};" : string.Empty;

          options.UseMySql(connection, x => x.ServerVersion(Version.Parse(version), ServerType.MariaDb));
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseSpaStaticFiles();

      app.UseRouting();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");
      });

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "../frontend";

        if (env.IsDevelopment())
        {
            // If VisualStudio Debugging becomes an issue
            // enable server start via Debugger.IsAttached check
            // See: https://stackoverflow.com/questions/48461396/how-to-detect-if-debugging/48471950#48471950

            // TODO: Keeping this line around just in case we want the VS
            //       debugger to activate the front end.
            //       Remove before project end.

            // spa.UseReactDevelopmentServer(npmScript: "start");

            int spaServerPort = Configuration.GetValue(FrontendPort, 3000);
            spa.UseProxyToSpaDevelopmentServer(new UriBuilder("http", "localhost", 3000).Uri);
        }
      });
    }
  }
}
