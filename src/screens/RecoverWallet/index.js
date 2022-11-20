import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, Pressable, TextInput} from 'react-native';

import etherspot from '../../classes/etherspot';
import styles from '../../styles';

const RecoverWallet = ({navigation}) => {
  const [newPk, onChangeText] = React.useState();
  const dispatch = useDispatch();

  const onPressRecover = useCallback(async () => {
    etherspot.recoverWallet(newPk, dispatch);
  }, [dispatch, newPk]);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Input your Private Key</Text>
      </View>
      <View style={styles.sectionWalletContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={newPk}
          placeholder="Private Key"
          placeholderTextColor="#FFF"
        />
        <Pressable onPress={onPressRecover}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Recover wallet</Text>
          </View>
        </Pressable>
        <Pressable onPress={onPressBack}>
          <View style={styles.altButton}>
            <Text style={styles.altButtonText}>Go back</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default RecoverWallet;
