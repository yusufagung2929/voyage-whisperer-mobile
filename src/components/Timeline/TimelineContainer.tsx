
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface TimelineContainerProps {
  children: ReactNode;
}

const TimelineContainer = ({ children }: TimelineContainerProps) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
});

export default TimelineContainer;
