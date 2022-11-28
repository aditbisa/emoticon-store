import EmoticonStore from '@contracts/EmoticonStore.json';

/**
 * Some value will be replaced by `setenv.js`.
 */
export const environment = {
  production: false,
  contractAddress: '0x00',
  contractAbi: EmoticonStore.abi,
  testOwnerAddress: '0x00',
  testBuyerAddress: '0x00',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';
