// App.jsx
import "./global.css"; // <-- Import the CSS file (use the correct path)

import React, { useState } from 'react';
import {SafeAreaView, View, Text, StatusBar, Pressable} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-black">
      <StatusBar barStyle={'dark-content'} />
      <View className="p-5 bg-blue-500 rounded-lg">
        <Text className="text-white text-xl font-bold">Hello NativeWind v4!</Text>
      </View>
      <Text className="mt-4 text-lg text-gray-700 dark:text-gray-300 ios:font-semibold">
        Styled with Tailwind!
      </Text>
      
      <View className="mt-8 items-center">
        <Text className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Count: {count}
        </Text>
        <Pressable 
          onPress={() => setCount(prev => prev + 1)}
          className="mt-4 bg-indigo-500 px-6 py-3 rounded-full active:bg-indigo-600"
        >
          <Text className="text-white font-semibold text-lg">
            Increment
          </Text>
        </Pressable>
        <Pressable 
          onPress={() => setCount(prev => prev - 1)}
          className="mt-4 bg-indigo-500 px-6 py-3 rounded-full active:bg-indigo-600"
        >
          <Text className="text-white font-semibold text-lg">
            Decrement 
          </Text>
        </Pressable>
      </View> 
    </SafeAreaView>
  );
};

export default App;