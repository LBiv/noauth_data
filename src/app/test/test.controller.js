(function () {
  angular
    .module('noauthData')
    .controller(
      'TestController',
      TestController);
  
  function TestController($http) {
    var tc = this;

    tc.displays = {
      testResponse: ''
    }

    tc.buttons = {
      testButton: testButton
    };

    activate();

    function testButton() {

      $http.post('http://localhost:9000/data/store',
        {
          data: "this is our data",
          keyslots: [
            "keyslot1",
            "keyslot2"
          ]
        }
      /**  {
          string: "this is some string lol"
        } **/
        
        )
      .then(function (response) {
        tc.displays.testResponse = response.data;
      });
    }

    function activate() {

    }
  }

})();

      

  
