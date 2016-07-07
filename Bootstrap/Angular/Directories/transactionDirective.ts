'use strict';

module App.TransactionsContainer {

    Directive.$inject = ['uiGridConstants', 'signalrService'];

    export function Directive(): ng.IDirective {
        return {
            restrict: 'A',
            scope: true,
            controller: Controller,
            controllerAs: 'vm'
        };
    }

    export class Controller {
        static $inject: string[] = ['$scope'];

        constructor(public $element: JQuery,
            public $scope: ng.IScope
        ) {

        }
    }
}

angular
    .module('BankApp')
    .directive('transactions', App.TransactionsContainer.Directive);
