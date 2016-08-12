
(function () {
    'use strict';

    angular
            .module('iconlabApp')
            .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'navbar@': {
                    templateUrl: 'app/layouts/navbar/navbar.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'sidebar@': {
                    templateUrl: 'app/layouts/sidebar/sidebar.html',
                    controller: 'SidebarController',
                    controllerAs: 'vm'
                },
                 'article@': {
                    templateUrl: 'app/home/accueil.html',
                    controller: 'AcceuilInfoController',
                    controllerAs: 'vm'
                },
                'content@': {
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                authorize: ['Auth',
                    function (Auth) {
                        return Auth.authorize();
                    }
                ]
            }
        })
        .state('articleinfo', {
            parent: 'app',
            url: '/articleinfo/{idarticle}',
            data: {
                authorities: [],
                pageTitle: 'Article'
            },
            views: {
                'article@': {
                    templateUrl: 'app/entities/article/modalarticle.html',
                    controller: 'ArticleDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Article', function($stateParams, Article) {
                    return Article.get({id : $stateParams.idarticle}).$promise;
                }]
            }
        })
       .state('app.projetcompte', {
                parent: 'app',
                url: '/projet/compte/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Projet'
                },
                views: {
                    'content@': {

                        templateUrl: 'app/entities/projet/projetcompte.html',
                        controller: 'ProjetCompteController',
                        controllerAs: 'vm'

                   }
                },
                resolve: {
                    entity: ['$stateParams', 'Compte', function($stateParams, Compte) {
                        return Compte.get({id : $stateParams.id}).$promise;
                    }]
                }
            }).state('app.tacheprojet',{//tache d'un projet vue d'un chef de projet
                parent: 'app',

                url: '/listeTache/projet/{idprojet}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ListeTache'
                },
                views: {
                    'content@': {
                         controller: 'TacheProjetController',
                        controllerAs: 'vm',

                        templateUrl: 'app/entities/tache/listeTacheCp.html'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Projet', function($stateParams, Projet) {
                        console.log("id du projet "+$stateParams.idprojet);
                        return Projet.get({id : $stateParams.idprojet}).$promise;
                    }]
            }
        }
        ).state('app.tacheprojet.patache', {//Point d'avancement d'une tache  vue d'un chef de projet
            parent: 'app.tacheprojet',
            url: '/listePointAvancement/tache/{idtache}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: "Evolution Tache"
            },
            views: {
                'pacontent@app.tacheprojet': {
                    templateUrl: 'app/entities/point-avancement/listePointAvancement.html',
                    controller: 'PointAvancementTacheController',
                    controllerAs: 'vm'


                }
            },
            resolve: {
                entity: ['$stateParams', 'Tache', function ($stateParams, Tache) {
                        console.log("id de la Tache " + $stateParams.idtache);
                        return Tache.get({id: $stateParams.idtache}).$promise;
                    }]
            }



        }


            ).state('app.projetcompte.tacheprojet',{
                parent: 'app.projetcompte',

                url: '/listeTache/projet/{idprojet}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ListeTache'
                },
                views: {
                    'ganttcontent@app.projetcompte': {

                        templateUrl: 'app/entities/tache/gantt.html' ,
                         controller: 'GanttTacheProjetController',
                        controllerAs: 'vm'
                    },
                    'tachecontent@app.projetcompte': {

                        templateUrl: 'app/entities/tache/listeTache.html',
                        controller: 'TacheProjetController',
                        controllerAs: 'vm'
                    }


            },
            resolve: {
                entity: ['$stateParams', 'Projet', function ($stateParams, Projet) {
                        console.log("id du projet " + $stateParams.idprojet);
                        return Projet.get({id: $stateParams.idprojet}).$promise;
                    }]
            }



        }


        ).state('app.projetcompte.tacheprojet.patache', {
            parent: 'app.projetcompte.tacheprojet',
            url: '/listePointAvancement/tache/{idtache}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: "Evolution Tache"
            },
            views: {
                'pacontent@app.projetcompte.tacheprojet': {
                    templateUrl: 'app/entities/point-avancement/listePointAvancement.html',
                    controller: 'PointAvancementTacheController',
                    controllerAs: 'vm'


                }
            },
            resolve: {
                entity: ['$stateParams', 'Tache', function ($stateParams, Tache) {
                        console.log("id de la Tache " + $stateParams.idtache);
                        return Tache.get({id: $stateParams.idtache}).$promise;
                    }]
            }
        }


        ).state('app.patache', {//point d'avancement d'une tache  vue d'un excutive
            parent: 'app',
            url: '/listePointAvancement/tache/{idtache}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Point Avancement'
            },
            views: {
                'content@': {
                    controller: 'PointAvancementTacheController',
                    controllerAs: 'vm',
                    templateUrl: 'app/entities/point-avancement/listePointAvancementRt.html'

                }
            },
            resolve: {
                entity: ['$stateParams', 'Tache', function ($stateParams, Tache) {
                        console.log("id de la Tache " + $stateParams.idtache);
                        return Tache.get({id: $stateParams.idtache}).$promise;
                    }]
            }

        }
        );
    }
})();
