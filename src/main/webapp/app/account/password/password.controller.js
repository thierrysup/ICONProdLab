(function() {
    'use strict';

    angular
        .module('iconlabApp')
        .controller('PasswordController', PasswordController);

    PasswordController.$inject = ['Auth', 'Principal','$state'];

    function PasswordController (Auth, Principal,$state) {
        var vm = this;

        vm.changePassword = changePassword;
        vm.doNotMatch = null;
        vm.error = null;
        vm.success = null;

        Principal.identity().then(function(account) {
            vm.account = account;
        });

        function changePassword () {
            if (vm.password !== vm.confirmPassword) {
                vm.error = null;
                vm.success = null;
                vm.doNotMatch = 'ERROR';
            } else {
                vm.doNotMatch = null;
                Auth.changePassword(vm.password).then(function () {
                    vm.error = null;
                    vm.success = 'OK';
                    $state.go('home',null,{reload:true});
                    toastr.info("Modification du mot de passe effectuée avec succès ");
                }).catch(function () {
                    vm.success = null;
                    vm.error = 'ERROR';
                });
            }
        }
    }
})();
