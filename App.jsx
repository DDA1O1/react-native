import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import VideoFeed from './components/VideoFeed';
import DroneControl from './components/DroneControl';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // TODO: Implement drone connection logic
    setIsConnected(!isConnected);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} hidden={true} />
      <View style={styles.videoContainer}>
        <VideoFeed />
        <DroneControl 
          isConnected={isConnected} 
          onConnect={handleConnect} 
        />
      </View>
    </SafeAreaView>
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