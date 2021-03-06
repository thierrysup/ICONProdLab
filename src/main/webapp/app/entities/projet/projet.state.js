(function() {
    'use strict';

    angular
        .module('iconlabApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('projet', {
            parent: 'entity',
            url: '/projet?page&sort&search',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Projets'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/projet/projets.html',
                    controller: 'ProjetController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
            }
        })
        .state('projet-detail', {
            parent: 'entity',
            url: '/projet/{id}',
            data: {
                authorities: ['ROLE_USER','ROLE_CEO','ROLE_DO','ROLE_PMO'],
                pageTitle: 'Projet'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/projet/projet-detail.html',
                    controller: 'ProjetDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Projet', function($stateParams, Projet) {
                    return Projet.get({id : $stateParams.id}).$promise;
                }]
            }
        })
            .state('app.projetcompte.newuser', {
            parent: 'app.projetcompte',
            url: '/new',
            data: {
                authorities: ['ROLE_USER','ROLE_CEO','ROLE_DO','ROLE_PMO']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/projet/projet-dialogC.html',
                    controller: 'ProjetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    windowClass:'center-modal',
                    size: 'md',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                code: null,
                                description: null,
                                fichierProjet: null,
                                fichierProjetContentType: null,
                                fromt: null,
                                tot: null,
                                actif: null,
                                sortable: null,
                                classes: null,
                                height: null,
                                color: null,
                                parent: null,
                                tooltips: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('app.projetcompte', null, { reload: true });
                }, function() {
                    $state.go('app.projetcompte');
                });
            }]
        })
            .state('projet.newadmin', {
            parent: 'projet',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/projet/projet-dialog.html',
                    controller: 'ProjetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    windowClass:'center-modal',
                    size: 'md',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                code: null,
                                description: null,
                                fichierProjet: null,
                                fichierProjetContentType: null,
                                fromt: null,
                                tot: null,
                                actif: null,
                                sortable: null,
                                classes: null,
                                height: null,
                                color: null,
                                parent: null,
                                tooltips: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('projet', null, { reload: true });
                }, function() {
                    $state.go('projet');
                });
            }]
        })
        .state('projet.editadmin', {
            parent: 'projet',
            url: '/{idp}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/projet/projet-dialog.html',
                    controller: 'ProjetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    windowClass:'center-modal',
                    size: 'md',
                    resolve: {
                        entity: ['Projet', function(Projet) {
                            return Projet.get({id : $stateParams.idp}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('projet', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('app.projetcompte.edituser', {
            parent: 'app.projetcompte',
            url: '/{idprojet}/edituser',
            data: {
                authorities: ['ROLE_USER','ROLE_CEO','ROLE_DO','ROLE_PMO']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/projet/projet-dialogC.html',
                    controller: 'ProjetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    windowClass:'center-modal',
                    size: 'md',
                    resolve: {
                        entity: ['Projet', function(Projet) {
                            return Projet.get({id : $stateParams.idprojet}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('app.projetcompte', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
            .state('app.tacheprojet.detailuser', {
                parent: 'app.tacheprojet',
                url: '/projetdesc/{idprojet}',
                data: {
                    authorities: ['ROLE_USER','ROLE_CEO','ROLE_DO','ROLE_PMO']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/projet/detailprojet.html',
                        controller: 'ProjetDetailController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        windowClass:'center-modal',
                        size: 'md',
                        resolve: {
                            entity: ['Projet', function(Projet) {
                                return Projet.get({id : $stateParams.idprojet}).$promise;
                            }]
                        }
                    }).result.then(function() {
                        $state.go('app.tacheprojet', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    });
                }]
            })
            .state('app.projetcompte.editmessage', {
                parent: 'app.projetcompte',
                url: '/{idedtmess}/editmessage',
                data: {
                    authorities: ['ROLE_USER','ROLE_CEO','ROLE_DO','ROLE_PMO']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/message-hierachique/message-hierachiqueU.html',
                        controller: 'MessageHierachiqueDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        windowClass:'center-modal',
                        size: 'md',
                        resolve: {
                            entity: ['MessageHierachique', function(MessageHierachique) {
                                return MessageHierachique.get({id : $stateParams.idedtmess}).$promise;
                            }]
                        }
                    }).result.then(function() {
                        $state.go('app.projetcompte', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    });
                }]
            })
            .state('app.projetcompte.editdocument', {
                parent: 'app.projetcompte',
                url: '/{idedtdoc}/editDoc',
                data: {
                    authorities: ['ROLE_USER','ROLE_CEO','ROLE_DO','ROLE_PMO']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/documents/documents-dialogU.html',
                        controller: 'DocumentsDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        windowClass:'center-modal',
                        size: 'md',
                        resolve: {
                            entity: ['Documents', function(Documents) {
                                return Documents.get({id : $stateParams.idedtdoc}).$promise;
                            }]
                        }
                    }).result.then(function() {
                        $state.go('app.projetcompte', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    });
                }]
            })
            .state('projet.delete', {
            parent: 'projet',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/projet/projet-delete-dialog.html',
                    controller: 'ProjetDeleteController',
                    controllerAs: 'vm',
                    windowClass:'center-modal',
                    size: 'md',
                    resolve: {
                        entity: ['Projet', function(Projet) {
                            return Projet.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('projet', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
