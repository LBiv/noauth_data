angular
  .module('noauthData')
  .service(
    'KeysService',
    function (NaclService) {

      // This service manages the base64 (ascii) private key.
      var _secretKey = '';
      var _publicKey = '';

      this.getSecretKey = getSecretKey;
      this.getPublicKey = getPublicKey;
      this.setSecretKey = setSecretKey;
      this.generateKeys = generateKeys;

      function setSecretKey(key) {
        _secretKey = key;

        var publicUint8 = NaclService.crypto_scalarmult_base(
          new Uint8Array(
            atob(_secretKey)
              .split("")
              .map(function (c) {
                return c.charCodeAt(0)
              })));

        _publicKey = btoa(String.fromCharCode.apply(
          null,
          publicUint8))
      }

      function getSecretKey() {
        return _secretKey;
      }

      function getPublicKey() {
        return _publicKey;
      }

      function generateKeys() {
        var keypair = NaclService.crypto_box_keypair();

        _secretKey = btoa(
          String.fromCharCode.apply(
            null,
            keypair['boxSk']));

        _publicKey = btoa(
          String.fromCharCode.apply(
            null,
            keypair['boxPk']));
      }

    });
