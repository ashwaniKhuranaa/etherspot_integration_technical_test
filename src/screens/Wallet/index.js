import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

import etherspot from '../../classes/etherspot';
import styles from '../../styles';

const Wallet = ({navigation}) => {
  const [receiverAdr, onChangeText] = useState();
  const [sendAmount, onChangeNumber] = useState();
  const [txHash, setTxHash] = useState();
  const dispatch = useDispatch();

  const currentPk = useSelector(store => store.wallets.currentPk);
  const currentAdr = useSelector(store => store.wallets.currentAdr);
  const balance = useSelector(store => store.wallets.currentBalance);

  const onPressSend = useCallback(async () => {
    const hash = await etherspot.sendEther({
      currentAdr,
      currentPk,
      sendAmount,
      dispatch,
    });
    setTxHash(hash);
  }, [currentAdr, currentPk, dispatch, sendAmount]);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>ETH Private Key: {currentAdr}</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>ETH Balance: {balance}</Text>
      </View>
      <View style={styles.sectionWalletContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={sendAmount}
          placeholder="Amount of ETH"
          keyboardType="numeric"
          placeholderTextColor="#FFF"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={receiverAdr}
          placeholder="Receiver Address"
          placeholderTextColor="#FFF"
        />
        <TouchableOpacity onPress={onPressSend}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Send Ether</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressBack}>
          <View style={styles.altButton}>
            <Text style={styles.altButtonText}>Go back</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* After a TX is sent successfully, displaying TX Hash */}
      {txHash ? (
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>
            ETH SENT! Your tx hash: {txHash}
          </Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Wallet;
