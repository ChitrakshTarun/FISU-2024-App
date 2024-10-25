import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '@/constants/Colors'

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
const defaultStyles = StyleSheet.create({
  subheading: {
    color: Colors.Black,
    fontSize: 18,
    marginVertical: 16,
    fontWeight: 'bold'
  },
  text: {
    color: Colors.Black,
    fontSize: 14,
    textAlign: 'justify'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.Orange
  },
  topSectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 24
  },

  description: {
    fontSize: 14,
    marginBottom: 4,
    color: Colors.Black
  }
})

export default defaultStyles
