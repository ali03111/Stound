import React, {memo, useCallback, useState} from 'react';
import {View, FlatList, Text, ScrollView, SafeAreaView} from 'react-native';
import useFavourateScreen from './useFilterScreen';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import Header from '../../Components/Header';
import {Picker} from '@react-native-picker/picker';
import {arrowback, accessibleforward} from '../../Assests';
import SwitchSelector from 'react-native-switch-selector';
import {Colors} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
import ThemeButtonComp from '../../Components/ThemeButtonComp';
const GeneralScreen = () => {
  return (
    <View>
      <Header
        headerTitle={'General'}
        arrowBackIcon={arrowback}
        backText={'Back'}
        saveReset={'Reset'}
        style={styles.filterHeader}
      />

      <View style={styles.filterMain}>
        <FilterAddButton
          title={'Appliances'}
          image={accessibleforward}
          style={styles.filterBtn}
        />
        <FilterAddButton
          title={'Exterior Lighting'}
          image={accessibleforward}
          style={styles.filterBtn}
        />
        <FilterAddButton
          title={'Exterior Lighting'}
          image={accessibleforward}
          style={styles.filterBtn}
        />
      </View>
    </View>
  );
};
export default memo(GeneralScreen);
