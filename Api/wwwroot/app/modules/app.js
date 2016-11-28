//var moduleApp = angular.module('moduleApp', ['ngRoute', 'ngResource', 'ui.materialize', 'webcam', 'ngImgCrop', 'ngMask', 'simple-autocomplete']);
(function () {
    'use strict';
    angular.module('app', ['ngRoute', 'ngResource', 'ui.materialize', 'angularUtils.directives.dirPagination']);


    var currentTime = new Date();
    $scope.currentTime = currentTime;
    $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    $scope.disable = [false, 1, 7];
    $scope.today = 'Today';
    $scope.clear = 'Clear';
    $scope.close = 'Close';
    var days = 15;
    $scope.minDate = (new Date($scope.currentTime.getTime() - (1000 * 60 * 60 * 24 * days))).toISOString();
    $scope.maxDate = (new Date($scope.currentTime.getTime() + (1000 * 60 * 60 * 24 * days))).toISOString();
    $scope.onStart = function () {
        console.log('onStart');
    };
    $scope.onRender = function () {
        console.log('onRender');
    };
    $scope.onOpen = function () {
        console.log('onOpen');
    };
    $scope.onClose = function () {
        console.log('onClose');
    };
    $scope.onSet = function () {
        console.log('onSet');
    };
    $scope.onStop = function () {
        console.log('onStop');
    };


})();


//$(document).ready(function () {
//    $('.datepicker').pickadate({
//        selectMonths: true,// Creates a dropdown to control month
//        selectYears: 15,// Creates a dropdown of 15 years to control year
//        // The title label to use for the month nav buttons
//        labelMonthNext: 'Próximo Mês',
//        labelMonthPrev: 'Mês Anterior',
//        // The title label to use for the dropdown selectors
//        labelMonthSelect: 'Selecione o Mês',
//        labelYearSelect: 'Selecione o ano',
//        // Months and weekdays
//        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
//        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
//        weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
//        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
//        // Materialize modified
//        weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
//        // Today and clear
//        today: 'Hoje',
//        clear: 'Limpar',
//        close: 'Fechar',
//        // The format to show on the `input` element
//        format: 'd mmmm, yyyy'
//    });


//});
