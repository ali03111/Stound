import {Text, View} from 'react-native';
import React, {memo} from 'react';
import useInquirieScreen from './useInquirieScreen';

const InquirieScreen = ({navigation}) => {
  const {} = useInquirieScreen(navigation);
  return (
    <View>
      <Text>InquirieScreen</Text>
    </View>
  );
};

export default memo(InquirieScreen);
