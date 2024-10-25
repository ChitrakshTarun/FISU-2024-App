import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ShuttleScheduleCardProps {
  icon: keyof typeof Ionicons.glyphMap
  title: string
  shuttleNo: string
  description: string
  description2: string
  onPress: () => void
}

const ShuttleScheduleCard = ({
  icon,
  shuttleNo,
  title,
  description,
  description2,
  onPress
}: ShuttleScheduleCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Ionicons name={icon} size={36} style={styles.icon} />
      <View style={styles.textContainer}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{shuttleNo}</Text>
        </View>
        <Text numberOfLines={1} style={styles.description}>
          {description}
        </Text>
        <Text numberOfLines={1} style={styles.description}>
          {description2}
        </Text>
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

export default ShuttleScheduleCard
