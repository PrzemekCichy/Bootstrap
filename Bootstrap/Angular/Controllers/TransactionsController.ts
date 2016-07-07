'use strict';

angular.module('BankApp', []);


module App.Transactions {

    export class Controller {

        static $inject = ['$scope', '$http'];

        constructor(public $scope, public $http: ng.IHttpService) {
            this.$scope.model = [];
            this.getData();
            this.$scope.hide = false;
        }


        private getData() {
            this.$http({
                method: 'GET',
                url: 'http://localhost:54742/bank/getTopTransactions'
            }).then((response) => {
                this.$scope.model = response.data;
                console.log(this.$scope.model);

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };

        public hide() {
            this.$scope.hide = !this.$scope.hide;
        }

    }
}

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