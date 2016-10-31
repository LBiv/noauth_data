angular
  .module('noauthData')
  .service(
    'KeysService',
    function (
      NaclService,
      UtilsService) {

      // This service manages the base64 (ascii) private key.
      var _secretKey = '';
      var _publicKey = '';

      this.getSecretKey = getSecretKey;
      this.getPublicKey = getPublicKey;
      this.setSecretKey = setSecretKey;
      this.generateKeys = generateKeys;

      function setSecretKey(key) {
        _secretKey = key;

        _publicKey = UtilsService.encodeB64(
          NaclService.crypto_scalarmult_base(
            UtilsService.decodeB64(
              _secretKey)))
      }

      function getSecretKey() {
        return _secretKey;
      }

      function getPublicKey() {
        return _publicKey;
      }

      function generateKeys() {
        var keypair = NaclService.crypto_box_keypair();

        _secretKey = UtilsService.encodeB64(keypair['boxSk']);

        _publicKey = UtilsService.encodeB64(keypair['boxPk']);
      }

    });
