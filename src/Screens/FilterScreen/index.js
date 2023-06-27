import React, {memo, useCallback, useState} from 'react';
import {View, FlatList, Text, ScrollView, SafeAreaView} from 'react-native';
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
import {goBack} from '../../Utils';
import {Image} from 'react-native-animatable';
import {imageUrl, keyExtractor} from '../../Utils/Urls';
import {wp} from '../../Config/responsive';
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
  } = useFilterScreen(navigation);
  const [selectedLanguage, setSelectedLanguage] = useState();

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
          <TextComponent styles={styles.itemHeading} text={'Location '} />
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
          </View>
          <TextComponent styles={styles.itemHeading} text={'Rooms'} />

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
          <TextComponent styles={styles.itemHeading} text={'Bathrooms'} />
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
            <TextComponent
              styles={styles.rangeTextLeft}
              text={`$${sliderValue}`}
            />
            <TextComponent styles={styles.rangeTextRight} text={`$${'1200'}`} />
          </View>
          <Slider
            style={styles.rangeSlider}
            minimumValue={0}
            maximumValue={3000}
            minimumTrackTintColor={Colors.primaryColor2}
            maximumTrackTintStyle={Colors.primaryColor2}
            thumbTintColor="red"
            thumbImage={sliderdot}
            minimumTrackImage={minslider}
            maximumTrackImage={maxslider}
            trackImage={minslider}
            value={sliderValue}
            onValueChange={sliderValue => {
              setSliderValue(Math.trunc(sliderValue).toString());
            }}
          />
          <ThemeButtonComp
            onPress={filterAdsDataFunction}
            title={'Apply Filter'}
            style={styles.applyFilter}
            textStyle={styles.filterText}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default memo(FilterScreen);
