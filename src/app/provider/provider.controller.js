(function () {
  angular
    .module('noauthData')
    .controller(
      'ProviderController',
      ProviderController);
  
  function ProviderController(ProviderService) {
    var pc = this;

    pc.inputs = {
      providerUrl: ProviderService.getProviderUrl(),
      providerPort: ProviderService.getProviderPort()
    };

    pc.buttons = {
      setProvider: setProviderButton
    };

    activate();

    function setProviderButton() {
      ProviderService.setProviderUrl(pc.inputs.providerUrl);
      ProviderService.setProviderPort(pc.inputs.providerPort);
    }

    function activate() {

    }
  }

})();

      

  
