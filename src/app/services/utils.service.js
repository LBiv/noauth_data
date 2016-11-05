angular
  .module('noauthData')
  .service(
    'UtilsService',
    function () {

      this.encodeB64 = encodeB64;
      this.decodeB64 = decodeB64;

      function encodeB64(uint8array) {
        return btoa(
          String
            .fromCharCode
            .apply(
              null,
              uint8array));
      }

      function decodeB64(b64String) {
        return new Uint8Array(
          atob(b64String)
            .split("")
            .map(function (c) {
              return c.charCodeAt(0)
            }));
      }

    });
