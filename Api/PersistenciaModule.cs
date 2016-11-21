/*
 * Descrição: Implementação do módulo responsável por confirmar as alterações do serviço de persistência.
 * Desenvolvedor: Joaquim Ricardo B. R. de Araújo.
 * Data: 20 de agosto de 2010.
 * Hora: 10:27:22.
 */
namespace Api
{
    using System;
    using System.Web;
    using System.Web.Mvc;

    using Incra.Estrutura.AcessoDados;
    using Incra.Estrutura.Modelo;
    using Incra.Estrutura.Modelo.Events;

    /// <summary>
    /// Módulo responsável por confirmar as alterações do serviço de persistência.
    /// </summary>
    public class PersistenciaModule : IHttpModule, IDisposable
    {
        private IPersistencia persistencia;
        private IHandler<DomainNotification> notifications;

        /// <summary>
        /// Inicializa o módulo.
        /// </summary>
        /// <param name="context">Provê acesso aos métodos, propriedades e eventos comuns a toda a aplicação.</param>
        public void Init(HttpApplication context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            context.BeginRequest += new EventHandler(ContextBeginRequest);
            context.EndRequest += new EventHandler(ContextEndRequest);
        }

        /// <summary>
        /// Evento que ocorre sempre que uma requisição é iniciada.
        /// </summary>
        /// <param name="sender">O acionador do evento.</param>
        /// <param name="e">Os argumentos do evento.</param>
        private void ContextBeginRequest(object sender, EventArgs e)
        {
            this.persistencia = DependencyResolver.Current.GetService<IPersistencia>();
            this.notifications = DomainEvent.Container.GetService<IHandler<DomainNotification>>();
        }

        /// <summary>
        /// Evento que ocorre sempre que uma requisição é encerrada.
        /// </summary>
        /// <param name="sender">O acionador do evento.</param>
        /// <param name="e">Os argumentos do evento.</param>
        private void ContextEndRequest(object sender, EventArgs e)
        {
            Dispose();
        }

        /// <summary>
        /// Confirma as alterações no serviço de persistência e libera os resursos alocados.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Confirma as alterações no serviço de persistência e libera os resursos alocados.
        /// </summary>
        /// <param name="disposing">Verdadeiro indica que os recursos gerenciados devem ser liberados.</param>
        protected virtual void Dispose(bool disposing)
      {
            if (disposing)
            {
                if (this.persistencia != null)
                {
                    if (!this.notifications.HasNotifications())
                    {

                        this.persistencia.Confirmar();
                        this.persistencia.Dispose();
                        this.persistencia = null;
                    }
                }
            }
        }
    }
}