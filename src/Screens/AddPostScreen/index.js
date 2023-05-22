import React, {memo, useCallback, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import useFilterScreen from './useAddPostScreen';
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
} from '../../Assests';
import {Colors} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
import ThemeButtonComp from '../../Components/ThemeButtonComp';
import Slider from '@react-native-community/slider';
import {goBack, keyExtractor} from '../../Utils';
import {InputComponent} from '../../Components/InputComponent';
import useAddPostScreen from './useAddPostScreen';
import {wp} from '../../Config/responsive';
import {Touchable} from '../../Components/Touchable';
import SwitchSelector from 'react-native-switch-selector';
import {imageUrl} from '../../Utils/Urls';

const AddPostScreen = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const {
    handleSubmit,
    reset,
    getValues,
    dynamicNav,
    onSelecteTag,
    postData,
    uploadFromGalary,
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
    options,
  } = useAddPostScreen(navigation);

  const renderItem = ({item, index}) => {
    console.log('item.image[0].path', item.image[0].path);
    return (
      <FilterAddButton
        style={styles.tags}
        title={item?.name}
        image={imageUrl(item.image[0].path)}
        required={true}
      />
    );
  };

  const renderItemImages = ({item, index}) => {
    return <Image source={{uri: item?.uri}} style={styles.imagesStyle} />;
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
              title={'add'}
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
        headerTitle={'Ads details'}
        arrowBackIcon={arrowback}
        backText={'Back'}
        goBack={navigation.goBack}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.filterMain}>
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
          <View style={styles.pickerStyle}>
            <Image source={catImage} />
            <Picker
              style={styles.pick}
              selectedValue={cat}
              onValueChange={(itemValue, itemIndex) =>
                onSelecteTag(itemValue, 'cat')
              }>
              <Picker.Item label="Select Category..." value={null} />
              {preferencesData.cat &&
                preferencesData.cat.map(res => {
                  return (
                    <Picker.Item label={res.name} value={res.categoryId} />
                  );
                })}
            </Picker>
          </View>
          <View>
            <InputComponent
              {...{
                name: 'title',
                handleSubmit,
                errors,
                reset,
                control,
                getValues,
                placeholder: 'Ad tittle here...',
                viewStyle: styles.inputTitle,
                textStyle: styles.inputText,
                inputIconStyle: styles.inputIcon,
                isImage: adTitle,
              }}
            />

            <InputComponent
              {...{
                name: 'desc',
                handleSubmit,
                errors,
                reset,
                control,
                getValues,
                placeholder: 'Ad description...',
                viewStyle: styles.inputDesc,
                textStyle: styles.inputTextarea,
                inputIconStyle: styles.msgIcon,
                isImage: chat,
                inputLines: 4,
                maxLength: 200,
                multiline: true,
              }}
            />
            <InputComponent
              {...{
                name: 'number',
                handleSubmit,
                errors,
                reset,
                control,
                getValues,
                placeholder: 'Ad price...',
                viewStyle: styles.inputTitle,
                textStyle: styles.inputText,
                inputIconStyle: styles.inputIcon,
                isImage: adTitle,
                keyboardType: 'number',
              }}
            />
          </View>
          <TextComponent styles={styles.itemHeading} text={'Location '} />
          <View style={{...styles.addButton, paddingHorizontal: wp('3')}}>
            <FilterAddButton
              style={styles.locationBtn}
              textStyle={styles.locationBtnText}
              image={search}
              title={'Search location here...'}
              imgStyle={styles.locationBtnImg}
            />
          </View>
          <TextComponent styles={styles.room} text={'Rooms '} />
          <View style={styles.pickerStyle}>
            <Image source={bedblue} />
            <Picker
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
            </Picker>
          </View>
          <TextComponent styles={styles.room} text={'Bathrooms '} />
          <View style={styles.pickerStyle}>
            <Image source={bluebath} />
            <Picker
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
            </Picker>
          </View>
          <View style={styles.galleryHd}>
            <Image source={UploadProfileImage} style={styles.addImage} />
            <TextComponent text={'Upload upto 10 photos'} />
          </View>
          <FlatList
            refreshing={false}
            data={images}
            renderItem={renderItemImages}
            keyExtractor={keyExtractor}
            contentContainerStyle={{
              ...styles.flatListMain,
            }}
            horizontal
            ListFooterComponent={() => {
              return (
                <Touchable onPress={uploadFromGalary}>
                  <Image style={styles.imagesStyle} source={addGalleryImage} />
                </Touchable>
              );
            }}
          />

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

          <ThemeButtonComp
            title={'Post'}
            style={styles.applyFilter}
            textStyle={styles.filterText}
            onPress={handleSubmit(postData)}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default memo(AddPostScreen);
