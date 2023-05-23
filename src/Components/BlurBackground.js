import {background} from '@/Assets/Images';
import React, {useState} from 'react';
import {View, ImageBackground} from 'react-native';
import {Blurhash} from 'react-native-blurhash';
import {hp} from '../Config/responsive';

const BlurBackground = ({
  styles,
  uri,
  blurhash,
  children,
  mainView,
  blurImageStyle,
}) => {
  const [load, setLoad] = useState(true);
  const hideLoad = () => setLoad(false);
  const dummyImage =
    'https://vrc-bucket.s3.us-east-2.amazonaws.com/hypnosis/cover-images/rigYKSc7Rd9RRfqiiyJqVo5FAxiedT0iaalNUzXR.jpg';
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        ...mainView,
      }}>
      {uri ? (
        <ImageBackground
          onLoad={hideLoad}
          onError={hideLoad}
          source={{uri: uri || dummyImage}}
          style={[styles]}
          borderRadius={10}
        />
      ) : (
        <ImageBackground
          borderRadius={10}
          source={{
            uri: 'https://vrc-bucket.s3.us-east-2.amazonaws.com/hypnosis/cover-images/rigYKSc7Rd9RRfqiiyJqVo5FAxiedT0iaalNUzXR.jpg',
          }}
          style={{overflow: 'hidden', ...styles}}
        />
      )}

      {load && Boolean(uri) && (
        <Blurhash
          resizeMode="cover"
          shouldRasterizeIOS
          style={{
            overflow: 'hidden',
            borderRadius: 10,
            zIndex: 1,
            ...blurImageStyle,
          }}
          // style={{flex: 1, position: 'relative', zIndex: 1, height: hp('75')}}
          blurhash={blurhash || 'LTG*j6E0~VnLxV?ZMw%05P-pNZWB'}
        />
      )}

      <View
        style={[
          styles,
          {
            flex: 1,
            zIndex: 999,
            position: 'absolute',
            // backgroundColor: 'rgba(29,134,202,.3)',
            // backgroundColor: 'rgba(0,0,0,.3)',
            bottom: 0,
            overflow: 'hidden',
            borderRadius: 10,
          },
        ]}>
        {children}
      </View>
    </View>
  );
};

export default React.memo(BlurBackground);
