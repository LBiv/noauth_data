angular
  .module('noauthData')
  .service(
    'UtilsService',
    function (NaclService) {

      this.encodeB64 = encodeB64;
      this.decodeB64 = decodeB64;
      this.encode_utf8 = NaclService.encode_utf8;
      this.decode_utf8 = NaclService.decode_utf8;

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
