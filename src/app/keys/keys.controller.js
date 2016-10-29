(function () {
  angular
    .module('noauthData')
    .controller(
      'KeysController',
      KeysController);
  
  function KeysController(KeysService) {
    var kc = this;

    kc.keyInput = '';
    kc.generateNewKeys = generateNewKeysButton;
    kc.saveKey = saveKeyButton;

    activate();

    function generateNewKeysButton() {
      KeysService.generateKeys();
    }

    function saveKeyButton() {
      KeysService.setSecretKey(kc.keyInput);
      kc.keyInput = '';
    }

    function activate() {

    }
  }

})();

      

  
