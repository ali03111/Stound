import React, {memo, useCallback, useState} from 'react';
import {View, FlatList, Text, ScrollView, SafeAreaView} from 'react-native';
import useFavourateScreen from './useFilterScreen';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import Header from '../../Components/Header';
import {Picker} from '@react-native-picker/picker';
import {arrowback, addcircle, search} from '../../Assests';
import SwitchSelector from 'react-native-switch-selector';
import {Colors} from '../../Theme/Variables';
import FilterAddButton from '../../Components/FilterAddButton';
import ThemeButtonComp from '../../Components/ThemeButtonComp';
const FilterScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const options = [
    {label: 'Rent', value: '1'},
    {label: 'Buy  ', value: '2'},
  ];
  return (
    <View style={{flex: 1}}>
      <Header
        headerTitle={'Filters'}
        arrowBackIcon={arrowback}
        backText={'Back'}
        saveReset={'Reset'}
        style={styles.filterHeader}
      />

      <ScrollView>
        <View style={styles.filterMain}>
          <SwitchSelector
            options={options}
            initial={0}
            onPress={value => console.log(`Call onPress with value: ${value}`)}
            backgroundColor="rgba(11, 180, 255, 0.03);"
            buttonColor={Colors.primaryColor}
            borderRadius={10}
            height={45}
            style={styles.switcher}
          />

          <TextComponent styles={styles.itemHeading} text={'Property Type'} />
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Select" value="Select" />
              <Picker.Item label="Apartment" value="Apartment" />
            </Picker>
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
          <TextComponent styles={styles.itemHeading} text={'Rooms '} />
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Select" value="Select" />
              <Picker.Item label="5" value="5" />
            </Picker>
          </View>
          <TextComponent styles={styles.itemHeading} text={'Bathrooms '} />
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Select" value="Select" />
              <Picker.Item label="3" value="3" />
            </Picker>
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
          <TextComponent styles={styles.pRange} text={'Price Range '} />
          <ThemeButtonComp
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
