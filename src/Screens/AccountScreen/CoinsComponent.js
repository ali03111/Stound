import React, {useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import useAccountScreen from './useAccountScreen';
import {styles} from './styles';
import {AccountProfile, coin} from '../../Assests';
import {TextComponent} from '../../Components/TextComponent';
import {Touchable} from '../../Components/Touchable';
const CoinsComponent = ({RemainingCoins}) => {
  return (
    <View style={styles.porfileContainer}>
      <View style={styles.coinIcon}>
        <Image source={coin} style={styles.coin} />
      </View>
      <View style={styles.coinText}>
        <TextComponent text={'Coins'} styles={styles.coinInnerText} />
      </View>
      <View style={styles.coinsBtn}>
        <Pressable Opacity={0.7} style={styles.cBtn}>
          <TextComponent text={RemainingCoins} styles={styles.coinNumber} />
          <TextComponent text={' Remains'} styles={styles.BtnText} />
        </Pressable>
      </View>
    </View>
  );
};

export default CoinsComponent;
