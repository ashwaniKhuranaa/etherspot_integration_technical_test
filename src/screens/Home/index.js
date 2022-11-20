import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, Pressable} from 'react-native';

import styles from '../../styles';

const Home = ({navigation}) => {
  // Check if we have alredy generated a private key to determine if we show the access wallet button
  const currentPk = useSelector(store => store.wallets.currentPk);

  const onPressNewWallet = useCallback(() => {
    navigation.navigate('walletGeneration');
  }, [navigation]);

  const onPressRecoverWallet = useCallback(() => {
    navigation.navigate('walletRecovery');
  }, [navigation]);

  const onPressAccessWallet = useCallback(() => {
    navigation.navigate('wallet');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        {currentPk ? (
          <Pressable onPress={onPressAccessWallet}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Access my wallet</Text>
            </View>
          </Pressable>
        ) : (
          <Pressable onPress={onPressNewWallet}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Generate new wallet</Text>
            </View>
          </Pressable>
        )}
        <Pressable onPress={onPressRecoverWallet}>
          <View style={styles.altButton}>
            <Text style={styles.altButtonText}>Recover Wallet</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
