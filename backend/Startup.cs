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
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace Api
{
  public class Startup
  {
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
          string host = Configuration.GetValue("DB_HOST", "localhost");
          string port = Configuration.GetValue("DB_PORT", "3306");
          string version = Configuration.GetValue("DB_VERSION", "10.4.14");

          string user = Configuration.GetValue<string>("DB_USER", null);
          string password = Configuration.GetValue<string>("DB_PASS", null);
          string name = Configuration.GetValue("DB_NAME", "puddlejumper_capstone");

          string connection = $"server={host};port={port};database={name};";
          if(user != null)
          {
            connection = string.Concat(connection, $"user={user};");
          }

          if(password != null)
          {
            connection = string.Concat(connection, $"password={password}");
          }

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
            // spa.UseReactDevelopmentServer(npmScript: "start");

            // TODO: Replace this hardcoded value with one pulled from environment variables
            //       or find a way to detect running port
            spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
        }
      });
    }
  }
}
