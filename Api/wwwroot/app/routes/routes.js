
(function () {
    'use strict';

    angular.module('app').config(function ($routeProvider) {

        $routeProvider.
          when('/index', {
              templateUrl: 'app/pages/index/index.html',
              controller: 'IndexController',
              controllerAs: 'ctrl'
          }),

        $routeProvider.when('/morador', {
            templateUrl: 'app/pages/morador/listar.html',
            controller: 'PesquisarMoradorController',
            controllerAs: 'ctrl'
        }),


      $routeProvider.when('/morador/cadastrar', {
          templateUrl: 'app/pages/morador/cadastrar.html',
          controller: 'CadastrarMoradorController',
          controllerAs: 'ctrl'
      }),


       $routeProvider.when('/morador/cadastrar/:identificador', {
           templateUrl: 'app/pages/morador/cadastrar.html',
           controller: 'CadastrarMoradorController',
           controllerAs: 'ctrl'
       }),



        $routeProvider.when('/visitante', {
            templateUrl: 'app/pages/visitante/listar.html',
            controller: 'PesquisarVisitanteController',
            controllerAs: 'ctrl'
        }),


      $routeProvider.when('/visitante/cadastrar', {
          templateUrl: 'visitante/cadastrar.html',
          controller: 'CadastrarVisitanteController',
          controllerAs: 'ctrl'
      }),


       $routeProvider.when('/visitante/cadastrar/:identificador', {
           templateUrl: 'app/pages/visitante/cadastrar.html',
           controller: 'CadastrarVisitanteController',
           controllerAs: 'ctrl'
       }),




        $routeProvider.when('/visita-morador', {
            templateUrl: 'app/pages/visita/listar.html',
            controller: 'PesquisarVisitaMoradorController',
            controllerAs: 'ctrl'
        }),


      $routeProvider.when('/visita-morador/cadastrar', {
          templateUrl: 'app/pages/visita/cadastrar.html',
          controller: 'CadastrarVisitaMoradorController',
          controllerAs: 'ctrl'
      }),


       $routeProvider.when('/visita-morador/cadastrar/:identificador', {
           templateUrl: 'app/pages/visita/cadastrar.html',
           controller: 'CadastrarVisitaMoradorController',
           controllerAs: 'ctrl'
       }),



        $routeProvider.otherwise({
            redirectTo: '/index'
        });


    });
})();

