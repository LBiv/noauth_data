angular
  .module('noauthData')
  .service(
    'NaclService',
    function () {

      // This service instantiates nacl_lib and provides an interface to all of its functionality for all other services.
      var nacl;
      nacl_factory.instantiate( function (nacl_lib) {
        nacl = nacl_lib;
      });

      this.to_hex = nacl.to_hex;
      this.from_hex = nacl.from_hex;
      this.encode_utf8 = nacl.encode_utf8;
      this.encode_latin1 = nacl.encode_latin1;
      this.decode_utf8 = nacl.decode_utf8;
      this.decode_latin1 = nacl.decode_latin1;
      this.crypto_hash = nacl.crypto_hash;
      this.crypto_hash_string = nacl.crypto_hash_string;
      this.crypto_box_keypair = nacl.crypto_box_keypair;
      this.crypto_box_random_nonce = nacl.crypto_box_random_nonce;
      this.crypto_box = nacl.crypto_box;
      this.crypto_box_open = nacl.crypto_box_open;
      this.crypto_box_precompute = nacl.crypto_box_precompute;
      this.crypto_box_precomputed = nacl.crypto_box_precomputed;
      this.crypto_box_open_precomputed = nacl.crypto_box_open_precomputed;
      this.crypto_secretbox_random_nonce = nacl.crypto_secretbox_random_nonce;
      this.crypto_secretbox = nacl.crypto_secretbox;
      this.crypto_secretbox_open = nacl.crypto_secretbox_open;
      this.crypto_stream_random_nonce = nacl.crypto_stream_random_nonce;
      this.crypto_stream = nacl.crypto_stream;
      this.crypto_stream_xor = nacl.crypto_stream_xor;
      this.crypto_sign_keypair = nacl.crypto_sign_keypair;
      this.crypto_sign_open = nacl.crypto_sign_open;
      this.crypto_sign_detached = nacl.crypto_sign_detached;
      this.crypto_sign_verify_detached = nacl.crypto_sign_verify_detached;
      this.crypto_sign_seed_keypair = nacl.crypto_sign_seed_keypair;
      this.crypto_box_seed_keypair = nacl.crypto_box_seed_keypair;
      this.crypto_box_keypair_from_raw_sk = nacl.crypto_box_keypair_from_raw_sk;
      this.crypto_scalarmult = nacl.crypto_scalarmult;
      this.crypto_scalarmult_base = nacl.crypto_scalarmult_base;

    });
