import React, {memo, useCallback, useState} from 'react';
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
  StyleSheet,
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
  squarefoot,
} from '../../Assets';
import {Colors, FontSize} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
import ThemeButtonComp from '../../Components/ThemeButtonComp';
import Slider from '@react-native-community/slider';
import {goBack, keyExtractor} from '../../Utils';
import {InputComponent} from '../../Components/InputComponent';
import useAddPostScreen from './useAddPostScreen';
import {hp, wp} from '../../Config/responsive';
import {Touchable} from '../../Components/Touchable';
import SwitchSelector from 'react-native-switch-selector';
import {imageUrl} from '../../Utils/Urls';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import DividerLine from '../../Components/DividerLine';

const AddPostScreen = ({navigation, route}) => {
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

    validateForm,
    category,
    setCategory,
    updateState,
    uploadedImages,
    adType,
    bathRooms,
    bedRoom,
    bedRooms,
  } = useAddPostScreen(navigation, route);

  const renderItem = ({item, index}) => {
    console.log(imageUrl(item.path), 'asldkjflksdjf');
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
          style={styles.filimage}
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
        horizontal={false}
        ListFooterComponentStyle={{
          alignItems: 'center',
          alignSelf: 'center',
          // marginBottom: hp('1.5'),
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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          saveReset={'Reset'}
          onSave={onResetState}
          headerTitle={'Post Ad'}
          backText={'Back'}
          arrowBackIcon={arrowback}
          goBack={() => navigation.goBack()}
        />

        <ScrollView
          // refreshControl={
          //   <RefreshControl refreshing={false} onRefresh={onRefresh} />
          // }
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container1}>
            <TextComponent styles={styles.itemHeading1} text={'I want to'} />
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.option,
                  adType === 'Rent' && styles.selectedOption,
                ]}
                onPress={() => updateState({adType: 'Rent'})}>
                <Text
                  style={[
                    styles.optionText,
                    adType === 'Rent' && styles.selectedText,
                  ]}>
                  Rent
                </Text>
                {adType === 'Rent' ? (
                  <View style={styles.indicator} />
                ) : (
                  <View style={styles.indicator1} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  adType === 'Sell' && styles.selectedOption,
                ]}
                onPress={() => updateState({adType: 'Sell'})}>
                <Text
                  style={[
                    styles.optionText,
                    adType === 'Sell' && styles.selectedText,
                  ]}>
                  Sell
                </Text>
                {adType === 'Sell' ? (
                  <View style={styles.indicator} />
                ) : (
                  <View style={styles.indicator1} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <DividerLine style={{borderBottomWidth: 5}} />
          <View style={styles.filterMain}>
            <View style={styles.container1}>
              <TextComponent
                styles={styles.itemHeading1}
                text={'Select property type'}
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
                      // color="gray"
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
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />
            <View style={styles.container1}>
              <TextComponent
                styles={styles.itemHeading1}
                text={'Select location '}
              />

              <FilterAddButton
                onPress={sendLocation}
                style={styles.locationBtn}
                textStyle={styles.locationBtnText}
                image={search}
                isRequired={true}
                adjustsFontSizeToFit={false}
                title={
                  (location && (
                    <TextComponent
                      styles={styles.location}
                      text={location}
                      numberOfLines={1}
                    />
                  )) || (
                    <TextComponent
                      styles={styles.emptylocationtext}
                      text={'Search location here.'}
                    />
                  )
                }
                imgStyle={styles.locationBtnImg}
              />
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />
            <View style={styles.container1}>
              <TextComponent styles={styles.itemHeading1} text={'Area size'} />
              <InputComponent
                {...{
                  name: 'areaSize',
                  handleSubmit,
                  errors,
                  reset,
                  control,
                  getValues,
                  placeholder: 'Enter area size in Sq. Ft.',
                  viewStyle: styles.inputTitle,
                  textStyle: styles.inputText,
                  inputIconStyle: styles.inputIcon,
                  isImage: squarefoot,
                  maxLength: 5,
                }}
              />
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />
            <View style={styles.container1}>
              <TextComponent styles={styles.itemHeading1} text={'Set price'} />
              <InputComponent
                {...{
                  name: 'number',
                  handleSubmit,
                  errors,
                  reset,
                  control,
                  getValues,
                  placeholder: 'Enter your price here...',
                  viewStyle: styles.inputTitle,
                  textStyle: styles.inputText,
                  inputIconStyle: styles.inputIcon,
                  isImage: adTitle,
                  keyboardType: 'number',
                  maxLength: 9,
                }}
              />
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />
            <View style={styles.container1}>
              <TextComponent
                styles={styles.itemHeading1}
                text={'Property title'}
              />
              <InputComponent
                {...{
                  name: 'title',
                  handleSubmit,
                  errors,
                  reset,
                  control,
                  getValues,
                  placeholder: 'Ad title here...',
                  viewStyle: styles.inputTitle,
                  textStyle: styles.inputText,
                  inputIconStyle: styles.inputIcon,
                  isImage: adTitle,
                }}
              />
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />
            <View style={styles.container1}>
              <TextComponent
                styles={styles.itemHeading1}
                text={'Property description'}
              />
              <InputComponent
                {...{
                  name: 'desc',
                  handleSubmit,
                  errors,
                  reset,
                  control,
                  getValues,
                  placeholder: 'Write something here...',
                  viewStyle: styles.inputDesc,
                  textStyle: styles.inputTextarea,
                  inputIconStyle: styles.msgIcon,
                  isImage: chat,
                  inputLines: 4,
                  maxLength: 200,
                  multiline: true,
                  inputLength: true,
                }}
              />
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />

            <View style={styles.container1}>
              <TextComponent
                styles={styles.itemHeading1}
                text={'Select number of bathrooms'}
              />
              <FlatList
                data={bathRooms}
                horizontal
                keyExtractor={item => item.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.box,
                      bathRoom === item && styles.selectedBox,
                    ]}
                    onPress={() => updateState({bathRoom: item})}>
                    <Text
                      style={[
                        styles.text,
                        bathRoom === item && styles.selectedText1,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <DividerLine style={{borderBottomWidth: 5}} />
            <View style={styles.container1}>
              <TextComponent
                styles={styles.itemHeading1}
                text={'Select number of  bedrooms'}
              />
              <FlatList
                data={bedRooms}
                horizontal
                keyExtractor={item => item.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[styles.box, bedRoom === item && styles.selectedBox]}
                    onPress={() => updateState({bedRoom: item})}>
                    <Text
                      style={[
                        styles.text,
                        bedRoom === item && styles.selectedText1,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <DividerLine style={{borderBottomWidth: 5}} />

            <View style={styles.container1}>
              <TextComponent
                text={'Upload upto 10 photos'}
                styles={styles.itemHeading1}
              />
              <FlatList
                refreshing={false}
                data={[...images, ...uploadedImages]}
                renderItem={renderItemImages}
                keyExtractor={keyExtractor}
                contentContainerStyle={{
                  ...styles.flatListMain,
                }}
                horizontal
                ListFooterComponent={() => {
                  return (
                    <Touchable onPress={uploadFromGalary}>
                      <Image
                        style={styles.imagesStyle}
                        source={addGalleryImage}
                      />
                    </Touchable>
                  );
                }}
              />
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />

            <View style={styles.container1}>
              <TextComponent
                styles={styles.itemHeading1}
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
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />
            <View style={styles.container1}>
              <TextComponent
                styles={styles.itemHeading1}
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
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />

            <View style={styles.container1}>
              <TextComponent
                styles={styles.itemHeading1}
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
            <View style={styles.container1}>
              <ThemeButtonComp
                title={'Post Ad'}
                style={styles.applyFilter}
                textStyle={styles.filterText}
                onPress={handleSubmit(data => {
                  console.log(data, 'kslksafjlkjdsfklj');
                  if (validateForm()) {
                    postData(data);
                  } else {
                    console.log('Form validation failed');
                  }
                })}
              />
            </View>
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
      {/* <Modal animationType="slide" visible={Modal1} transparent={true}>
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
      </Modal> */}

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
export default memo(AddPostScreen);
