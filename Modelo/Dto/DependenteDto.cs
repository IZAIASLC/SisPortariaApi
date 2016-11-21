﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Estrutura.Modelo;

namespace SisPortaria.Modelo
{
   [Serializable]
   public class DependenteDto 
    {
        public  int Identificador { get; set; }
        public  string Nome { get; set; }
        public  int  Morador { get; set; }
    }
}
