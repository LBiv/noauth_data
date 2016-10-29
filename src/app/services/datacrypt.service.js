angular
  .module('noauthData')
  .service(
    'DatacryptService',
    function (NaclService) {

      this.encryptData = encryptData;    



      function encryptData(plaintext, privkey, pubkeys) {
        
      }

    });
