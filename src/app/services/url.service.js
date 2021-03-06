angular
  .module('noauthData')
  .service(
    'UrlService',
    function (ProviderService) {

      // This service constructs URLs for remote calls.
      this.storeData = storeData;
      this.retrieveData = retrieveData;

      function storeData() {
        return ProviderService.getProviderUrl() + ':' + ProviderService.getProviderPort() + '/storecrypt';
      }

      function retrieveData() {
        return ProviderService.getProviderUrl() + ':' + ProviderService.getProviderPort() + '/getcrypt';
      }

    });
