import { StyleSheet, Image } from 'react-native';
import {useState, useEffect} from 'react';

export default function ImageViewer({ placeholderImageSource, selectedImage}) {
  const imageSource = selectedImage ? {uri: selectedImage } : placeholderImageSource;
  return (
    <Image source={imageSource} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 400,
    borderRadius: 18,
  },
});