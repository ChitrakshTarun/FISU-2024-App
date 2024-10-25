import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ItemCardProps {
  icon: keyof typeof Ionicons.glyphMap
  title: string
  description: string
  onPress: () => void
}

const ItemCard = ({ icon, title, description, onPress }: ItemCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Ionicons name={icon} size={36} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={1} style={styles.description}>
          {description}
        </Text>
      </View>
      <View>
        <Ionicons name='chevron-forward' size={24} color='#000' />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8
  },
  icon: {
    marginRight: 16
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: '#666'
  }
})

export default ItemCard
