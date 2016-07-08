'use strict';
angular.module('BankApp', []);
var App;
(function (App) {
    var Transactions;
    (function (Transactions) {
        var Controller = (function () {
            function Controller($scope, $http) {
                this.$scope = $scope;
                this.$http = $http;
                this.$scope.model = [];
                this.getData();
                this.$scope.hide = false;
            }
            Controller.prototype.getData = function () {
                var _this = this;
                this.$http({
                    method: 'GET',
                    url: 'http://localhost:54742/bank/getTopTransactions'
                }).then(function (response) {
                    _this.$scope.model = response.data;
                    console.log(_this.$scope.model);
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            };
            ;
            Controller.prototype.hide = function () {
                this.$scope.hide = !this.$scope.hide;
            };
            Controller.$inject = ['$scope', '$http'];
            return Controller;
        }());
        Transactions.Controller = Controller;
    })(Transactions = App.Transactions || (App.Transactions = {}));
})(App || (App = {}));
angular
    .module("BankApp")
    .controller('transactionsController', App.Transactions.Controller)
    .filter('jsonDate', ['$filter', function ($filter) {
        return function (input, format) {
            return (input)
                ? $filter('date')(parseInt(input.substr(6)), format)
                : '';
        };
    }]);
