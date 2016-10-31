angular
  .module('noauthData')
  .service(
    'DatacryptService',
    function (
      NaclService,
      UtilsService,
      KeysService) {

      this.encryptData = encryptData;
      this.decryptData = decryptData;

      function encryptData(plaintext, pubkeys) {
        var result = {};

        var ephemeral_pair =  NaclService.crypto_box_keypair();
        result.ephemeral = UtilsService.encodeB64(ephemeral_pair['boxPk']);

        var dataNonce = NaclService.crypto_box_random_nonce();
        var dataKey = NaclService.random_bytes(NaclService.crypto_stream_KEYBYTES);

        result.encrypted_data = UtilsService.encodeB64(
          NaclService.crypto_stream_xor(
            NaclService.encode_utf8(plaintext),
            dataNonce,
            dataKey));

        var dataNonceKey = new Uint8Array(dataNonce.length + dataKey.length);
        dataNonceKey.set(dataNonce);
        dataNonceKey.set(dataKey, NaclService.crypto_stream_NONCEBYTES);

        result.encrypted_key = _.map(
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

      function decryptData(cipherObj) {

        var secretkey = KeysService.getSecretKey();
        var pubkey = KeysService.getPublicKey();

        var binaryEphem = UtilsService.decodeB64(
            cipherObj['ephemeral']);

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
            cipherObj['encrypted_key']),
          keyNonce,
          keyKey['boxK']);

        var dataNonce = dataNonceKey.slice(0, NaclService.crypto_stream_NONCEBYTES);
        var dataKey = dataNonceKey.slice(
          NaclService.crypto_stream_NONCEBYTES,
          NaclService.crypto_stream_KEYBYTES + NaclService.crypto_stream_NONCEBYTES);

        return NaclService.decode_utf8(
          NaclService.crypto_stream_xor(
            UtilsService.decodeB64(
              cipherObj['encrypted_data']),
            dataNonce,
            dataKey));
      }


    });
