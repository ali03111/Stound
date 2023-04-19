import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import {Controller} from 'react-hook-form';
import {Colors} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp, wp} from '../Config/responsive';
import {eye, eyeOff} from '../Assests';

export const InputComponent = ({
  minLength,
  placeholder,
  isRequired,
  isSecure,
  control,
  name,
  errors,
  type,
  autoCapitalize = 'none',
  defaultValue = '',
  isDisabled,
  maxLength,
  editable,
  viewStyle,
  isImage,
  forPasswordStyle,
  textStyle,
  inputIconStyle,
  inputLines,
  multiline,
}) => {
  const [show, setShow] = useState(!isSecure);
  const handleClick = () => setShow(!show);
  const keyboardType = ['number', 'reset_code'].includes(name)
    ? 'phone-pad'
    : 'default';
  return (
    <>
      <Controller
        render={({field: {onChange, value}}) => (
          <View style={{...styles.textfield, ...viewStyle}}>
            {isImage && (
              <Image
                source={isImage}
                style={{
                  resizeMode: 'contain',
                  ...styles.inputIcon,
                  ...inputIconStyle,
                }}
              />
            )}
            <TextInput
              type={type}
              maxLength={maxLength}
              style={{...forPasswordStyle}}
              numberOfLines={inputLines}
              multiline={multiline}
              {...{
                value,
                isDisabled,
                selectionColor: Colors.gray,
                placeholder,
                keyboardType,
                style: {...styles.input(isSecure), ...textStyle},
                secureTextEntry: !show,
                onChangeText: onChange,
                placeholderTextColor: Colors.gray,
                fontSize: hp('2'),
                autoCapitalize,
                autoCorrect: false,
                spellCheck: false,
                editable,
              }}
            />
            {isSecure && (
              <Touchable style={styles.eyeContainer} onPress={handleClick}>
                <Image
                  source={show ? eye : eyeOff}
                  style={{
                    resizeMode: 'contain',
                    tintColor: Colors.gray,
                  }}
                />
              </Touchable>
            )}
          </View>
        )}
        {...{
          name,
          control,
          defaultValue,
          rules: {required: Boolean(isRequired), minLength},
        }}
      />
      {errors[name]?.message && (
        <View
          style={
            {
              // width: Platform.OS == 'ios' ? width * 0.875 : Sizes.width * 0.9,
              // width: Sizes.width * 0.9,
            }
          }>
          <Text style={[styles.error]}>{errors[name]?.message}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textfield: {
    width: '100%',
    borderWidth: 1,
    height: hp('7'),
    borderRadius: 15,
    marginVertical: hp('1'),
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: Colors.lightblue,
    marginTop: hp('2.5'),
    backgroundColor: 'transparent',
  },
  input: isSecure => ({
    height: '100%',
    width: isSecure ? '75%' : '86%',
    borderRadius: 2,
    // textAlign: 'left',
    color: Colors.black,
    paddingHorizontal: wp('2'),
    paddingLeft: wp('3'),
    fontWeight: '600',
  }),
  eyeContainer: {
    width: 30,
    height: 30,
    // top: '30%',
    right: '1%',
    marginRight: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: Colors.redFade,
  },
  inputIcon: {
    marginLeft: hp('2'),
  },
});
