import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import Header from '../../Components/Header';
import {Picker} from '@react-native-picker/picker';
import {
  arrowback,
  addcircle,
  search,
  sliderdot,
  minslider,
  maxslider,
  catImage,
  adTitle,
  chat,
  bedblue,
  bluebath,
  UploadProfileImage,
  addGalleryImage,
  accessibleforward,
} from '../../Assets';
import {Colors, FontSize} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
import ThemeButtonComp from '../../Components/ThemeButtonComp';
import Slider from '@react-native-community/slider';
import {goBack, keyExtractor} from '../../Utils';
import {InputComponent} from '../../Components/InputComponent';
import useAddPostScreen from './usePreferenceScreen';
import {hp, wp} from '../../Config/responsive';
import {Touchable} from '../../Components/Touchable';
import SwitchSelector from 'react-native-switch-selector';
import {imageUrl} from '../../Utils/Urls';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {errorMessage} from '../../Config/NotificationMessage';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

const PreferenceScreen = ({navigation, route}) => {
  const [Modal0, setModal0] = useState(false);
  const [Modal1, setModal1] = useState(false);
  const [Modal2, setModal2] = useState(false);

  const {
    handleSubmit,
    reset,
    getValues,
    dynamicNav,
    onSelecteTag,
    postData,
    uploadFromGalary,
    onRefresh,
    images,
    control,
    errors,
    preferencesData,
    gp,
    ip,
    op,
    rooms,
    bathRoom,
    cat,
    recentLocation,
    location,
    sendLocation,
    deleteImage,
    checkAuthentication,
    onResetState,
    isFocus,
    setIsFocus,
    isFocus1,
    setIsFocus1,
    isFocus2,
    setIsFocus2,
    countryData,
    stateData,
    cityData,
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
    countryName,
    setCountryName,
    stateName,
    setStateName,
    cityName,
    setCityName,
    handleState,
    handleCity,
    setCityData,
    title,
    desc,
    number,
    numberRegex,
    options,
    validateForm,
    category,
    setCategory,
    uploadedImages,
  } = useAddPostScreen(navigation, route);

  const renderItem = ({item, index}) => {
    return (
      <FilterAddButton
        style={styles.tags}
        title={item?.name}
        image={imageUrl(item.path)}
        required={true}
      />
    );
  };

  const renderItemImages = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.cancelImage}
          onPress={() => deleteImage(index)}>
          <MaterialIcons
            name="cancel"
            size={hp('2.5')}
            color={Colors.primaryColor}
          />
        </TouchableOpacity>

        <Image
          source={{uri: item?.type ? item?.uri : imageUrl(item)}}
          style={styles.imagesStyle}
        />
      </>
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
          // saveReset={'Reset'}
          headerTitle={'Preferences'}
          onSave={onResetState}
          backText={'Back'}
          arrowBackIcon={arrowback}
          goBack={() => navigation.goBack()}
        />

        <ScrollView
          r
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          <View style={styles.filterMain}>
            {/* <TextComponent styles={styles.itemHeading1} text={'I Want To'} /> */}

            <View style={styles.collapseContainer}>
              {/* <Collapse>
                <CollapseHeader>
                  <View style={[styles.header, styles.loginInput]}>
                    <View style={styles.dropDown} />
                    <TextComponent
                      text={'Your Preferences'}
                      styles={styles.text}
                    />
                    <Ionicons
                      style={styles.dropDown}
                      color={Colors.primaryColor}
                      name={'caret-down'}
                      size={hp(2)}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody> */}
              <View style={styles.body}>
                <SwitchSelector
                  options={options}
                  initial={0}
                  onPress={value => onSelecteTag(value, 'type')}
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
                      text={!cat ? 'Select' : category}
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
                      <Picker.Item label="Select Category..." value={null} />

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
              {/* </CollapseBody>
              </Collapse> */}
            </View>

            <ThemeButtonComp
              title={'Save'}
              style={styles.applyFilter}
              textStyle={styles.filterText}
              // // onPress={
              // //   () => {
              // //     // if (validateForm()) {
              // //     console.log('asdfjkaklsdjflkdjs', errors);
              // //     // }
              // //     handleSubmit(postData);
              // //   }
              // //   // title && desc && number
              // //   //   ? handleSubmit(postData)
              // //   //   : () =>
              // //   //       !numberRegex.test(number)
              // //   //         ? errorMessage('Please correct your price')
              // //   //         : errorMessage('Please comeplete all fields')
              // // }
              // // onPress={checkAuthentication}
              // onPress={handleSubmit(data => {
              //   if (validateForm()) {
              //     postData(data);
              //   } else {
              //     console.log('Form validation failed');
              //   }
              // })}
              onPress={() => handleSubmit(postData())}
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
                setCategory(selectedCategory ? selectedCategory.name : '');
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

      {/* //ROOMS  */}
      <Modal animationType="slide" visible={Modal1} transparent={true}>
        <View style={styles.Modal}>
          <View style={styles.innerContainer}>
            <View style={styles.titleContainer}>
              <TextComponent
                styles={styles.modalText}
                onPress={() => setModal1(false)}
                text={'Done'}
              />
            </View>

            <Picker
              dropdownIconColor={Colors.primaryColor}
              style={styles.pick}
              selectedValue={rooms}
              onValueChange={(itemValue, itemIndex) =>
                onSelecteTag(itemValue, 'rooms')
              }>
              <Picker.Item label="Select" value={null} />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
              <Picker.Item label="13" value="13" />
              <Picker.Item label="14" value="14" />
              <Picker.Item label="15" value="15" />
              <Picker.Item label="16" value="16" />
              <Picker.Item label="17" value="17" />
              <Picker.Item label="18" value="18" />
              <Picker.Item label="19" value="19" />
              <Picker.Item label="20" value="20" />
            </Picker>
          </View>
        </View>
      </Modal>

      {/* //BAThHROOMs  */}
      <Modal animationType="slide" visible={Modal2} transparent={true}>
        <View style={styles.Modal}>
          <View style={styles.innerContainer}>
            <View style={styles.titleContainer}>
              <TextComponent
                styles={styles.modalText}
                onPress={() => setModal2(false)}
                text={'Done'}
              />
            </View>

            <Picker
              dropdownIconColor={Colors.primaryColor}
              style={styles.pick}
              selectedValue={bathRoom}
              onValueChange={(itemValue, itemIndex) =>
                onSelecteTag(itemValue, 'bathRoom')
              }>
              <Picker.Item label="Select" value={null} />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
              <Picker.Item label="13" value="13" />
              <Picker.Item label="14" value="14" />
              <Picker.Item label="15" value="15" />
              <Picker.Item label="16" value="16" />
              <Picker.Item label="17" value="17" />
              <Picker.Item label="18" value="18" />
              <Picker.Item label="19" value="19" />
              <Picker.Item label="20" value="20" />
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default memo(PreferenceScreen);
