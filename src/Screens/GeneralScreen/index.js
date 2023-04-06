import React, {memo, useCallback, useState} from 'react';
import {View, FlatList, Text, ScrollView, SafeAreaView} from 'react-native';
import useFavourateScreen from './useGeneralScreen';
import {styles} from './styles';
import Header from '../../Components/Header';
import {arrowback, accessibleforward} from '../../Assests';
import {Colors} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
const GeneralScreen = () => {
  return (
    <View>
      <Header
        headerTitle={'General'}
        arrowBackIcon={arrowback}
        backText={'Back'}
        saveReset={'Save'}
        style={styles.filterHeader}
        saveResetStyle={styles.save}
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
