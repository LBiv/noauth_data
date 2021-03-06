(function () {
  angular
    .module('noauthData')
    .controller(
      'IndexController',
      IndexController);

  function IndexController(
    $state,
    $mdDialog,
    ProviderService,
    KeysService) {

    var _secretDisplay;
    var _publicDisplay;
    var ic = this;

    ic.currentSecret = currentSecret;
    ic.currentPublic = currentPublic;
    ic.currentProvider = currentProvider;

    ic.buttons = {
      providerMode: providerModeButton,
      keysMode: keysModeButton,
      storeMode: storeModeButton,
      retrieveMode: retrieveModeButton,
      showSecret: showSecretButton,
      showPublic: showPublicButton
    }

    activate();

    function currentSecret() {
      return _.truncate(KeysService.getSecretKey(), {'length': 11});
    }

    function currentPublic() {
      return _.truncate(KeysService.getPublicKey(), {'length': 11});
    }

    function currentProvider() {
      return ProviderService.getProviderUrl();
    }

    function providerModeButton() {
      $state.go('provider')
    }

    function keysModeButton() {
      $state.go('keys');
    }

    function storeModeButton() {
      $state.go('store');
    }

    function retrieveModeButton() {
      $state.go('retrieve');
    }

    function showSecretButton() {
      _secretDisplay
        .textContent(KeysService.getSecretKey());

      $mdDialog.show(_secretDisplay);
    }

    function showPublicButton() {
      _publicDisplay
        .textContent(KeysService.getPublicKey());

      $mdDialog.show(_publicDisplay);
    }

    function activate() {
      _secretDisplay = $mdDialog.alert()
        .title('Secret Encryption Key')
        .clickOutsideToClose(true)
        .ok('Close');

      _publicDisplay = $mdDialog.alert()
        .title('Public Encryption Key')
        .clickOutsideToClose(true)
        .ok('Close');
    }
  }
})();

      

  
