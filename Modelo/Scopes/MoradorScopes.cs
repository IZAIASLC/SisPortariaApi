using Estrutura.Modelo.Validation;
using SisPortaria.Modelo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Scopes
{
    public static class MoradorScopes
    {
        public static bool CreateMoradorScopeIsValid(this Morador morador)
        {
            return AssertionConcern.IsSatisfiedBy
                (
                AssertionConcern.AssertNotEmpty(morador.Nome, "O nome do morador é obrigatório"),
                 AssertionConcern.AssertNotEmpty(morador.Endereco, "O endereço do morador é obrigatório")
                );

           

        }
    }
}
