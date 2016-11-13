angular
  .module('noauthData')
  .service(
    'YJPSService',
    function ($http, UrlService) {

      // This service provides wrappers for calling to yjps. 
      this.storeData = storeData;
      this.retrieveData = storeData;

      function storeData(toStore) {
        return $http.post(UrlService.storeData(), toStore);
      }

      function retrieveData(toRetrieve) {
        return $http.post(UrlService.retrieveData(), toRetrieve);
      }

    });
