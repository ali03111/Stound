import { TextComponent } from "../../Components/TextComponent";
import { Touchable } from "../../Components/Touchable";
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../Components/Header';
import { wp, hp } from '../../Config/responsive';
import React, { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
    arrowback,
} from '../../Assests';
import { styles } from "../LocationScreen/styles";
import useLocationScreen from "./useLocationScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../Theme/Variables";
import DividerLine from "../../Components/DividerLine";
import Geolocation from '@react-native-community/geolocation';
import ThemeButtonComp from "../../Components/ThemeButtonComp";
import ShareButton from "../../Components/ShareButton";

const Index = ({ navigation, route }) => {

    const { addressText, handleButtonClick, location, getCurrentLocation, setLocation, recentLocation, } = useLocationScreen(navigation, route);
    return (
        <>
            {console.log("CurrentLocaoitnqw", location)}
            <View style={{ flex: 1, marginTop: hp('1') }}>
                <Header
                    headerTitle={'Ads details'}
                    arrowBackIcon={arrowback}
                    backText={'Back'}
                    goBack={navigation.goBack}
                />
                <View style={{ flex: 1 }}>
                    <GooglePlacesAutocomplete

                        placeholder='Search location'
                        returnKeyType='default'
                        fetchDetails={true}
                        currentLocation={true}
                        isRowScrollable={true}
                        keepResultsAfterBlur={false}
                        enablePoweredByContainer={false}
                        styles={{
                            container: {
                                flex: 1
                                , width: wp('90'),
                                alignSelf: 'center',
                                zIndex: 0
                            }, // Added to adjust container flex
                            textInputContainer: {
                                marginTop: 0,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                padding: 5,
                                width: wp('90'),
                                alignSelf: 'center',
                                shadowColor: '#000000',
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.17,
                                shadowRadius: 3.05,
                                elevation: 4,
                                flexDirection: 'row', // Added to align icon and input
                                alignItems: 'center',
                            },
                            textInput: {

                                color: 'black',
                                fontSize: 16,
                                backgroundColor: 'white ',
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                            listView: {
                                marginTop: 0,
                                padding: 0,
                            },
                            separator: {
                                height: 0.5,
                                backgroundColor: '#c8c7cc',
                            },
                            description: {
                                width: wp('85')
                            },
                            loader: {

                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            },
                        }}
                        renderLeftButton={() => (
                            <Ionicons name='search' size={30} color={Colors.primaryColor} style={{ marginLeft: 10 }} />
                        )}
                        onPress={(data, details) => {
                            handleButtonClick(data);
                            console.log('details', details);
                            console.log(data, 'data', addressText);
                        }}
                        query={{
                            key: 'AIzaSyBWU9HrMQUigxX7_ry_HpHNvEdn_Vve4DI',
                            language: 'en',
                            components: 'country:us',
                        }}
                    />
                    <TouchableOpacity onLongPress={() => setLocation([])} onPress={() => getCurrentLocation()} style={styles.recentLocationContainer}>
                        <TextComponent styles={styles.text} text={'Use Current Location'} />

                        {location.coords ? <Image style={styles.image} source={require('../../Assests/Icons/gps.png')} /> : null}
                    </TouchableOpacity>
                    {recentLocation.length > 0 ? <View style={styles.recentConatainer}>
                        <TextComponent styles={styles.recentLocationtext} text={'Recent Locations'} />


                        <View style={styles.innerRecentContainer}>
                            <FlatList
                                data={recentLocation}

                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <>
                                            <TextComponent styles={styles.recentText} text={item.description} />
                                            <DividerLine />
                                        </>

                                    )
                                }}

                            />
                        </View>
                    </View>
                        : null

                    }
                </View>
                <TouchableOpacity style={styles.chooseLocationButton}>

                    <ShareButton
                        onPress={() => { }}
                        title={'Choose Location'}
                        style={styles.getStart}
                    />
                </TouchableOpacity>
            </View>
        </>

    );
}

export default Index;