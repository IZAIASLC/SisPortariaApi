(function (app) {
    'use strict';

    app.controller('PesquisarMoradorController', PesquisarMoradorController);

    PesquisarMoradorController.$inject = ['dataService'];

    function PesquisarMoradorController(dataService) {

        var ctrl = this;

        ctrl.NomePagina = "Morador";
        ctrl.registrosPorPagina = 5;
        ctrl.totalRegistros = 0;
        ctrl.paginaCorrente = 1;

        

        ctrl.pesquisar = function (newPage) {
           pesquisar(newPage)
        };

        var address = "/api/listar-moradores";

         function pesquisar (page) {

            page = page - 1;

            var config = {
                params: {
                    page: page,
                    pageSize: ctrl.registrosPorPagina,
                    filter: ctrl.searchText
                }
            };

            var callback = function (response) {
                ctrl.moradores = response.Items;
                ctrl.totalRegistros = response.TotalCount;
            }
            dataService.get(address, config, callback)
        };

         pesquisar(0);    
    };
})(angular.module('app'));