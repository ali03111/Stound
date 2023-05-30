import React, {memo, useCallback, useState} from 'react';
import {View, FlatList, Text, ScrollView, SafeAreaView} from 'react-native';
import useFavourateScreen from './useGeneralScreen';
import {styles} from './styles';
import Header from '../../Components/Header';
import {arrowback, accessibleforward} from '../../Assests';
import {Colors} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
import useGeneralScreen from './useGeneralScreen';
import {keyExtractor} from '../../Utils';
import {imageUrl} from '../../Utils/Urls';
const GeneralScreen = ({navigation, route}) => {
  const {data, title, selecteValue, selectedValue, onSave} = useGeneralScreen(
    navigation,
    route,
  );

  const renderItem = ({item, index}) => {
    return (
      <FilterAddButton
        title={item?.name}
        image={imageUrl(item.path)}
        style={styles.filterBtn(selectedValue, item)}
        textStyle={styles.innerText(selectedValue, item)}
        onPress={() => selecteValue(item)}
        tintColor={selectedValue.includes(item) ? Colors.white : Colors.black}
      />
    );
  };

  // const renderItem = useCallback(
  //   ({item, index}) => {
  //     return (
  //       <FilterAddButton
  //         title={item?.name}
  //         image={accessibleforward}
  //         style={styles.filterBtn(selectedValue, item)}
  //         textStyle={styles.innerText(selectedValue, item)}
  //         onPress={() => selecteValue(item)}
  //         tintColor={selectedValue.includes(item) ? Colors.white : Colors.black}
  //       />
  //     );
  //   },
  //   [selectedValue],
  // );

  return (
    <View>
      <Header
        headerTitle={title}
        arrowBackIcon={arrowback}
        backText={'Back'}
        saveReset={'Save'}
        style={styles.filterHeader}
        saveResetStyle={styles.save}
        goBack={() => navigation.goBack()}
        onSave={onSave}
      />

      <FlatList
        refreshing={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.filterMain}
        horizontal
      />

      {/* <View style={styles.filterMain}>
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
      </View> */}
    </View>
  );
};
export default memo(GeneralScreen);
