// import React, {memo, useCallback, useEffect, useState} from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   ScrollView,
//   SafeAreaView,
//   Image,
//   TextInput,
//   RefreshControl,
//   TouchableOpacity,
//   Modal,
//   Pressable,
//   Platform,
//   Alert,
// } from 'react-native';
// import useFilterScreen from './useAddPostScreen';
// import {styles} from './styles';
// import {TextComponent} from '../../Components/TextComponent';
// import Header from '../../Components/Header';
// import {Picker} from '@react-native-picker/picker';
// import {
//   arrowback,
//   addcircle,
//   search,
//   sliderdot,
//   minslider,
//   maxslider,
//   catImage,
//   adTitle,
//   chat,
//   bedblue,
//   bluebath,
//   UploadProfileImage,
//   addGalleryImage,
//   accessibleforward,
// } from '../../Assests';
// import {Colors, FontSize} from '../../Theme/Variables';
// import FilterAddButton from '../../Components/FilterAddButton';
// import ThemeButtonComp from '../../Components/ThemeButtonComp';
// import Slider from '@react-native-community/slider';
// import {goBack, keyExtractor} from '../../Utils';
// import {InputComponent} from '../../Components/InputComponent';
// import useAddPostScreen from './useAddPostScreen';
// import {hp, wp} from '../../Config/responsive';
// import {Touchable} from '../../Components/Touchable';
// import SwitchSelector from 'react-native-switch-selector';
// import {imageUrl} from '../../Utils/Urls';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Dropdown } from 'react-native-element-dropdown';

// const AddPostScreen = ({navigation}) => {
//   const [selectedLanguage, setSelectedLanguage] = useState();

//   const [category, setCategory] = useState('');
//   const [Modal0, setModal0] = useState(false);
//   const [Modal1, setModal1] = useState(false);
//   const [Modal2, setModal2] = useState(false);
//   const options = [
//     {label: 'Rent', value: 'Rent'},
//     {label: 'Buy  ', value: 'Buy'},
//   ];
//   const {
//     handleSubmit,
//     reset,
//     getValues,
//     dynamicNav,
//     onSelecteTag,
//     postData,
//     uploadFromGalary,
//     onRefresh,
//     images,
//     control,
//     errors,
//     preferencesData,
//     gp,
//     ip,
//     op,
//     rooms,
//     bathRoom,
//     cat,
//     recentLocation,
//     location,
//     sendLocation,
//     deleteImage,
//     checkAuthentication,
//     onResetState,
//     isFocus, setIsFocus,
//     isFocus1, setIsFocus1,
//     isFocus2, setIsFocus2,
//     countryData,
//     stateData,
//     cityData,
//     country,
//     setCountry,
//     state, setState,
//     city, setCity,
//     countryName, setCountryName,
//     stateName, setStateName,
//     cityName, setCityName,
//     handleState,
//     handleCity,
//     setCityData,
//   } = useAddPostScreen(navigation);
//   const renderItem = ({item, index}) => {
//     return (
//       <FilterAddButton
//         style={styles.tags}
//         title={item?.name}
//         image={imageUrl(item.path)}
//         required={true}
//       />
//     );
//   };

//   useEffect(() => {
//     console.log(category);
//   }, [category]);
//   const renderItemImages = ({item, index}) => {
//     return (
//       <>
//         <TouchableOpacity
//           style={styles.cancelImage}
//           onPress={() => deleteImage(index)}>
//           <MaterialIcons
//             name="cancel"
//             size={hp('2.5')}
//             color={Colors.primaryColor}
//           />
//         </TouchableOpacity>

//         <Image source={{uri: item?.uri}} style={styles.imagesStyle} />
//       </>
//     );
//   };

//   const FlatListComp = ({data, onPress}) => {
//     return (
//       <FlatList
//         refreshing={false}
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//         contentContainerStyle={styles.flatListMain}
//         horizontal
//         ListFooterComponentStyle={{marginLeft: wp('2')}}
//         ListFooterComponent={() => {
//           return (
//             <FilterAddButton
//               style={styles.filterButton}
//               image={addcircle}
//               isRequired={true}
//               title={'Add'}
//               onPress={onPress}
//             />
//           );
//         }}
//       />
//     );
//   };
//   return (
//     <>
//       <View style={{flex: 1}}>
//         <Header
//           saveReset={'Reset'}
//           headerTitle={'Ad details'}
//           onSave={onResetState}

//         />

//         <ScrollView
//           r
//           refreshControl={
//             <RefreshControl refreshing={false} onRefresh={onRefresh} />
//           }
//           showsVerticalScrollIndicator={false}>
//           <View style={styles.filterMain}>
//             <TextComponent styles={styles.itemHeading1} text={'I Want To'} />

//             <SwitchSelector
//               options={options}
//               initial={0}
//               onPress={value => onSelecteTag(value, 'type')}
//               backgroundColor="rgba(11, 180, 255, 0.03);"
//               buttonColor={Colors.primaryColor}
//               borderRadius={10}
//               height={45}
//               style={styles.switcher}
//             />
//             {Platform.OS == 'ios' ? (
//               <Pressable
//                 onPress={() => setModal0(prev => !prev)}
//                 style={styles.pickerStyle}>
//                 <Image source={catImage} />
//                 <TextComponent
//                   text={!cat ? 'Select' : category}
//                   styles={styles.iosPick}
//                 />
//                 <Ionicons
//                   style={styles.dropDown}
//                   color={Colors.primaryColor}
//                   name={'caret-down'}
//                   size={hp(2)}
//                 />
//               </Pressable>
//             ) : (
//               <View style={styles.pickerStyle}>
//                 <Image source={catImage} />

//                 <Picker
//                   dropdownIconColor={Colors.primaryColor}
//                   style={styles.pick}
//                   selectedValue={cat}
//                   onValueChange={(itemValue, itemIndex) => {
//                     onSelecteTag(itemValue, 'cat');
//                   }}>
//                   <Picker.Item
//                     // color="gray"
//                     label="Select Category..."
//                     value={null}
//                   />
//                   {preferencesData.cat &&
//                     preferencesData.cat.map(res => {
//                       console.log('res.name', res);

//                       return (
//                         <Picker.Item
//                           label={res.name}
//                           // color="black"
//                           // style={{color: 'black'}}
//                           value={res.categoryId}
//                         />
//                       );
//                     })}
//                 </Picker>
//               </View>
//             )}
//             <View>
//               <InputComponent
//                 {...{
//                   name: 'title',
//                   handleSubmit,
//                   errors,
//                   reset,
//                   control,
//                   getValues,
//                   placeholder: 'Ad title here...',
//                   viewStyle: styles.inputTitle,
//                   textStyle: styles.inputText,
//                   inputIconStyle: styles.inputIcon,
//                   isImage: adTitle,
//                 }}
//               />
//               <InputComponent
//                 {...{
//                   name: 'desc',
//                   handleSubmit,
//                   errors,
//                   reset,
//                   control,
//                   getValues,
//                   placeholder: 'Ad description...',
//                   viewStyle: styles.inputDesc,
//                   textStyle: styles.inputTextarea,
//                   inputIconStyle: styles.msgIcon,
//                   isImage: chat,
//                   inputLines: 4,
//                   maxLength: 200,
//                   multiline: true,
//                   inputLength: true,
//                 }}
//               />
//               <InputComponent
//                 {...{
//                   name: 'number',
//                   handleSubmit,
//                   errors,
//                   reset,
//                   control,
//                   getValues,
//                   placeholder: 'Ad price...',
//                   viewStyle: styles.inputTitle,
//                   textStyle: styles.inputText,
//                   inputIconStyle: styles.inputIcon,
//                   isImage: adTitle,
//                   keyboardType: 'number',
//                   maxLength: 10,
//                 }}
//               />
//             </View>
//             <TextComponent styles={styles.itemHeading} text={'Location '} />
//             <View style={{...styles.addButton, paddingHorizontal: wp('3')}}>
//               <FilterAddButton
//                 onPress={sendLocation}
//                 style={styles.locationBtn}
//                 textStyle={styles.locationBtnText}
//                 image={search}
//                 isRequired={true}
//                 title={location == '' ? 'Search location here...' : location}
//                 imgStyle={styles.locationBtnImg}
//               />
//             </View>
//             <View style={{...styles.dropDownView,marginTop:hp('3')}}>
//             <>
//           <TextComponent styles={styles.itemHeading1} text={'Country '} />
//            <Dropdown
//   itemTextStyle={{color:Colors.primaryTextColor}}
//           style={[styles.dropdown, isFocus && {borderColor:  Colors.primaryColor}]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           iconStyle={styles.iconStyle}
//           data={countryData}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"

//           placeholder={!isFocus ? 'Select Country' : '...'}
//           searchPlaceholder="Search..."
//           value={country}
//           onFocus={() => setIsFocus(true)}
//           onBlur={() => setIsFocus(false)}
//           onChange={item => {
//             handleState(item.value);
//             setCountry(item.value);
//             setCountryName(item.label)
//             setIsFocus(false);
//             setState(null)
//             setStateName(null)
//             setCity(null)
//             setCityName(null)
//             setCityData([])

//           }}
//         />
//         </>

//     {stateData.length > 0 &&
//        <>
//        <TextComponent styles={styles.itemHeading1} text={'States '} />
//        <Dropdown
//           itemTextStyle={{color:Colors.primaryTextColor}}
//           style={[styles.dropdown, isFocus1 && {borderColor: Colors.primaryColor}]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           iconStyle={styles.iconStyle}
//           data={stateData}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={!isFocus1 ? 'Select State' : '...'}
//           searchPlaceholder="Search..."
//           value={state}
//           onFocus={() => setIsFocus1(true)}
//           onBlur={() => setIsFocus1(false)}
//           onChange={item => {
//             console.log(country,'CountryAPi')
//             handleCity(country,item.value);
//             setState(item.value);
//             setStateName(item.label)
//             setCity(null)
//             setCityName(null)
//             setIsFocus1(false);
//           }}
//         />
//        </>}

//      {      cityData.length>0 &&   <>
//        <TextComponent styles={styles.itemHeading1} text={'City '} />
//        <Dropdown
//   itemTextStyle={{color:Colors.primaryTextColor}}

//           style={[styles.dropdown, isFocus2 && {borderColor:  Colors.primaryColor}]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           iconStyle={styles.iconStyle}
//           data={cityData}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={!isFocus2 ? 'Select City' : '...'}
//           searchPlaceholder="Search..."
//           value={city}
//           onFocus={() => setIsFocus2(true)}
//           onBlur={() => setIsFocus2(false)}
//           onChange={item => {
//             setCity(item.value);
//             setCityName(item.label)
//             setIsFocus2(false);
//           }}
//         />
//          </>}
//       {/* <TouchableOpacity onPress={()=>Alert.alert(`you have selected country ${countryName+country+' '+stateName+state+ " " +cityName+city}`)}>
//         <Text>Submit</Text>
//       </TouchableOpacity> */}
//             </View>
//             <TextComponent styles={styles.itemHeading} text={'Rooms '} />
//             {Platform.OS == 'ios' ? (
//               <Pressable
//                 onPress={() => setModal1(prev => !prev)}
//                 style={styles.pickerStyle}>
//                 <Image source={bedblue} />
//                 <TextComponent
//                   text={!rooms ? 'Select' : rooms}
//                   styles={styles.iosPick}
//                 />
//                 <Ionicons
//                   style={styles.dropDown}
//                   color={Colors.primaryColor}
//                   name={'caret-down'}
//                   size={hp(2)}
//                 />
//               </Pressable>
//             ) : (
//               <View style={styles.pickerStyle}>
//                 <Image source={bedblue} />

//                 <Picker
//                   dropdownIconColor={Colors.primaryColor}
//                   // mode="dropdown"
//                   style={[styles.pick]}
//                   selectedValue={rooms}
//                   onValueChange={(itemValue, itemIndex) =>
//                     onSelecteTag(itemValue, 'rooms')
//                   }>
//                   <Picker.Item label="Select" value={null} />
//                   <Picker.Item label="1" value="1" />
//                   <Picker.Item label="2" value="2" />
//                   <Picker.Item label="3" value="3" />
//                   <Picker.Item label="4" value="4" />
//                   <Picker.Item label="5" value="5" />
//                   <Picker.Item label="6" value="6" />
//                   <Picker.Item label="7" value="7" />
//                   <Picker.Item label="8" value="8" />
//                   <Picker.Item label="9" value="9" />
//                   <Picker.Item label="10" value="10" />
//                   <Picker.Item label="11" value="11" />
//                   <Picker.Item label="12" value="12" />
//                   <Picker.Item label="13" value="13" />
//                   <Picker.Item label="14" value="14" />
//                   <Picker.Item label="15" value="15" />
//                   <Picker.Item label="16" value="16" />
//                   <Picker.Item label="17" value="17" />
//                   <Picker.Item label="18" value="18" />
//                   <Picker.Item label="19" value="19" />
//                   <Picker.Item label="20" value="20" />
//                 </Picker>
//               </View>
//             )}

//             <TextComponent styles={styles.itemHeading} text={'Bathrooms '} />
//             {Platform.OS == 'ios' ? (
//               <Pressable
//                 onPress={() => setModal2(prev => !prev)}
//                 style={styles.pickerStyle}>
//                 <Image source={bluebath} />
//                 <TextComponent
//                   text={!bathRoom ? 'Select' : bathRoom}
//                   styles={styles.iosPick}
//                 />
//                 <Ionicons
//                   style={styles.dropDown}
//                   color={Colors.primaryColor}
//                   name={'caret-down'}
//                   size={hp(2)}
//                 />
//               </Pressable>
//             ) : (
//               <View style={styles.pickerStyle}>
//                 <Image source={bluebath} />
//                 <Picker
//                   dropdownIconColor={Colors.primaryColor}
//                   // mode="dropdown"
//                   style={[styles.pick]}
//                   selectedValue={bathRoom}
//                   onValueChange={(itemValue, itemIndex) =>
//                     onSelecteTag(itemValue, 'bathRoom')
//                   }>
//                   <Picker.Item label="Select" value={null} />
//                   <Picker.Item label="1" value="1" />
//                   <Picker.Item label="2" value="2" />
//                   <Picker.Item label="3" value="3" />
//                   <Picker.Item label="4" value="4" />
//                   <Picker.Item label="5" value="5" />
//                   <Picker.Item label="6" value="6" />
//                   <Picker.Item label="7" value="7" />
//                   <Picker.Item label="8" value="8" />
//                   <Picker.Item label="9" value="9" />
//                   <Picker.Item label="10" value="10" />
//                   <Picker.Item label="11" value="11" />
//                   <Picker.Item label="12" value="12" />
//                   <Picker.Item label="13" value="13" />
//                   <Picker.Item label="14" value="14" />
//                   <Picker.Item label="15" value="15" />
//                   <Picker.Item label="16" value="16" />
//                   <Picker.Item label="17" value="17" />
//                   <Picker.Item label="18" value="18" />
//                   <Picker.Item label="19" value="19" />
//                   <Picker.Item label="20" value="20" />
//                 </Picker>
//               </View>
//             )}
//             <View style={styles.galleryHd}>
//               <Image source={UploadProfileImage} style={styles.addImage} />
//               <TextComponent
//                 text={'Upload upto 10 photos'}
//                 styles={{
//                   fontWeight: '600',
//                   fontSize: FontSize.scale16,
//                   color: Colors.primaryTextColor,
//                 }}
//               />
//             </View>
//             <FlatList
//               refreshing={false}
//               data={images}
//               renderItem={renderItemImages}
//               keyExtractor={keyExtractor}
//               contentContainerStyle={{
//                 ...styles.flatListMain,
//               }}
//               horizontal
//               ListFooterComponent={() => {
//                 return (
//                   <Touchable onPress={uploadFromGalary}>
//                     <Image
//                       style={styles.imagesStyle}
//                       source={addGalleryImage}
//                     />
//                   </Touchable>
//                 );
//               }}
//             />

//             <TextComponent
//               styles={styles.itemHeading}
//               text={'General Preferences '}
//             />
//             <View style={styles.addButton}>
//               <FlatListComp
//                 data={gp}
//                 onPress={() =>
//                   dynamicNav({
//                     title: 'General',
//                     data: preferencesData.gp,
//                     key: 'gp',
//                     value: gp,
//                   })
//                 }
//               />
//             </View>
//             <TextComponent
//               styles={styles.itemHeading}
//               text={'Outside Preferences '}
//             />
//             <View style={styles.addButton}>
//               <FlatListComp
//                 data={op}
//                 onPress={() =>
//                   dynamicNav({
//                     title: 'Outside',
//                     data: preferencesData.op,
//                     key: 'op',
//                     value: op,
//                   })
//                 }
//               />
//             </View>
//             <TextComponent
//               styles={styles.itemHeading}
//               text={'Inside Preferences '}
//             />
//             <View style={styles.addButton}>
//               <FlatListComp
//                 data={ip}
//                 onPress={() =>
//                   dynamicNav({
//                     title: 'Inside',
//                     data: preferencesData.ip,
//                     key: 'ip',
//                     value: ip,
//                   })
//                 }
//               />
//             </View>

//             <ThemeButtonComp
//               title={'Post'}
//               style={styles.applyFilter}
//               textStyle={styles.filterText}
//               onPress={handleSubmit(postData)}
//               // onPress={checkAuthentication}
//             />
//           </View>
//         </ScrollView>
//       </View>
//       {/* Category PICKER */}
//       <Modal animationType="slide" visible={Modal0} transparent={true}>
//         <View style={styles.Modal}>
//           <View style={styles.innerContainer}>
//             <View style={styles.titleContainer}>
//               <TextComponent
//                 styles={styles.modalText}
//                 onPress={() => setModal0(false)}
//                 text={'Done'}
//               />
//             </View>
//             <Picker
//               dropdownIconColor={Colors.primaryColor}
//               style={styles.pick}
//               selectedValue={cat}
//               onValueChange={(itemValue, itemIndex) => {
//                 onSelecteTag(itemValue, 'cat');
//                 // Find the selected category name based on itemValue
//                 const selectedCategory = preferencesData.cat.find(
//                   categoryItem => categoryItem.categoryId === itemValue,
//                 );
//                 // Update the category state with the selected category name
//                 setCategory(selectedCategory ? selectedCategory.name : '');
//               }}>
//               <Picker.Item
//                 // color="gray"
//                 label="Select Category..."
//                 value={null}
//               />
//               {preferencesData.cat &&
//                 preferencesData.cat.map((res, index) => {
//                   {
//                     cat && index == 2 && setCategory(res.name);
//                   }
//                   console.log('res.name', res);

//                   return (
//                     <Picker.Item
//                       label={res.name}
//                       // color="black"
//                       // style={{color: 'black'}}
//                       value={res.categoryId}
//                     />
//                   );
//                 })}
//             </Picker>
//           </View>
//         </View>
//       </Modal>

//       {/* //ROOMS  */}
//       <Modal animationType="slide" visible={Modal1} transparent={true}>
//         <View style={styles.Modal}>
//           <View style={styles.innerContainer}>
//             <View style={styles.titleContainer}>
//               <TextComponent
//                 styles={styles.modalText}
//                 onPress={() => setModal1(false)}
//                 text={'Done'}
//               />
//             </View>

//             <Picker
//               dropdownIconColor={Colors.primaryColor}
//               style={styles.pick}
//               selectedValue={rooms}
//               onValueChange={(itemValue, itemIndex) =>
//                 onSelecteTag(itemValue, 'rooms')
//               }>
//               <Picker.Item label="Select" value={null} />
//               <Picker.Item label="1" value="1" />
//                   <Picker.Item label="2" value="2" />
//                   <Picker.Item label="3" value="3" />
//                   <Picker.Item label="4" value="4" />
//                   <Picker.Item label="5" value="5" />
//                   <Picker.Item label="6" value="6" />
//                   <Picker.Item label="7" value="7" />
//                   <Picker.Item label="8" value="8" />
//                   <Picker.Item label="9" value="9" />
//                   <Picker.Item label="10" value="10" />
//                   <Picker.Item label="11" value="11" />
//                   <Picker.Item label="12" value="12" />
//                   <Picker.Item label="13" value="13" />
//                   <Picker.Item label="14" value="14" />
//                   <Picker.Item label="15" value="15" />
//                   <Picker.Item label="16" value="16" />
//                   <Picker.Item label="17" value="17" />
//                   <Picker.Item label="18" value="18" />
//                   <Picker.Item label="19" value="19" />
//                   <Picker.Item label="20" value="20" />
//             </Picker>
//           </View>
//         </View>
//       </Modal>

//       {/* //BAThHROOMs  */}
//       <Modal animationType="slide" visible={Modal2} transparent={true}>
//         <View style={styles.Modal}>
//           <View style={styles.innerContainer}>
//             <View style={styles.titleContainer}>
//               <TextComponent
//                 styles={styles.modalText}
//                 onPress={() => setModal2(false)}
//                 text={'Done'}
//               />
//             </View>

//             <Picker
//               dropdownIconColor={Colors.primaryColor}
//               style={styles.pick}
//               selectedValue={bathRoom}
//               onValueChange={(itemValue, itemIndex) =>
//                 onSelecteTag(itemValue, 'bathRoom')
//               }>
//               <Picker.Item label="Select" value={null} />
//               <Picker.Item label="1" value="1" />
//                   <Picker.Item label="2" value="2" />
//                   <Picker.Item label="3" value="3" />
//                   <Picker.Item label="4" value="4" />
//                   <Picker.Item label="5" value="5" />
//                   <Picker.Item label="6" value="6" />
//                   <Picker.Item label="7" value="7" />
//                   <Picker.Item label="8" value="8" />
//                   <Picker.Item label="9" value="9" />
//                   <Picker.Item label="10" value="10" />
//                   <Picker.Item label="11" value="11" />
//                   <Picker.Item label="12" value="12" />
//                   <Picker.Item label="13" value="13" />
//                   <Picker.Item label="14" value="14" />
//                   <Picker.Item label="15" value="15" />
//                   <Picker.Item label="16" value="16" />
//                   <Picker.Item label="17" value="17" />
//                   <Picker.Item label="18" value="18" />
//                   <Picker.Item label="19" value="19" />
//                   <Picker.Item label="20" value="20" />
//             </Picker>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };
// export default memo(AddPostScreen);

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
import {errorMessage} from '../../Config/NotificationMessage';

const AddPostScreen = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [category, setCategory] = useState('');
  const [Modal0, setModal0] = useState(false);
  const [Modal1, setModal1] = useState(false);
  const [Modal2, setModal2] = useState(false);
  const options = [
    {label: 'Rent', value: 'Rent'},
    {label: 'Buy  ', value: 'Buy'},
  ];
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
  } = useAddPostScreen(navigation);

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

  useEffect(() => {
    console.log(category);
  }, [category]);
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

        <Image source={{uri: item?.uri}} style={styles.imagesStyle} />
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
  console.log(' ', category);
  return (
    <>
      <View style={{flex: 1}}>
        <Header
          saveReset={'Reset'}
          headerTitle={'Ad details'}
          onSave={onResetState}
        />

        <ScrollView
          r
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          <View style={styles.filterMain}>
            <TextComponent styles={styles.itemHeading1} text={'I Want To'} />

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
                  <Picker.Item
                    // color="gray"
                    label="Select Category..."
                    value={null}
                  />
                  {preferencesData.cat &&
                    preferencesData.cat.map(res => {
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
            )}
            <View>
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
                  maxLength: 9,
                }}
              />
            </View>
            <TextComponent styles={styles.itemHeading} text={'Location '} />
            <View style={{...styles.addButton, paddingHorizontal: wp('3')}}>
              <FilterAddButton
                onPress={sendLocation}
                style={styles.locationBtn}
                textStyle={styles.locationBtnText}
                image={search}
                isRequired={true}
                title={location == '' ? 'Search location here...' : location}
                imgStyle={styles.locationBtnImg}
              />
            </View>
            <View style={{...styles.dropDownView, marginTop: hp('3')}}>
              <>
                <TextComponent styles={styles.itemHeading1} text={'Country '} />
                <Dropdown
                  itemTextStyle={{color: Colors.primaryTextColor}}
                  style={[
                    styles.dropdown,
                    isFocus && {borderColor: Colors.primaryColor},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={countryData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select Country' : '...'}
                  searchPlaceholder="Search..."
                  value={country}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    handleState(item.value);
                    setCountry(item.value);
                    setCountryName(item.label);
                    setIsFocus(false);
                    setState(null);
                    setStateName(null);
                    setCity(null);
                    setCityName(null);
                    setCityData([]);
                  }}
                />
              </>

              {stateData.length > 0 && (
                <>
                  <TextComponent
                    styles={styles.itemHeading1}
                    text={'States '}
                  />
                  <Dropdown
                    itemTextStyle={{color: Colors.primaryTextColor}}
                    style={[
                      styles.dropdown,
                      isFocus1 && {borderColor: Colors.primaryColor},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={stateData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus1 ? 'Select State' : '...'}
                    searchPlaceholder="Search..."
                    value={state}
                    onFocus={() => setIsFocus1(true)}
                    onBlur={() => setIsFocus1(false)}
                    onChange={item => {
                      console.log(country, 'CountryAPi');
                      handleCity(country, item.value);
                      setState(item.value);
                      setStateName(item.label);
                      setCity(null);
                      setCityName(null);
                      setIsFocus1(false);
                    }}
                  />
                </>
              )}

              {cityData.length > 0 && (
                <>
                  <TextComponent styles={styles.itemHeading1} text={'City '} />
                  <Dropdown
                    itemTextStyle={{color: Colors.primaryTextColor}}
                    style={[
                      styles.dropdown,
                      isFocus2 && {borderColor: Colors.primaryColor},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={cityData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus2 ? 'Select City' : '...'}
                    searchPlaceholder="Search..."
                    value={city}
                    onFocus={() => setIsFocus2(true)}
                    onBlur={() => setIsFocus2(false)}
                    onChange={item => {
                      setCity(item.value);
                      setCityName(item.label);
                      setIsFocus2(false);
                    }}
                  />
                </>
              )}
              {/* <TouchableOpacity onPress={()=>Alert.alert(`you have selected country ${countryName+country+' '+stateName+state+ " " +cityName+city}`)}>
        <Text>Submit</Text>
      </TouchableOpacity> */}
            </View>

            <TextComponent styles={styles.itemHeading} text={'Rooms '} />
            {Platform.OS == 'ios' ? (
              <Pressable
                onPress={() => setModal1(prev => !prev)}
                style={styles.pickerStyle}>
                <Image source={bedblue} />
                <TextComponent
                  text={!rooms ? 'Select' : rooms}
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
                <Image source={bedblue} />

                <Picker
                  dropdownIconColor={Colors.primaryColor}
                  // mode="dropdown"
                  style={[styles.pick]}
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
            )}

            <TextComponent styles={styles.itemHeading} text={'Bathrooms '} />
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
              <View style={styles.pickerStyle}>
                <Image source={bluebath} />
                <Picker
                  dropdownIconColor={Colors.primaryColor}
                  // mode="dropdown"
                  style={[styles.pick]}
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
            )}
            <View style={styles.galleryHd}>
              <Image source={UploadProfileImage} style={styles.addImage} />
              <TextComponent
                text={'Upload upto 10 photos'}
                styles={{
                  fontWeight: '600',
                  fontSize: FontSize.scale16,
                  color: Colors.primaryTextColor,
                }}
              />
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
                    <Image
                      style={styles.imagesStyle}
                      source={addGalleryImage}
                    />
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
              onPress={
                title && desc && number
                  ? handleSubmit(postData)
                  : () =>
                      !numberRegex.test(number)
                        ? errorMessage('Please correct your price')
                        : errorMessage('Please comeplete all fields')
              }
              // onPress={checkAuthentication}
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
export default memo(AddPostScreen);
