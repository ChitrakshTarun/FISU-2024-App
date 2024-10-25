import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { Notification } from '@/lib/types'

interface NotificationCardProps extends Notification {
  onPress: () => void
}

const NotificationCard = ({ id, time, title, description, onPress }: NotificationCardProps) => {
  const newTime = new Date(time.seconds * 1000 + time.nanoseconds / 1000000)
  const formattedTime = newTime.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Set to false for 24-hour format
  })

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.notificationContentContainer}>
        <Text numberOfLines={1} style={styles.titleText}>
          {title}
        </Text>
        <Text style={styles.timeText}>{formattedTime}</Text>
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

export default NotificationCard

const styles = StyleSheet.create({
  container: {
    gap: 16,
    alignItems: 'center',
    paddingVertical: 16,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  notificationContentContainer: {
    flexDirection: 'column',
    flex: 1
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeText: {
    fontSize: 12,
    color: '#666'
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: '#666',
    paddingVertical: 8
  }
})
