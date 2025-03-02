import { Image, StyleSheet, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Login from '../../components/Login'
import { View } from 'react-native';

export default function HomeScreen() {
  return (
      <>

        <Login/>
         <Toast />
      </>
  )
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    // position: 'absolute',
  },
});
