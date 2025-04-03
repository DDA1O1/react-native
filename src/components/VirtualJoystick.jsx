import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

const VirtualJoystick = ({ onLeftJoystickMove, onRightJoystickMove }) => {
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  
  const leftPosition = useRef(new Animated.ValueXY()).current;
  const rightPosition = useRef(new Animated.ValueXY()).current;

  const leftGesture = Gesture.Pan()
    .onStart(() => {
      setLeftActive(true);
    })
    .onUpdate((event) => {
      const { translationX, translationY } = event;
      const radius = 48;
      const distance = Math.sqrt(translationX * translationX + translationY * translationY);
      const scale = distance > radius ? radius / distance : 1;
      const x = translationX * scale;
      const y = translationY * scale;
      
      leftPosition.setValue({ x, y });
      if (onLeftJoystickMove) {
        onLeftJoystickMove({ x: x / radius, y: y / radius });
      }
    })
    .onEnd(() => {
      setLeftActive(false);
      resetJoystick(leftPosition);
      if (onLeftJoystickMove) onLeftJoystickMove({ x: 0, y: 0 });
    });

  const rightGesture = Gesture.Pan()
    .onStart(() => {
      setRightActive(true);
    })
    .onUpdate((event) => {
      const { translationX, translationY } = event;
      const radius = 48;
      const distance = Math.sqrt(translationX * translationX + translationY * translationY);
      const scale = distance > radius ? radius / distance : 1;
      const x = translationX * scale;
      const y = translationY * scale;
      
      rightPosition.setValue({ x, y });
      if (onRightJoystickMove) {
        onRightJoystickMove({ x: x / radius, y: y / radius });
      }
    })
    .onEnd(() => {
      setRightActive(false);
      resetJoystick(rightPosition);
      if (onRightJoystickMove) onRightJoystickMove({ x: 0, y: 0 });
    });

  const resetJoystick = (position) => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const isArrowActive = (position, direction) => {
    const { x, y } = position.__getValue();
    const threshold = 0.5;
    
    switch (direction) {
      case 'up':
        return y < -threshold * 48;
      case 'down':
        return y > threshold * 48;
      case 'left':
        return x < -threshold * 48;
      case 'right':
        return x > threshold * 48;
      default:
        return false;
    }
  };

  const renderArrow = (direction, active) => {
    let path = '';
    switch (direction) {
      case 'up':
        path = 'M5 10l7-7m0 0l7 7m-7-7v18';
        break;
      case 'down':
        path = 'M19 14l-7 7m0 0l-7-7m7 7V3';
        break;
      case 'left':
        path = 'M10 19l-7-7m0 0l7-7m-7 7h18';
        break;
      case 'right':
        path = 'M14 5l7 7m0 0l-7 7m7-7H3';
        break;
    }

    return (
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        stroke={active ? "white" : "rgba(156, 163, 175, 0.5)"}
        fill="none"
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={path}
        />
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      {/* Left Joystick */}
      <GestureDetector gesture={leftGesture}>
        <View style={styles.joystickContainer}>
          {/* Directional Arrows */}
          <View style={styles.arrowsContainer}>
            <View style={[styles.arrow, styles.topArrow]}>
              {renderArrow('up', isArrowActive(leftPosition, 'up'))}
            </View>
            <View style={[styles.arrow, styles.bottomArrow]}>
              {renderArrow('down', isArrowActive(leftPosition, 'down'))}
            </View>
            <View style={[styles.arrow, styles.leftArrow]}>
              {renderArrow('left', isArrowActive(leftPosition, 'left'))}
            </View>
            <View style={[styles.arrow, styles.rightArrow]}>
              {renderArrow('right', isArrowActive(leftPosition, 'right'))}
            </View>
          </View>

          {/* Joystick Knob */}
          <Animated.View
            style={[
              styles.knob,
              {
                transform: [
                  { translateX: leftPosition.x },
                  { translateY: leftPosition.y },
                ],
              },
            ]}
          >
            <View style={styles.knobLabel}>
              <Animated.Text style={styles.knobText}>ALT</Animated.Text>
            </View>
          </Animated.View>
        </View>
      </GestureDetector>

      {/* Right Joystick */}
      <GestureDetector gesture={rightGesture}>
        <View style={styles.joystickContainer}>
          {/* Directional Arrows */}
          <View style={styles.arrowsContainer}>
            <View style={[styles.arrow, styles.topArrow]}>
              {renderArrow('up', isArrowActive(rightPosition, 'up'))}
            </View>
            <View style={[styles.arrow, styles.bottomArrow]}>
              {renderArrow('down', isArrowActive(rightPosition, 'down'))}
            </View>
            <View style={[styles.arrow, styles.leftArrow]}>
              {renderArrow('left', isArrowActive(rightPosition, 'left'))}
            </View>
            <View style={[styles.arrow, styles.rightArrow]}>
              {renderArrow('right', isArrowActive(rightPosition, 'right'))}
            </View>
          </View>

          {/* Joystick Knob */}
          <Animated.View
            style={[
              styles.knob,
              {
                transform: [
                  { translateX: rightPosition.x },
                  { translateY: rightPosition.y },
                ],
              },
            ]}
          >
            <View style={styles.knobLabel}>
              <Animated.Text style={styles.knobText}>MOVE</Animated.Text>
            </View>
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  joystickContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  arrowsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  arrow: {
    position: 'absolute',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topArrow: {
    top: 8,
    alignSelf: 'center',
  },
  bottomArrow: {
    bottom: 8,
    alignSelf: 'center',
  },
  leftArrow: {
    left: 8,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  rightArrow: {
    right: 8,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  knob: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  knobLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  knobText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default VirtualJoystick; 