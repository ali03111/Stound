import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Swiper from 'react-native-deck-swiper';

class SomeComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
          renderCard={card => {
            return (
              <View style={styles.card}>
                <Text style={styles.text}>{card}</Text>
              </View>
            );
          }}
          onSwipedLeft={ca => {
            console.log('left');
          }}
          onSwipedRight={ca => {
            console.log('Right');
          }}
          onSwipedTop={ca => {
            console.log('Top');
          }}
          onSwipedBottom={ca => {
            console.log('bottom');
          }}
          cardIndex={0}
          backgroundColor={'#4FD0E9'}
          stackSize={3}>
          <Button
            onPress={() => {
              console.log('oulala');
            }}
            title="Press me">
            You can press me
          </Button>
        </Swiper>
      </View>
    );
  }
}

export default SomeComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});
