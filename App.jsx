import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import VideoFeed from './components/VideoFeed';
import DroneControl from './components/DroneControl';
import DroneStateDisplay from './components/DroneStateDisplay';
const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [battery, setBattery] = useState(0);
  const [flightTime, setFlightTime] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

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
        <DroneStateDisplay 
          battery={battery} 
          flightTime={flightTime} 
          lastUpdate={lastUpdate} 
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