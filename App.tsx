/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useMemo} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import {Keypair, Connection, PublicKey, Transaction} from '@solana/web3.js';
import {CoinflowWithdraw} from '@coinflowlabs/react-native';

const publicKey = new PublicKey('Cq5FCrMeQcp31qBtqjyQW31gWHhUGBndqAztcw4GjuPv');
const secretKey = Keypair.fromSecretKey(
  new Uint8Array([
    207, 103, 107, 219, 221, 87, 59, 118, 71, 106, 157, 181, 230, 45, 44, 205,
    232, 141, 81, 84, 4, 221, 221, 150, 127, 167, 99, 192, 192, 247, 25, 3, 175,
    193, 60, 24, 175, 186, 218, 90, 16, 167, 75, 131, 173, 156, 192, 230, 120,
    15, 137, 86, 167, 60, 40, 142, 197, 159, 14, 249, 254, 238, 193, 225,
  ]),
);

function App(): JSX.Element {
  const connection = useMemo(
    () => new Connection('https://api.devnet.solana.com', 'confirmed'),
    [],
  );

  const sendTransaction = async (transaction: Transaction) => {
    try {
      console.log('sendTransaction');
      transaction.partialSign(secretKey);
      const serializedTransaction = transaction.serialize();
      const signature = await connection.sendRawTransaction(
        serializedTransaction,
      );
      console.log({signature});
      return signature;
    } catch (e) {
      console.error('!!!!!sendTransaction catch!!!!!!');
      console.error(e);
      throw e;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Public key: {publicKey?.toString()}</Text>
      <CoinflowWithdraw
        style={styles.video}
        wallet={{
          publicKey,
          sendTransaction,
        }}
        merchantId={'paysafe'}
        connection={connection}
        blockchain={'solana'}
        env={'staging'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  // container: {
  //   borderStyle: 'solid',
  //   borderWidth: 2,
  //   borderColor: 'red',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingTop: 50,
  //   paddingBottom: 30,
  //   width: Dimensions.get('window').width,
  //   height: Dimensions.get('window').height,
  // },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  video: {
    marginTop: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
  },
});

export default App;
