import React, {memo, useCallback} from 'react';
import {View, Text, FlatList, Image, ImageBackground} from 'react-native';
import {hp} from '../../Config/responsive';
import {keyExtractor} from '../../Utils';
import {styles} from './styles';
import {detailsImages} from '../../Utils/localDB';
import {TextComponent} from '../../Components/TextComponent';

const PackageDetailsScreen = () => {
  const imageLenght = detailsImages.length;
  const renderItem = useCallback(({item, index}) => {
    return (
      index > 0 &&
      index < 4 && (
        <ImageBackground
          resizeMode="cover"
          source={{uri: item}}
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
  return (
    <View style={{marginTop: hp('10'), flex: 1}}>
      <View style={styles.imageHeaderView}>
        <Image
          style={styles.firstImage(imageLenght)}
          source={{uri: detailsImages[0]}}
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
    </View>
  );
};

export default memo(PackageDetailsScreen);
