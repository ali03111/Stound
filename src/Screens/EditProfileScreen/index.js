import React, {memo, useState} from 'react';
import {View, Text, Image, Button, Pressable, Modal, Platform, FlatList} from 'react-native';
import useEditProfileScreen from './useEditProfileScreen';
import {styles} from './styles';
import Header from '../../Components/Header';
import {
  arrowback,
  calendar,
  editProfile,
  editProfileShadow,
  phoneIcon,
  user,
  UploadProfileImage,
  catImage,
  addcircle,
  chat
} from '../../Assests';
import {TextComponent} from '../../Components/TextComponent';
import {InputComponent} from '../../Components/InputComponent';
import ShareButton from '../../Components/ShareButton';
import KeyBoardWrapper from '../../Components/KeyboardWrapper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Touchable} from '../../Components/Touchable';
import BlurImage from '../../Components/BlurImage';
import {imageUrl} from '../../Utils/Urls';
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native';
import SwitchSelector from 'react-native-switch-selector';
import {Picker} from '@react-native-picker/picker';
import {Colors, FontSize} from '../../Theme/Variables';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {hp, wp} from '../../Config/responsive';
import {goBack, keyExtractor} from '../../Utils';
import FilterAddButton from '../../Components/FilterAddButton';
import ThemeButtonComp from '../../Components/ThemeButtonComp';

const EditProfileScreen = ({navigation}) => {
  const [Modal0, setModal0] = useState(false);
  const [Modal1, setModal1] = useState(false);
  const [Modal2, setModal2] = useState(false);

  const {
    control,
    errors,
    isDatePickerVisible,
    goBack,
    userData,
    profileData,
    // images,
    updateProfile,
    uploadFromGalary,
    reset,
    handleSubmit,
    getValues,
    hideDatePicker,
    showDatePicker,
    handleConfirm,
    options,
    onSelecteTag,
    cat,
    category,
    setCategory,
    uploadedImages,
    preferencesData,
    preferencesVal,
    gp,
    ip,
    op,
    dynamicNav
  } = useEditProfileScreen(navigation);

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
    <KeyBoardWrapper>
      <View style={{flex: 1}}>
        <Header
          headerTitle={'Edit Profile'}
          arrowBackIcon={arrowback}
          backText={'Back'}
          goBack={goBack}
          // style={styles.filterHeader}
          saveResetStyle={styles.save}
        />
        <View style={styles.editProfileContainer}>
          <View style={styles.porfileInfo}>
            <View style={styles.porfileTopImages}>
              <BlurImage
                styles={styles.ProfileImage}
                uri={profileData?.uri || imageUrl(userData?.profilePicture)}
              />
              <Image
                source={editProfileShadow}
                style={styles.ProfileImageShadow}
              />
              <Touchable
                onPress={uploadFromGalary}
                style={styles.UploadProfile}>
                <Image
                  source={UploadProfileImage}
                  style={styles.UploadProfileIcon}
                />
              </Touchable>
            </View>
            <TextComponent text={userData?.name} styles={styles.userName} />
            <TextComponent text={userData?.email} styles={styles.userEmail} />
          </View>

          <InputComponent
            {...{
              name: 'name',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              viewStyle: styles.loginInput,
              isImage: user,
              defaultValue: userData?.name,
            }}
          />
          {/* <View>
            <View style={styles.datePickerBtn}>
              <Image source={calendar} style={styles.calenderImg} />
              <Touchable
                title="20 - 07 - 1995"
                onPress={showDatePicker}
                style={styles.datePickerBtnInner}>
                <Text style={styles.date}>20 - 07 - 1995</Text>
              </Touchable>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View> */}
          <InputComponent
            {...{
              name: 'number',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              viewStyle: styles.loginInput,
              isImage: phoneIcon,
              defaultValue: userData?.number ?? 'xxx-xxx-xxxx',
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
                  inputLength: true,
                  defaultValue: userData?.description
                }}
              />

{/* <View style={styles.collapseContainer}>
      <Collapse>
        <CollapseHeader>
          <View style={[styles.header,styles.loginInput]}>
            <View style={styles.dropDown} />
            <TextComponent text={'Your Preferences'} styles={styles.text} />
            <Ionicons
                  style={styles.dropDown}
                  color={Colors.primaryColor}
                  name={'caret-down'}
                  size={hp(2)}
                />
          </View>
        </CollapseHeader>
        <CollapseBody>
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
              <View style={[styles.pickerStyle,{flexWrap: 'nowrap'}]}>
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
                    label="Select Category..."
                    value={null}
                  />

                  {preferencesData.cat &&
                    preferencesData.cat.map(res => {
                      return (
                        // <Picker.Item label={res.name} value={res.categoryId} />
                        <Picker.Item label={res.name} value={res.name} />
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
        </CollapseBody>
      </Collapse>
    </View>
    <View style={styles.collapseContainer}>
      <Collapse>
        <CollapseHeader>
        <View style={[styles.header,styles.loginInput]}>
            <View style={styles.dropDown} />
            <TextComponent text={'More about you'} styles={styles.text} />
            <Ionicons
                  style={styles.dropDown}
                  color={Colors.primaryColor}
                  name={'caret-down'}
                  size={hp(2)}
                />
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.body}>
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
                  inputLength: true,
                }}
              />
          </View>
        </CollapseBody>
      </Collapse>
    </View> */}

        </View>
        <View style={styles.saveBtnMain}>
          <ShareButton
            title={'Save'}
            style={styles.saveBtn}
            onPress={handleSubmit(updateProfile)}
          />
        </View>
      </View>
    </KeyBoardWrapper>

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
                      // categoryItem => categoryItem.categoryId === itemValue,
                      categoryItem => categoryItem.name === itemValue,
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
                          // value={res.categoryId}
                          value={res?.name}
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
export default memo(EditProfileScreen);
