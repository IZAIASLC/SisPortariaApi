moduleApp.controller('PesquisarMoradorController',
function PesquisarClienteController($scope, dataService) {
    $scope.NomePagina = "Morador";

    var addresss = "/Morador/ListarMoradores/";

    var address = "http://localhost:42554/api/listar-moradores";

    $scope.getAll = function () {
        var callback = function (response) {
            $scope.moradores = response;

            //angular.forEach($scope.moradores, function (item) {

            //    item.DataNascimento = JsonDate(item.DataNascimento);

            //});

        }
        dataService.get(address,{}, callback)
    };


    $scope.getAll();
});