import React, {useCallback, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Slider from 'rn-range-slider';

import Thumb from '../Slider/Thumb';
import Rail from '../Slider/Rail';
import RailSelected from '../Slider/RailSelected';
import Notch from '../Slider/Notch';

const SliderScreen = () => {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={String(low)}
          keyboardType="numeric"
          onChangeText={text => setLow(Number(text) || 0)}
        />
        <Text style={styles.toText}>To</Text>
        <TextInput
          style={styles.input}
          value={String(high)}
          keyboardType="numeric"
          onChangeText={text => setHigh(Number(text) || 0)}
        />
      </View>

      <Slider
        style={styles.slider}
        min={0}
        max={100}
        step={1}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

export default SliderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  toText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#555',
  },
  slider: {
    marginTop: 20,
  },
});
