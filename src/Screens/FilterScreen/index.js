import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
  Alert,
  TextInputComponent,
  TextInput,
} from 'react-native';
import useFilterScreen from './useFilterScreen';
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
  bedblue,
  bluebath,
  catImage,
  squarefoot,
  chat,
  adTitle,
} from '../../Assets';
import SwitchSelector from 'react-native-switch-selector';
import {Colors} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
import ThemeButtonComp from '../../Components/ThemeButtonComp';
import Slider from '@react-native-community/slider';
import {Image} from 'react-native-animatable';
import {imageUrl, keyExtractor} from '../../Utils/Urls';
import {hp, wp} from '../../Config/responsive';
// import RangeSlider from '../../Components/RangeSlider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import RangeSlider from 'rn-range-slider';
import DividerLine from '../../Components/DividerLine';
import {InputComponent} from '../../Components/InputComponent';
import {Touchable} from '../../Components/Touchable';
import SliderScreen from '../../Components/Slider';

const FilterScreen = ({navigation}) => {
  const {
    filterAdsDataFunction,
    onSelecteTag,
    preferencesData,
    location,
    cat,
    bathRoom,
    gp,
    op,
    ip,
    dynamicNav,
    setSliderValue,
    sliderValue,
    sendLocation,

    category,
    setCategory,
    Modal0,
    setModal0,
    Modal1,
    setModal1,
    Modal2,
    setModal2,
    min,
    setMin,
    max,
    setMax,
    MIN_DEFAULT,
    MAX_DEFAULT,
    adType,
    updateState,
    onResetState,
    bathRooms,
    bedRooms,

    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    resetField,
    images,
    bedRoom,
  } = useFilterScreen(navigation);

  //Render Preferences dynamics
  const [value, setValue] = useState(false);
  const renderItem = ({item, index}) => {
    console.log('itmemmemem', item);
    return (
      <FilterAddButton
        style={styles.tags}
        title={item?.name}
        image={imageUrl(item.path)}
        required={true}
      />
    );
  };

  const handleRangeChange = (low, high, fromUser) => {
    setMin(low);
    setMax(high);
  };

  const handleTouchStart = newMinValue => {
    // Handle the onTouchEnd logic
    // For example, set the values to a specific state when the touch ends.
    setValue(true);
  };
  const handleTouchEnd = () => {
    // Handle the onTouchEnd logic

    setValue(false);
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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          saveReset={'Reset'}
          onSave={onResetState}
          headerTitle={'Filters'}
          backText={'Back'}
          arrowBackIcon={arrowback}
          goBack={() => navigation.goBack()}
        />

        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
                      label="e.g. home, apartment, room"
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
                title={
                  (location && (
                    <TextComponent
                      numberOfLines={2}
                      styles={styles.location}
                      text={location}
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
              <SliderScreen />
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
            <View style={{marginHorizontal: wp('3')}}>
              <ThemeButtonComp
                onPress={filterAdsDataFunction}
                title={'Apply Filter'}
                style={styles.applyFilter}
                textStyle={styles.filterText}
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

                // // Update the category state with the selected category name
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
export default memo(FilterScreen);
