
using Estrutura.AcessoDados;
using Estrutura.Modelo;
using Estrutura.Modelo.Events;
using Estrutura.Web.Mvc;
using Microsoft.Practices.Unity;
using SisPortaria.AcessoDados;


namespace RegisterDependency
{
   public static class DependencyRegister
    {
        public static void Register(IUnityContainer conteiner)
     {
           conteiner.RegisterInstance<IProvedor>(new Provedor());
            conteiner.RegisterType<IPersistencia, Persistencia>(new HttpContextLifetimeManager<IPersistencia>());
            conteiner.RegisterType(typeof(IRepositorio<>), typeof(Repositorio<>));

            conteiner.RegisterType<IVisitanteAcessoDados, VisitanteAcessoDados>();

           conteiner.RegisterType<IHandler<DomainNotification>, DomainNotificationHandler>(new HierarchicalLifetimeManager());

           
        }
    }
}
 
