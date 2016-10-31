(function () {
  angular
    .module('noauthData')
    .controller(
      'StoreController',
      StoreController);
  
  function StoreController(
    DatacryptService,
    KeysService) {

    var sc = this;

    sc.textData = '';
    sc.accessors = [];
    sc.newName = '';
    sc.newKey = '';

    sc.buttons = {
      removeAccessor: removeAccessorButton,
      addAccessor: addAccessorButton,
      storeData: storeDataButton,
      selfAccessor: selfAccessorButton
    }

    activate();

    function removeAccessorButton(toRemove) {
      _.remove(
        sc.accessors,
        toRemove);
    }

    function addAccessorButton() {

      if (sc.newName.length == 0 || sc.newKey == 0) {
        return;
      }

      var accessorObj = {
        'name': sc.newName,
        'key': sc.newKey
      }

      sc.accessors.push(accessorObj);
      sc.newName = '';
      sc.newKey = '';
    }

    function selfAccessorButton() {
      var accessorObj = {
        'name': 'myself',
        'key': KeysService.getPublicKey()
      }

      sc.accessors.push(accessorObj);
    }

    function storeDataButton() {
      var encObj = DatacryptService.encryptData(
        sc.textData,
        _.map(
          sc.accessors,
          'key'));

      console.log(encObj);

      var recObj = {
        'ephemeral': encObj['ephemeral'],
        'encrypted_data': encObj['encrypted_data'],
        'encrypted_key': encObj['encrypted_key'][0]
      }

      var decObj = DatacryptService.decryptData(recObj);

      console.log(decObj);
    }

    function activate() {

    }
  }

})();

      

  
