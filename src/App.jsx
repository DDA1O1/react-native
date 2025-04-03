import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import VideoFeed from '@components/VideoFeed';
import DroneControl from '@components/DroneControl';
import DroneStateDisplay from '@components/DroneStateDisplay';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} hidden={true} />
        <View style={styles.videoContainer}>
          <VideoFeed />
          <DroneControl />
          <DroneStateDisplay />
        </View>
      </SafeAreaView>
    </Provider>
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