import React from 'react';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '../Config/responsive'
const DividerLine = () => {
    return (
        <View
            style={{
                borderBottomColor: 'rgba(0, 0, 0, 0.2);',
                borderBottomWidth: StyleSheet.hairlineWidth,
                padding: 5,
                marginBottom: hp('1.5')
            }}
        />
    );
};

export default DividerLine;
