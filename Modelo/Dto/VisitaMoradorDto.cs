using SisPortaria.Modelo;
using System;


namespace Modelo.Dto
{
    public class VisitaMoradorDto
    {
        public int Identificador { get; set; }
        public DateTime  Entrada { get; set; }
        public DateTime? Saida { get; set; }
        public MoradorDto Morador { get; set; }
        public VisitanteDto Visitante { get; set; }
    }
}
