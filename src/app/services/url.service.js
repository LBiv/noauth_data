angular
  .module('noauthData')
  .service(
    'UrlService',
    function (ProviderService) {

      // This service constructs URLs for remote calls.
      this.storeData = storeData;
      this.retrieveData = retrieveData;

      function storeData() {
        return 'https://' + ProviderService.getProviderUrl() + ProviderService.getPortUrl() + '/store/';
      }

      function retrieveData() {
        return 'https://' + ProviderService.getProviderUrl() + ProviderService.getPortUrl() + '/retrieve/';
      }

    });
