import React, { memo, useCallback, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
} from 'react-native';
import { hp } from '../../Config/responsive';
import { goBack, keyExtractor } from '../../Utils';
import { styles } from './styles';
import { detailsImages } from '../../Utils/localDB';
import { TextComponent } from '../../Components/TextComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Touchable } from '../../Components/Touchable';
import Header from '../../Components/Header';
import {
    accountprofile,
    arrowback,
    arrowbackwhite,
    chat,
    favEmpty,
    locationBlueIcon,
} from '../../Assests';
import FilterAddButton from '../../Components/FilterAddButton';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
} from 'accordion-collapse-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MsgSendButton from '../../Components/MsgSendButton';
import useHeaderDetailScreen from './useHeaderDetailScreen';
import HeaderDetailComponent from '../../Components/HeaderDetailComponent';
import { Colors } from '../../Theme/Variables';

const index = ({ navigation }) => {
    const { PackageDetailData } = useHeaderDetailScreen();
    const imageLenght = detailsImages.length;

    const renderItem = useCallback(({ item, index }) => {
        return (
            index > 0 &&
            index < 4 && (
                <ImageBackground
                    resizeMode="cover"
                    source={{ uri: item }}
                    style={styles.secondImage(index)}>
                    {index == 3 && (
                        <View style={styles.overlayView}>
                            <TextComponent
                                text={`+${imageLenght - 4}`}
                                styles={styles.overlayText}
                            />
                        </View>
                    )}
                </ImageBackground>
            )
        );
    }, []);


    const SocialBoxNotification = ({ image, imageText }) => {
        return (

            <View style={styles.socialbox}>
                <Image source={image} style={styles.imageStyle} />
                <TextComponent text={'3 Baths'} styles={styles.imageTextStyle} />

            </View>
        )
    }
    return (
        <>
            <HeaderDetailComponent
                onPress={() => navigation.goBack()}

                headerTitle={'Details'}
                arrowBackIcon={arrowbackwhite}
                centerTextStyle={styles.centerHeading}
                backText={'Back'}
                centerImage={require('../../Assests/Images/profile5.png')}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.topContainer} >
                <TextComponent text={'Ad Details'} styles={styles.headingStyle} />

                <View style={styles.imageHeaderView}>

                    <Image
                        style={styles.firstImage(imageLenght)}
                        source={{ uri: detailsImages[0] }}
                    />
                    {detailsImages.length > 0 && (
                        <FlatList
                            refreshing={false}
                            data={detailsImages}
                            renderItem={renderItem}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={keyExtractor}
                        />
                    )}
                </View>

                {/* {console.log(PackageDetailData)} */}

                <View style={styles.detail}>
                    <View style={styles.detailTitle}>
                        <TextComponent text={PackageDetailData.title} styles={styles.title} />
                        <TextComponent text={'$4,500'} styles={styles.price} />
                    </View>

                    <TextComponent
                        text={PackageDetailData.forRent}
                        styles={styles.forRent}
                    />

                    <View style={styles.locationMain}>
                        <Image source={locationBlueIcon} />
                        <TextComponent
                            text={PackageDetailData.location}
                            styles={styles.locationText}
                        />
                    </View>
                    <View style={styles.SocialBoxContainer}>
                        <SocialBoxNotification image={require('../../Assests/Icons/chat.png')} imageText={'Message'} />
                        <SocialBoxNotification image={require('../../Assests/Icons/phone.png')} imageText={'Call'} />
                        <SocialBoxNotification image={require('../../Assests/Icons/send.png')} imageText={'Mail'} />

                    </View>
                    {/* <TextComponent
                        text={'Property Details'}
                        styles={styles.detailsHeading}
                    /> */}
                    {/* <ScrollView
                        style={styles.propertyDetails}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ paddingBottom: hp('6') }}>
                            <Collapse style={styles.mainToggle}>
                                <CollapseHeader>
                                    <View style={styles.toggleHead}>
                                        <Text style={styles.headTitle}>Profile </Text>
                                        <Ionicons name={'caret-down'} size={hp(2)} />
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <View style={styles.profileDetails}>
                                        <View style={styles.accProfile}>
                                            <Image
                                                source={accountprofile}
                                                style={styles.accProfileImg}
                                            />
                                        </View>
                                        <View style={styles.profileData}>
                                            <TextComponent text={'Jhon Doe'} styles={styles.pTitle} />
                                            <TextComponent
                                                text={'jhondoe@gmail.com'}
                                                styles={styles.pEmail}
                                            />
                                        </View>
                                        <View style={styles.accChat}>
                                            <Image source={chat} />
                                        </View>
                                    </View>
                                </CollapseBody>
                            </Collapse>
                            <Collapse style={styles.mainToggle}>
                                <CollapseHeader>
                                    <View style={styles.toggleHead}>
                                        <Text style={styles.headTitle}>General </Text>
                                        <Ionicons name={'caret-down'} size={hp(2)} />
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <View style={styles.btns}>
                                        {PackageDetailData.tags.map(item => {
                                            return (
                                                <FilterAddButton
                                                    disabledValue={true}
                                                    title={item.text}
                                                    image={item.icon}
                                                    style={styles.btn}
                                                />
                                            );
                                        })}
                                    </View>
                                </CollapseBody>
                            </Collapse>
                            <Collapse style={styles.mainToggle}>
                                <CollapseHeader>
                                    <View style={styles.toggleHead}>
                                        <Text style={styles.headTitle}>Outside </Text>
                                        <Ionicons name={'caret-down'} size={hp(2)} />
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <View style={styles.btns}>
                                        {PackageDetailData.tags.map(item => {
                                            return (
                                                <FilterAddButton
                                                    disabledValue={true}
                                                    title={item.text}
                                                    image={item.icon}
                                                    style={styles.btn}
                                                />
                                            );
                                        })}
                                    </View>
                                </CollapseBody>
                            </Collapse>
                            <Collapse style={styles.mainToggle}>
                                <CollapseHeader>
                                    <View style={styles.toggleHead}>
                                        <Text style={styles.headTitle}>Inside </Text>
                                        <Ionicons name={'caret-down'} size={hp(2)} />
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <View style={styles.btns}>
                                        {PackageDetailData.tags.map(item => {
                                            return (
                                                <FilterAddButton
                                                    disabledValue={true}
                                                    title={item.text}
                                                    image={item.icon}
                                                    style={styles.btn}
                                                />
                                            );
                                        })}
                                    </View>
                                </CollapseBody>
                            </Collapse>
                        </View>
                    </ScrollView> */}
                    {/* <View style={styles.priceMain}>
                        <View style={styles.priceLeft}>
                            <TextComponent text={'Total price'} styles={styles.priceText} />
                        </View>
                        <MsgSendButton
                            title={'Contact Now'}
                            style={styles.sendBtnStyle}
                            textStyle={styles.sendTextStyle}
                        />
                    </View> */}
                </View>
            </ScrollView>

        </>
    );
};

export default memo(index);
