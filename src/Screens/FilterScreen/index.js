import React, {memo, useCallback, useState} from 'react';
import {View, FlatList, Text, ScrollView, Modal, Pressable} from 'react-native';
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
} from '../../Assests';
import SwitchSelector from 'react-native-switch-selector';
import {Colors} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
import ThemeButtonComp from '../../Components/ThemeButtonComp';
import Slider from '@react-native-community/slider';
import {Image} from 'react-native-animatable';
import {imageUrl, keyExtractor} from '../../Utils/Urls';
import {hp, wp} from '../../Config/responsive';
import {TextInput} from 'react-native-paper';
import RangeSlider from '../../Components/RangeSlider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FilterScreen = ({navigation}) => {
  const {
    filterAdsDataFunction,
    onSelecteTag,
    options,
    preferencesData,
    locations,
    cat,
    rooms,
    bathRoom,
    gp,
    op,
    ip,
    dynamicNav,
    setSliderValue,
    sliderValue,
    resetFunction,
    sendLocation,
  } = useFilterScreen(navigation);

  //For MODAL
  const [category, setCategory] = useState('');
  const [Modal0, setModal0] = useState(false);
  const [Modal1, setModal1] = useState(false);
  const [Modal2, setModal2] = useState(false);

  //FOR RANGE SLIDER
  const MIN_DEFAULT = 0;
  const MAX_DEFAULT = 300;
  const [min, setMin] = useState(MIN_DEFAULT);
  const [max, setMax] = useState(MAX_DEFAULT);

  //Render Preferences dynamics

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
  const FlatListComp = ({data, onPress}) => {
    return (
      <FlatList
        refreshing={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatListMain}
        horizontal
        ListFooterComponentStyle={{marginLeft: wp('2')}}
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
          headerTitle={'Filters'}
          arrowBackIcon={arrowback}
          backText={'Back'}
          saveReset={'Reset'}
          onSave={() => resetFunction()}
          goBack={() => navigation.goBack()}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.filterMain}>
            <TextComponent styles={styles.itemHeading1} text={'I Want To'} />
            <SwitchSelector
              options={options}
              initial={0}
              onPress={value => {
                onSelecteTag(value, 'type');
              }}
              backgroundColor="rgba(11, 180, 255, 0.03);"
              buttonColor={Colors.primaryColor}
              borderRadius={10}
              height={45}
              style={styles.switcher}
            />

            <TextComponent styles={styles.itemHeading} text={'Property Type'} />
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
                  style={styles.pick}
                  dropdownIconColor={Colors.primaryColor}
                  selectedValue={cat}
                  onValueChange={value => onSelecteTag(value, 'cat')}>
                  <Picker.Item label="Select" value={null} />
                  {preferencesData?.cat &&
                    preferencesData?.cat?.map(res => {
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
            )}
            {/* <TextComponent styles={styles.itemHeading} text={'Location '} />
          <View style={styles.addButton}>
            <FilterAddButton
              locations={locations}
              isRequired={true}
              style={styles.locationBtn}
              textStyle={styles.locationBtnText}
              image={search}
              title={'Search location here...'}
              imgStyle={styles.locationBtnImg}
              onPress={() =>
                dynamicNav({
                  title: 'Locations',
                  data: preferencesData?.locations,
                  key: 'locations',
                  value: locations,
                })
              }
            />
          </View> */}

            <TextComponent styles={styles.itemHeading} text={'Location '} />
            <View style={{...styles.addButton, paddingHorizontal: wp('3')}}>
              <FilterAddButton
                onPress={sendLocation}
                style={styles.locationBtn}
                textStyle={styles.locationBtnText}
                image={search}
                isRequired={true}
                title={locations == '' ? 'Search location here...' : locations}
                imgStyle={styles.locationBtnImg}
              />
            </View>
            <TextComponent styles={styles.itemHeading} text={'Rooms'} />

            {Platform.OS == 'ios' ? (
              <Pressable
                onPress={() => setModal1(prev => !prev)}
                style={styles.pickerStyle}>
                <Image source={bedblue} />
                <TextComponent text={rooms} styles={styles.iosPick} />
                <Ionicons
                  style={styles.dropDown}
                  color={Colors.primaryColor}
                  name={'caret-down'}
                  size={hp(2)}
                />
              </Pressable>
            ) : (
              <View style={styles.pickerStyle1}>
                <Image source={bedblue} />
                <Picker
                  dropdownIconColor={Colors.primaryColor}
                  style={styles.pick}
                  selectedValue={rooms}
                  onValueChange={(itemValue, itemIndex) =>
                    onSelecteTag(itemValue, 'rooms')
                  }>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                </Picker>
              </View>
            )}
            <TextComponent styles={styles.itemHeading} text={'Bathrooms'} />
            {Platform.OS == 'ios' ? (
              <Pressable
                onPress={() => setModal2(prev => !prev)}
                style={styles.pickerStyle}>
                <Image source={bluebath} />
                <TextComponent
                  text={!bathRoom ? 'Select' : bathRoom}
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
              <View style={styles.pickerStyle1}>
                <Image source={bluebath} />

                <Picker
                  dropdownIconColor={Colors.primaryColor}
                  style={[styles.pick]}
                  selectedValue={bathRoom}
                  onValueChange={(itemValue, itemIndex) =>
                    onSelecteTag(itemValue, 'bathRoom')
                  }>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
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

            <TextComponent styles={styles.pRange} text={'Price Range '} />
            <View style={styles.rangeTextMain}>
              <TextComponent styles={styles.rangeTextLeft} text={`$${min}`} />
              <TextComponent styles={styles.rangeTextRight} text={`$${max}`} />
            </View>
            {/* <Slider
            // style={styles.rangeSlider}
            style={[
              styles.rangeSlider,
              Platform.OS === 'android'
                ? styles.androidSlider
                : styles.iosSlider,
            ]}
            minimumValue={0}
            maximumValue={1000000}
            minimumTrackTintColor={Colors.primaryColor2}
            maximumTrackTintColor="rgba(11, 180, 255, 0.8)"
            maximumTrackTintStyle={Colors.primaryColor2}
            thumbImage={sliderdot}
            minimumTrackImage={minslider}
            maximumTrackImage={maxslider}
            trackImage={minslider}
            value={sliderValue}
            onValueChange={sliderValue => {
              setSliderValue(Math.trunc(sliderValue));
            }}
            thumbStyle={styles.thumbImage}
          />
          <TextInput
            theme={{
              colors: {
                placeholder: 'gray',
                primary: Colors.primaryColor,
              },
            }}
            label="Enter price ranges"
            mode="outlined"
            style={styles.priceRange}
            value={sliderValue == 0 ? '' : String(sliderValue)} // Convert sliderValue to a string before setting it as the value
            onChangeText={text => setSliderValue(Number(text))}
            placeholder="Enter price ranges..."
          /> */}
            <View style={styles.rangeSliderContainer}>
              <RangeSlider
                sliderWidth={300}
                min={MIN_DEFAULT}
                max={MAX_DEFAULT}
                step={1}
                onValueChange={range => {
                  setMin(range.min);
                  setMax(range.max);
                }}
              />
            </View>

            <ThemeButtonComp
              onPress={filterAdsDataFunction}
              title={'Apply Filter'}
              style={styles.applyFilter}
              textStyle={styles.filterText}
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
                  console.log('res.name', res);

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
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
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
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default memo(FilterScreen);
