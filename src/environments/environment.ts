import EmoticonStore from '@contracts/EmoticonStore.json';

/**
 * Some value will be replaced by `setenv.js`.
 */
export const environment = {
  production: false,
  contractAddress: '0x2484c202b115A52a87684bc0812634E5AE7C1361',
  contractAbi: EmoticonStore.abi,
  testOwnerAddress: '0xA15D2caeF71Dc861897ACd6584fB1469Bf7A896a',
  testBuyerAddress: '0x1ECD935F494D8B90995a5C9c63769d4f840F840c',
  testProvider: 'http://127.0.0.1:7545',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';
