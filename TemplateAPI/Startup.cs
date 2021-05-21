using System;
using System.Configuration;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Cors;
using System.Web.Http.Cors;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System.Web.Http;


[assembly: OwinStartup(typeof(WebApplication4.Startup))]

namespace WebApplication4
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
            //var cors = new EnableCorsAttribute("http://localhost:4200, ", "accept,accesstoken,authorization,cache-control,pragma,content-type,origin", "GET,PUT,POST,DELETE,TRACE,HEAD,OPTIONS");


           //  app.UseCors(CorsOptions.AllowAll);
            // app.UseCors(options => options.AllowAnyOrigin());

            OAuthAuthorizationServerOptions option = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/token"),
                Provider = new ApplicationOAuthProvider(),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(60),
                AllowInsecureHttp = true
            };
            app.UseOAuthAuthorizationServer(option);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            //  var appSettings = WebConfigurationManager.AppSettings;
                       
        }   


    }
}
