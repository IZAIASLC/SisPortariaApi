using Microsoft.Practices.Unity;

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Owin;
using System.Web.Http;
using System.Web.Mvc;
using Estrutura.Modelo.Events;

using Estrutura.Web;
using Estrutura.Web.Mvc;
using System.Web.Optimization;

namespace Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
       {
            HttpConfiguration config = new HttpConfiguration();
            var container = new UnityContainer();

            BundleConfig.RegisterBundles(BundleTable.Bundles);

            ConfigureDependencyInjection(config, container);
            ConfigureWebApi(config);
            //ConfigureOAuth(app, container.Resolve<IUserApplicationService>());
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config); 
        }

        public static void ConfigureWebApi(HttpConfiguration config)
        {

            var formatters = config.Formatters;
            formatters.Remove(formatters.XmlFormatter);

            var jsonSettings = formatters.JsonFormatter.SerializerSettings;
            jsonSettings.Formatting = Formatting.Indented;
            jsonSettings.ContractResolver = new DefaultContractResolver(); //CamelCasePropertyNamesContractResolver(); lowercase;

            formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
            config.Formatters.JsonFormatter.SerializerSettings.Culture = System.Globalization.CultureInfo.GetCultureInfo("pt-BR");
            //   config.Formatters.JsonFormatter.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
            config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new IsoDateTimeConverter { DateTimeFormat = "dd/MM/yyyy" });

            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
                );
        }

        public static void ConfigureDependencyInjection(HttpConfiguration config, UnityContainer container)
        {
            RegisterDependency.DependencyRegister.Register(container);     
            config.DependencyResolver = new UnityDependencyResolverWebApi(container);        
            DomainEvent.Container = new DomainEventsContainer(config.DependencyResolver);
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}