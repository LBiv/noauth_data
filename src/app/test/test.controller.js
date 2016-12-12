(function () {
  angular
    .module('noauthData')
    .controller(
      'TestController',
      TestController);
  
  function TestController($http) {
    var tc = this;

    tc.displays = {
      storeResponse: '',
      getResponse: ''
    }

    tc.buttons = {
      storeData: storeDataButton,
      getData: getDataButton
    };

    tc.inputs = {
      dataId: '',
      keyslotId: ''
    }

    activate();

    function storeDataButton() {

      $http.post('http://localhost:9000/data/store',
        {
          data: {some_data: "this is our data"},
          keyslots: [
            "keyslot1",
            "keyslot2"
          ]
        }
/**
        {
          string: "this is some string lol"
        }
**/        
        )
      .then(function (response) {
        tc.displays.testResponse = response.data;
        tc.inputs.dataId = response.data.data_id;
        tc.inputs.keyslotId = response.data.keyslot_ids[0];
      });
    }

    function getDataButton() {
      
      $http.post('http://localhost:9000/data/retrieve',
        {
          data_id: tc.inputs.dataId,
          keyslot_id: tc.inputs.keyslotId
        }
        )
      .then(function (response) {
        tc.displays.getResponse = response.data;
      });
    }

    function activate() {

    }
  }

})();

      

  
