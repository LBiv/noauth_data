(function () {
  angular
    .module('noauthData')
    .controller(
      'RetrieveController',
      RetrieveController);
  
  function RetrieveController(
    DatacryptService,
    YJPSService) {

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
          rc.displays.data = DatacryptService.decryptData(response.data);
        });
    }

    function asFileButton() {
      
    }

    function activate() {

    }

  }

})();

      

  
