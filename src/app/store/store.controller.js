(function () {
  angular
    .module('noauthData')
    .controller(
      'StoreController',
      StoreController);
  
  function StoreController(KeysService) {
    var sc = this;

    sc.textData = '';

    activate();

    function activate() {

    }
  }

})();

      

  
