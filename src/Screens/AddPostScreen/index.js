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
  cat,
  adTitle,
  chat,
  bedblue,
  bluebath,
  UploadProfileImage,
  addGalleryImage,
} from '../../Assests';
import {Colors} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
import ThemeButtonComp from '../../Components/ThemeButtonComp';
import Slider from '@react-native-community/slider';
import {goBack} from '../../Utils';
import {InputComponent} from '../../Components/InputComponent';
import useAddPostScreen from './useAddPostScreen';

const AddPostScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const {handleSubmit, errors, reset, control, getValues} = useAddPostScreen();
  return (
    <View style={{flex: 1}}>
      <Header
        headerTitle={'Ads details'}
        arrowBackIcon={arrowback}
        backText={'Back'}
        goBack={goBack}
        // style={styles.filterHeader}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.filterMain}>
          <View style={styles.pickerStyle}>
            <Image source={cat} />
            <Picker
              style={styles.pick}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item
                label="Select Category..."
                value="Select Category..."
              />
              <Picker.Item label="Apartment" value="Apartment" />
            </Picker>
          </View>
          <View>
            {/* <Image style={styles.titleImage} source={adTitle} />
            <TextInput
              style={styles.inputTitle}
              placeholder={'Ad tittle here...'}
            /> */}
            <InputComponent
              {...{
                name: 'name',
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
                name: 'description',
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
          </View>
          <TextComponent styles={styles.itemHeading} text={'Location '} />
          <View style={styles.addButton}>
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
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Select" value="Select" />
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
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Select" value="Select" />
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
          <View>
            <Image source={addGalleryImage} />
          </View>
          <TextComponent
            styles={styles.itemHeading}
            text={'General Preferences '}
          />
          <View style={styles.addButton}>
            <FilterAddButton
              style={styles.filterButton}
              image={addcircle}
              title={'add'}
            />
          </View>
          <TextComponent
            styles={styles.itemHeading}
            text={'Outside Preferences '}
          />
          <View style={styles.addButton}>
            <FilterAddButton
              style={styles.filterButton}
              image={addcircle}
              title={'add'}
            />
          </View>
          <TextComponent
            styles={styles.itemHeading}
            text={'Inside Preferences '}
          />
          <View style={styles.addButton}>
            <FilterAddButton
              style={styles.filterButton}
              image={addcircle}
              title={'add'}
            />
          </View>

          <ThemeButtonComp
            title={'Post'}
            style={styles.applyFilter}
            textStyle={styles.filterText}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default memo(AddPostScreen);
