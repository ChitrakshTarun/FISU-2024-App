import { Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const BackButton = () => {
  const router = useRouter()
  const handleGoBack = () => router.back()
  return (
    <Pressable onPress={handleGoBack}>
      <Ionicons name='chevron-back' size={28} color={'black'} />
    </Pressable>
  )
}

export default BackButton
