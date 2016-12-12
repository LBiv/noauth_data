angular
  .module('noauthData')
  .service(
    'DatacryptService',
    function (
      CryptoConstants,
      NaclService,
      UtilsService,
      KeysService) {

      this.encryptUtf8 = encryptUtf8;
      this.encryptFile = encryptFile;
      this.encryptData = encryptData;

      this.decryptUtf8 = decryptUtf8;
      this.decryptFile = decryptFile;
      this.decryptData = decryptData;

      function encryptUtf8(plainutf8, pubkeys) {
        return encryptData(
          NaclService.encode_utf8(plainutf8),
          pubkeys);
      }

      function encryptFile(plainfile, pubkeys) {
        return encryptData(plainfile, pubkeys);
      }

      function encryptData(plaindata, pubkeys) {
        var result = {};
        result[CryptoConstants.YJPS.DATA] = {};

        var ephemeral_pair =  NaclService.crypto_box_keypair();
        result[CryptoConstants.YJPS.DATA][CryptoConstants.CONTENT.EPHEMERAL_KEY] = UtilsService.encodeB64(ephemeral_pair['boxPk']);

        var dataNonce = NaclService.crypto_box_random_nonce();
        var dataKey = NaclService.random_bytes(NaclService.crypto_stream_KEYBYTES);

        result[CryptoConstants.YJPS.DATA][CryptoConstants.CONTENT.BODY] = UtilsService.encodeB64(
          NaclService.crypto_stream_xor(
            plaindata,
            dataNonce,
            dataKey));

        var dataNonceKey = new Uint8Array(dataNonce.length + dataKey.length);
        dataNonceKey.set(dataNonce);
        dataNonceKey.set(dataKey, NaclService.crypto_stream_NONCEBYTES);

        result[CryptoConstants.YJPS.KEYS] = _.map(
          pubkeys,
          function (pubkey) {

            var binaryPubkey = UtilsService.decodeB64(pubkey);
            var concatenated = new Uint8Array(ephemeral_pair['boxPk'].length + binaryPubkey.length);
            concatenated.set(binaryPubkey);
            concatenated.set(ephemeral_pair['boxPk'], binaryPubkey.length);
            var keyNonce = NaclService.crypto_hash(concatenated).slice(0, NaclService.crypto_stream_NONCEBYTES);
            var keyKey = NaclService.crypto_box_precompute(
              binaryPubkey,
              ephemeral_pair['boxSk'])['boxK']

            return UtilsService.encodeB64(
              NaclService.crypto_stream_xor(
                dataNonceKey,
                keyNonce,
                keyKey));
              
          });

        return result;
      }

      function decryptUtf8(cipherObj) {
        return NaclService.decode_utf8(
          decryptData(cipherObj));
      }

      function decryptFile(cipherObj) {
        return decryptData(cipherObj);
      }

      function decryptData(cipherObj) {

        var secretkey = KeysService.getSecretKey();
        var pubkey = KeysService.getPublicKey();

        var binaryEphem = UtilsService.decodeB64(
            cipherObj[CryptoConstants.YJPS.DATA][CryptoConstants.CONTENT.EPHEMERAL_KEY]);

        var keyKey = NaclService.crypto_box_precompute(
          binaryEphem,
          UtilsService.decodeB64(
            secretkey));

        var binaryPubkey = UtilsService.decodeB64(pubkey);
        var concatenated = new Uint8Array(binaryEphem.length + binaryPubkey.length);
        concatenated.set(binaryPubkey);
        concatenated.set(binaryEphem, binaryPubkey.length);
        var keyNonce = NaclService.crypto_hash(concatenated).slice(0, NaclService.crypto_stream_NONCEBYTES);

        var dataNonceKey = NaclService.crypto_stream_xor(
          UtilsService.decodeB64(
            cipherObj[CryptoConstants.YJPS.KEY]),
          keyNonce,
          keyKey['boxK']);

        var dataNonce = dataNonceKey.slice(0, NaclService.crypto_stream_NONCEBYTES);
        var dataKey = dataNonceKey.slice(
          NaclService.crypto_stream_NONCEBYTES,
          NaclService.crypto_stream_KEYBYTES + NaclService.crypto_stream_NONCEBYTES);

        return NaclService.crypto_stream_xor(
          UtilsService.decodeB64(
            cipherObj[CryptoConstants.YJPS.DATA][CryptoConstants.CONTENT.BODY]),
          dataNonce,
          dataKey);
      }


    });
