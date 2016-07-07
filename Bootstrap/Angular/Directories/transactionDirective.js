'use strict';
var App;
(function (App) {
    var TransactionsContainer;
    (function (TransactionsContainer) {
        Directive.$inject = ['uiGridConstants', 'signalrService'];
        function Directive() {
            return {
                restrict: 'A',
                scope: true,
                controller: Controller,
                controllerAs: 'vm'
            };
        }
        TransactionsContainer.Directive = Directive;
        var Controller = (function () {
            function Controller($element, $scope) {
                this.$element = $element;
                this.$scope = $scope;
            }
            Controller.$inject = ['$scope'];
            return Controller;
        }());
        TransactionsContainer.Controller = Controller;
    })(TransactionsContainer = App.TransactionsContainer || (App.TransactionsContainer = {}));
})(App || (App = {}));
angular
    .module('BankApp')
    .directive('transactions', App.TransactionsContainer.Directive);
//# sourceMappingURL=transactionDirective.js.map