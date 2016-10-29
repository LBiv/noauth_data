(function() {
  'use strict';

  angular
    .module('noauthData')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
