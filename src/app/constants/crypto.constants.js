angular
  .module('noauthData')
  .constant(
    'CryptoConstants',
    {
      YJPS: {
        DATA: 'data',    
        KEY: 'keyslot',
        KEYS: 'keyslots',
        DATAID: 'data_id',
        KEY_IDS: 'keyslot_ids',
        KEY_ID: 'keyslot_id',
      },
      CONTENT: {
        EPHEMERAL_KEY: 'ephemeral',
        BODY: 'body'
      }
    });


