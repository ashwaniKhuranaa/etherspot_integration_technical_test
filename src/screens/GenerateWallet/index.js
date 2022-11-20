import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';

import etherspot from '../../classes/etherspot';
import styles from '../../styles';

const GenerateWallet = ({navigation}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentPk = useSelector(store => store.wallets.currentPk);

  useEffect(() => {
    (async () => {
      await etherspot.init(dispatch);
      setIsLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressWallet = useCallback(() => {
    navigation.navigate('wallet');
  }, [navigation]);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {isLoaded ? currentPk : 'LOADING...'}
        </Text>
        <Text style={styles.sectionDescription}>
          This is your private key, write it down for future recovery
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        {isLoaded ? (
          <TouchableOpacity onPress={onPressWallet}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Access my wallet</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TouchableOpacity onPress={onPressBack}>
          <View style={styles.altButton}>
            <Text style={styles.altButtonText}>Go back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GenerateWallet;
