using Incra.Estrutura.AcessoDados;
using Incra.Estrutura.Web.Mvc;
using Microsoft.Practices.Unity;
using SisPortaria.AcessoDados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
 

namespace DependencyResolver
{
   public static class DependencyRegister
    {
        public static void Register(IUnityContainer conteiner)
        {
           conteiner.RegisterInstance<IProvedor>(new Provedor());
            conteiner.RegisterType<IPersistencia, Persistencia>(new HttpContextLifetimeManager<IPersistencia>());
            conteiner.RegisterType(typeof(IRepositorio<>), typeof(Repositorio<>));

            conteiner.RegisterType<IVisitanteAcessoDados, VisitanteAcessoDados>();
        }
    }
}
