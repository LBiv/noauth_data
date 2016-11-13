(function () {
  angular
    .module('noauthData')
    .controller(
      'RetrieveController',
      RetrieveController);
  
  function RetrieveController(
    DatacryptService,
    UtilsService,
    YJPSService) {

    var _decrypted;
    var rc = this;

    rc.buttons = {
      retrieveData: retrieveDataButton,
      asFile: asFileButton
    };

    rc.inputs = {
      dataId: '',
      keyslotId: ''
    };

    rc.displays = {
      data: ''
    };

    activate();

    function retrieveDataButton() {
      YJPSService.retrieveData(
        {
          dataId: rc.inputs.dataId,
          keyId: rc.inputs.keyslotId
        })
        .then(function (response) {
          _decrypted = DatacryptService.decryptData(response.data);
          rc.displays.data = UtilsService.decode_utf8(_decrypted);
        });
    }

    function asFileButton() {
      
    }

    function activate() {

    }

  }

})();
