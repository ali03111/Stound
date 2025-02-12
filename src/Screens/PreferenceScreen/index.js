import React, {memo, useState} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import Header from '../../Components/Header';
import {Picker} from '@react-native-picker/picker';
import {arrowback, addcircle, catImage} from '../../Assets';
import {Colors, FontSize} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
import ThemeButtonComp from '../../Components/ThemeButtonComp';
import {keyExtractor} from '../../Utils';
import {hp, wp} from '../../Config/responsive';
import SwitchSelector from 'react-native-switch-selector';
import {imageUrl} from '../../Utils/Urls';
import Ionicons from 'react-native-vector-icons/Ionicons';

import usePreferenceScreen from './usePreferenceScreen';

const PreferenceScreen = ({navigation, route}) => {
  const [Modal0, setModal0] = useState(false);

  const {
    dynamicNav,
    onSelecteTag,
    postData,
    preferencesData,
    gp,
    ip,
    op,
    cat,
    onResetState,
    options,
    category,
  } = usePreferenceScreen(navigation, route);

  const renderItem = ({item, index}) => {
    return (
      <FilterAddButton
        style={styles.tags}
        title={item?.name}
        image={imageUrl(item.path)}
        required={true}
        tintColor={Colors.primaryTextColor}
      />
    );
  };

  const FlatListComp = ({data, onPress}) => {
    return (
      <FlatList
        refreshing={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatListMain}
        horizontal
        ListFooterComponentStyle={{
          alignItems: 'center',
          marginBottom: hp('1.5'),
        }}
        ListFooterComponent={() => {
          return (
            <FilterAddButton
              style={styles.filterButton}
              image={addcircle}
              isRequired={true}
              title={'Add'}
              tintColor={Colors.primaryTextColor}
              onPress={onPress}
            />
          );
        }}
      />
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Header
          saveReset={'Reset'}
          headerTitle={'Preferences'}
          onSave={onResetState}
          backText={'Back'}
          arrowBackIcon={arrowback}
          goBack={() => navigation.goBack()}
        />

        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.filterMain}>
            <View style={styles.collapseContainer}>
              <View style={styles.body}>
                <SwitchSelector
                  options={options}
                  initial={0}
                  onPress={value => onSelecteTag(value, 'adType')}
                  backgroundColor="rgba(11, 180, 255, 0.03);"
                  buttonColor={Colors.primaryColor}
                  borderRadius={10}
                  height={45}
                  style={styles.switcher}
                />
                <TextComponent
                  styles={styles.itemHeading}
                  text={'Property Type '}
                />
                {Platform.OS == 'ios' ? (
                  <Pressable
                    onPress={() => setModal0(prev => !prev)}
                    style={styles.pickerStyle}>
                    <Image source={catImage} />
                    <TextComponent
                      text={category || 'e.g. home, apartment, room'}
                      styles={styles.iosPick}
                    />
                    <Ionicons
                      style={styles.dropDown}
                      color={Colors.primaryColor}
                      name={'caret-down'}
                      size={hp(2)}
                    />
                  </Pressable>
                ) : (
                  <View style={styles.pickerStyle}>
                    <Image source={catImage} />
                    <Picker
                      dropdownIconColor={Colors.primaryColor}
                      style={styles.pick}
                      selectedValue={cat}
                      onValueChange={(itemValue, itemIndex) => {
                        onSelecteTag(itemValue, 'cat');
                      }}>
                      <Picker.Item
                        label={category || 'e.g. home, apartment, room'}
                        value={null}
                      />

                      {preferencesData.cat &&
                        preferencesData.cat.map(res => {
                          return (
                            <Picker.Item
                              label={res.name}
                              value={res.categoryId}
                            />
                          );
                        })}
                    </Picker>
                  </View>
                )}

                <TextComponent
                  styles={styles.itemHeading}
                  text={'General Preferences '}
                />
                <View style={styles.addButton}>
                  <FlatListComp
                    data={gp}
                    onPress={() =>
                      dynamicNav({
                        title: 'General',
                        data: preferencesData.gp,
                        key: 'gp',
                        value: gp,
                      })
                    }
                  />
                </View>
                <TextComponent
                  styles={styles.itemHeading}
                  text={'Outside Preferences '}
                />
                <View style={styles.addButton}>
                  <FlatListComp
                    data={op}
                    onPress={() =>
                      dynamicNav({
                        title: 'Outside',
                        data: preferencesData.op,
                        key: 'op',
                        value: op,
                      })
                    }
                  />
                </View>
                <TextComponent
                  styles={styles.itemHeading}
                  text={'Inside Preferences '}
                />
                <View style={styles.addButton}>
                  <FlatListComp
                    data={ip}
                    onPress={() =>
                      dynamicNav({
                        title: 'Inside',
                        data: preferencesData.ip,
                        key: 'ip',
                        value: ip,
                      })
                    }
                  />
                </View>
              </View>
            </View>

            <ThemeButtonComp
              title={'Save'}
              style={styles.applyFilter}
              textStyle={styles.filterText}
              onPress={() => postData()}
            />
          </View>
        </ScrollView>
      </View>
      {/* Category PICKER */}
      <Modal animationType="slide" visible={Modal0} transparent={true}>
        <View style={styles.Modal}>
          <View style={styles.innerContainer}>
            <View style={styles.titleContainer}>
              <TextComponent
                styles={styles.modalText}
                onPress={() => setModal0(false)}
                text={'Done'}
              />
            </View>
            <Picker
              dropdownIconColor={Colors.primaryColor}
              style={styles.pick}
              selectedValue={cat}
              onValueChange={(itemValue, itemIndex) => {
                onSelecteTag(itemValue, 'cat');
                // Find the selected category name based on itemValue
                const selectedCategory = preferencesData.cat.find(
                  categoryItem => categoryItem.categoryId === itemValue,
                );
                // Update the category state with the selected category name
                onSelecteTag(
                  selectedCategory ? selectedCategory.name : '',
                  'category',
                );
              }}>
              <Picker.Item
                // color="gray"
                label="Select Category..."
                value={null}
              />
              {preferencesData.cat &&
                preferencesData.cat.map((res, index) => {
                  {
                    cat && index == 2 && setCategory(res.name);
                  }

                  return (
                    <Picker.Item
                      label={res.name}
                      // color="black"
                      // style={{color: 'black'}}
                      value={res.categoryId}
                    />
                  );
                })}
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default memo(PreferenceScreen);
