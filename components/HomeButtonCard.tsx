// DEPENDENCIES
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native'
// COMPONENTS AND ICONS
import { Ionicons } from '@expo/vector-icons'
// DATA, CONSTANTS AND FUNCTIONS
import { LinearGradient } from 'expo-linear-gradient'
import { Href, useRouter } from 'expo-router'

interface HomeButtonCardProps {
  title: string
  icon?: keyof typeof Ionicons.glyphMap
  backgroundColor: Array<string>
  path: Href<string>
  minWidth?: number
  maxWidth?: number
  aspectRatio?: number
  containerStyle?: object
}

const HomeButtonCard = ({
  title,
  icon,
  backgroundColor,
  path,
  minWidth = 150,
  maxWidth = 300,
  aspectRatio = 2,
  containerStyle = {}
}: HomeButtonCardProps) => {
  const router = useRouter()
  const { width: screenWidth } = useWindowDimensions()

  // Calculate the optimal width based on screen size and constraints
  const calculateWidth = () => {
    const columns = Math.floor(screenWidth / minWidth)
    const optimalWidth = (screenWidth - (32 + (columns - 1) * 8)) / columns // 32 for padding, 8 for gap
    return Math.min(maxWidth, Math.max(minWidth, optimalWidth))
  }

  const cardWidth = calculateWidth()
  const cardHeight = cardWidth / aspectRatio

  const dynamicStyles = StyleSheet.create({
    card: {
      width: cardWidth,
      height: cardHeight,
      ...containerStyle
    }
  })

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push(path)}
      style={[styles.container, dynamicStyles.card]}
    >
      <LinearGradient colors={[...backgroundColor]} style={[styles.gradient, dynamicStyles.card]} />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
        {icon && (
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={Math.min(32, cardWidth * 0.15)} color='white' />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default HomeButtonCard

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden'
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white'
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  titleContainer: {
    position: 'absolute',
    left: 10,
    bottom: 10
  }
})
