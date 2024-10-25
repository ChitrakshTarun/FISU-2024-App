import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface LoaderProps {
  text?: string
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#000' />
      <Text>Loading {`${text}`}...</Text>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
