import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import VideoFeed from '@components/VideoFeed';
import DroneControl from '@components/DroneControl';
import DroneStateDisplay from '@components/DroneStateDisplay';
import VirtualJoystick from '@components/VirtualJoystick';

const App = () => {
  const handleJoystickControl = (data) => {
    // Handle joystick input here
    console.log('Joystick control:', data);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={'light-content'} hidden={true} />
          <View style={styles.videoContainer}>
            <VideoFeed />
            <DroneControl />
            <DroneStateDisplay />
          </View>
          <VirtualJoystick
            onLeftJoystickMove={(data) => handleJoystickControl({ type: 'altitude', ...data })}
            onRightJoystickMove={(data) => handleJoystickControl({ type: 'movement', ...data })}
          />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative'
  },
  videoContainer: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;