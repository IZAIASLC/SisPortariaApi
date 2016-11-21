(function (app) {
    'use strict';

    app.controller('PesquisarMoradorController',PesquisarMoradorController);

    PesquisarMoradorController.$inject = ['$scope', 'dataService'];

    function PesquisarMoradorController($scope, dataService) {

    $scope.NomePagina = "Morador";

    
    var address = "/api/listar-moradores";

    $scope.getAll = function () {
        var callback = function (response) {
            $scope.moradores = response;

            //angular.forEach($scope.moradores, function (item) {

            //    item.DataNascimento = JsonDate(item.DataNascimento);

            //});

        }
       dataService.get(address, {}, callback)
    };


    $scope.getAll();
};
})(angular.module('app'));