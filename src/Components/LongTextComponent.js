import React from 'react';
import { View, FlatList, Text } from 'react-native';

const LongTextComponent = ({text}) => {
  

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[{ key: 'longText', text: longText }]}
        renderItem={({ item }) => <Text>{text}</Text>}
      />
    </View>
  );
};

export default LongTextComponent;
