(function() {
  'use strict';

  angular
    .module('noauthData')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('keys', {
        url: '/keys/',
        templateUrl: 'app/keys/keys.html',
        controller: 'KeysController',
        controllerAs: 'kc'
      })
      .state('store', {
        url: '/store/',
        templateUrl: 'app/store/store.html',
        controller: 'StoreController',
        controllerAs: 'sc'
      })
      .state('retrieve', {
        url: '/retrieve/',
        templateUrl: 'app/retrieve/retrieve.html',
        controller: 'RetrieveController',
        controllerAs: 'rc'
      })
      .state('provider', {
        url: '/provider/',
        templateUrl: 'app/provider/provider.html',
        controller: 'ProviderController',
        controllerAs: 'pc'
      });

    $urlRouterProvider.otherwise('/keys/');
  }

})();
