(function (app) {
   

    app.controller('CadastrarMoradorController',CadastrarMoradorController);

    CadastrarMoradorController.$inject=['dataService', '$routeParams', '$filter'];
 
    function CadastrarMoradorController(dataService, $routeParams, $filter) {

        var ctrl = this;

        ctrl.NomePagina = "Morador";
        ctrl.morador = {}
        ctrl.dependente = {};
        ctrl.morador.Dependentes = [];

        ctrl.dependente.Nome = "";

        ctrl.edicao = false;

        ctrl.inicial = function () {

            //Edição
            if ($routeParams.identificador != undefined) {

                ctrl.edicao = true;



                var callback = function (response) {
                    ctrl.morador = response;

                  //  ctrl.morador.DataNascimento = JsonDate(ctrl.morador.DataNascimento);


                   
                    ctrl.morador.DataNascimento = ctrl.morador.DataNascimento.toLocaleDateString("pt-BR");

                    if (ctrl.morador.Foto != null)
                        ctrl.morador.Foto = _arrayToBase64(ctrl.morador.Foto);

                }
                dataService.get("/api/morador/listar-morador/" + $routeParams.identificador, {}, callback)

            }

        };

        listaEstados();
        ctrl.inicial();


        //Obtem os estados
        function listaEstados() {
            var callback = function (response) {
                ctrl.listaEstados = response;

            }
            dataService.get("/api/estado/listar-estados/", {}, callback)
        }

       


        //Pesquisa pelo identificador
        ctrl.pesquisar = function (identificador) {

            var callback = function (response) {
                ctrl.morador = response;

            }
            dataService.get("api/listar-morador/" + identificador, {}, callback)
        };

        //Adicionar um novo dependente
        ctrl.adicionar = function (dependente) {


            if (ctrl.dependente.Nome == undefined || ctrl.dependente.Nome == '') {
                Modal.growl("Favor informar o nome do dependente", "alert");

                return;
            }

            var adicionado = false;
            angular.forEach(ctrl.morador.Dependentes, function (item) {

                if (item.Nome.toUpperCase() == dependente.Nome.toUpperCase() && item.Identificador != dependente.Identificador) {
                    adicionado = true;
                    return;
                }

            });

            if (adicionado) {
                sweetAlert("", "Nome já adicionado à lista", "warning");
                return;
            }



            if (dependente.Identificador > 0) {

                angular.forEach(ctrl.morador.Dependentes, function (item) {


                    if (item.Identificador === dependente.Identificador) {
                        item.Nome = dependente.Nome.toUpperCase();
                        return;
                    }

                });

                delete ctrl.dependente;
            }
            else {


                dependente.Identificador = 0;
                dependente.Nome = dependente.Nome.toUpperCase();
                ctrl.morador.Dependentes.push(angular.copy(dependente))
                delete ctrl.dependente;
            }





        };


        //Salva o cliente
        ctrl.salvar = function () {

            if (ctrl.morador.Nome === undefined || ctrl.morador.Nome === '') {
                sweetAlert("", "Favor informar o nome do morador", "warning");

                return;
            }
         
            if (ctrl.morador.DataNascimento === undefined || ctrl.morador.DataNascimento === '') {
                sweetAlert("", "Favor informar a data de nascimento do morador", "warning");

                return;
            }


            if (ctrl.morador.Identidade === undefined || ctrl.morador.Identidade === '') {
                sweetAlert("", "Favor informar a identidade do morador", "warning");

                return;
            }

            if (ctrl.morador.Endereco === undefined || ctrl.morador.Endereco === '') {
                sweetAlert("", "Favor informar o endereco do morador", "warning");

                return;
            }


            if (ctrl.morador.Sexo === undefined || ctrl.morador.Sexo === '') {
                sweetAlert("", "Favor informar o sexo do morador", "warning");

                return;
            }




            var obj = ctrl.morador;
            obj.Dependentes = ctrl.morador.Dependentes;

            if ($routeParams.identificador != undefined) {
                var callback = function (response) {
                    sweetAlert("", "Dados atualizados com sucesso", "warning");
                    window.location = "#/morador";
                }


                dataService.put("/api/morador/alterar", obj, callback)

            } else {

                var callback = function (response) {
                    sweetAlert("", "Dados inseridos com sucesso", "warning");

                    window.location = "#/morador";
                }

                dataService.post("/api/morador/cadastrar", obj, callback)
            }
        };

        //Pesquisa se o cpf já está cadastrado.
        ctrl.pesquisarCpf = function () {

            if (!validar_cpf(ctrl.morador.Cpf)) {
                Modal.growl("CPF inválido", "alert");
            }
            else {


                var callback = function (response) {

                    if (response == 'True') {
                        Modal.growl("CPF já está cadastrado.", "alert");
                        ctrl.morador.Cpf = '';

                    }
                }

                if ($routeParams.identificador != undefined) {
                    //Editando
                    dataService.get("Morador/VerificarCpfCadastrado" + "?parametro=" + ctrl.morador.Cpf + "&identificador=" + $routeParams.identificador, {}, callback);
                }
                else {
                    //Cadastrando
                    dataService.get("Morador/VerificarCpfCadastrado" + "?parametro=" + ctrl.morador.Cpf + "&identificador=0", {}, callback);
                }
            }
        };

        ctrl.editar = function (dependente) {

            $('#modalDependentes').openModal();

            ctrl.dependente = {};
            ctrl.dependente.Identificador = dependente.Identificador;
            ctrl.dependente.Nome = dependente.Nome;
        };

        //Valida remoção da lista
        ctrl.remover = function (dependente) {


            dependente.selecionado = true;

            ctrl.morador.Dependentes = ctrl.morador.Dependentes.filter(function (dependente) {

                if (!dependente.selecionado)
                    return dependente;
            });

            dependente.selecionado = false;

        };

    };

})(angular.module('app'));