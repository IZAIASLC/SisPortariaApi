using Incra.Estrutura.AcessoDados;
using SisPortaria.Modelo;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Api.Controllers
{
    public class MoradorController : BaseController
    {
        private IRepositorio<Morador> repositorioMorador;
        private IRepositorio<Dependente> repositorioDependente;

        public MoradorController(IRepositorio<Morador> repositorioMorador, IRepositorio<Dependente> repositorioDependente)
        {

            this.repositorioMorador = repositorioMorador;
            this.repositorioDependente = repositorioDependente;
        }


       

        [HttpGet]
        [Route("api/listar-moradores")]
        public Task<HttpResponseMessage> Get()
        {
            var listaMorador = repositorioMorador.Consultar();

            var listaMoradorDto = new List<MoradorDto>();

            foreach (var morador in listaMorador)
            {
                MoradorDto moradorDto = new MoradorDto();

                moradorDto.Identificador = morador.Identificador;
                moradorDto.Nome = morador.Nome;

                moradorDto.Identidade = morador.Identidade;
                moradorDto.Sexo = morador.Sexo;
                moradorDto.Endereco = morador.Endereco;
                moradorDto.Foto = morador.Foto;
                moradorDto.Estado = new Modelo.Dto.EstadoDto();
                moradorDto.Estado.Identificador = morador.Estado.Identificador;
                moradorDto.Estado.Sigla = morador.Estado.SiglaEstado;

               
                moradorDto.DataNascimento = morador.DataNascimento;
                moradorDto.Dependentes = new List<DependenteDto>();

                foreach (var dependente in morador.Dependentes)
                {
                    DependenteDto dependenteDto = new DependenteDto();

                    dependenteDto.Identificador = dependente.Identificador;
                    dependenteDto.Nome = dependente.Nome;

                    dependenteDto.Morador = dependente.Morador.Identificador;

                    moradorDto.Dependentes.Add(dependenteDto);

                }

                listaMoradorDto.Add(moradorDto);

            }


           return CreateResponse(HttpStatusCode.Created, listaMoradorDto);
        }

 
    }
}
