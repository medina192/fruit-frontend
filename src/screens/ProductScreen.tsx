import React from 'react';
import {
    SafeAreaView,
    Text,
    TouchableHighlight,
    View,
    Platform,
    StatusBar
} from "react-native"

const ProductScreen = () => {
  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
      }}
    >

    </SafeAreaView>
  )
}

export default ProductScreen