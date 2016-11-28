using Apresentacao.Utils;
using Estrutura.AcessoDados;
using Estrutura.Web;
using Modelo.Dto;
using SisPortaria.Modelo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Api.Controllers
{
    [RoutePrefix("api/estado")]
    public class EstadoController : BaseController
    {
        private IRepositorio<Estado> repositorioEstado;
        public EstadoController(IRepositorio<Estado> repositorioEstado)
        {
            this.repositorioEstado = repositorioEstado;
        }



        [HttpGet]
        [Route("listar-estados")]
        public Task<HttpResponseMessage> Get()
        {
            var listaEstados = repositorioEstado.Consultar().OrderBy(x=>x.SiglaEstado);

            var retornoEstados = new List<EstadoDto>();
            foreach (var estado in listaEstados)
            {
                     var estadoDto = new EstadoDto();
                estadoDto.Identificador = estado.Identificador;
                estadoDto.Sigla = estado.SiglaEstado;

                retornoEstados.Add(estadoDto);
            }

            return CreateResponse(HttpStatusCode.OK, retornoEstados);
        }

        
    }
}
