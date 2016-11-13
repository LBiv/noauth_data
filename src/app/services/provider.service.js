angular
  .module('noauthData')
  .service(
    'ProviderService',
    function () {

      // This service manages the service provider which we attempt to access.
      var _url = '';
      var _port = '';

      this.getProviderUrl = getProviderUrl;
      this.getProviderPort = getProviderPort;
      this.setProviderUrl = setProviderUrl;
      this.setProviderPort = setProviderPort;

      function getProviderUrl() {
        return _url;
      }

      function getProviderPort() {
        return _port;
      }

      function setProviderUrl(url) {
        _url = url;
      } 

      function setProviderPort(port) {
        _port = port;
      } 

    });
