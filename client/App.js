import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import {useState, useEffect} from 'react';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import Counter from './components/Counter';


const PlaceholderImage = require('./assets/images/Brown-eggs.webp')

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [counter, setCounter] = useState([{}]);

  useEffect( () => {
    fetch("http://localhost:5000/count", method='GET').then(
      res => res.json()
    ).then(
      counter => {
        setCounter(counter)
        console.log(counter)
      }
    )
  },[])

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    
    if(requestAnimationFrame.cancelled) {
      alert('You did not select any image.');
    }
    
    let localUri = result.assets[0].uri
    let filename = localUri.split('/').pop()

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    console.log(type)

    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('file', { uri: localUri, name: filename, type });
    fetch("http://localhost:5000/count", {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(
      res => res.json()
    ).then(
      counter => {
        setCounter(counter)
        console.log("test24")
        console.log(counter)
      },[selectedImage])
    
    setSelectedImage(result.assets[0].uri)
  };

  return (
    <View style={styles.container}>
      
      <Text style={{ color: '#fff', paddingTop: "5%", fontSize: 20}}>
        Eggs by the Dozen
      </Text>

      <View style={styles.imageContainer}>
        <ImageViewer 
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
    
      <View style = {styles.footerContiner}>
        <Counter label="Counter: " count = {(typeof counter.count === 'undefined') ? ('N/A') : (counter.count)}/>
      </View>

      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme = "accessFiles" onPress = {pickImageAsync}/>
        <Button label="Use this photo" theme = "hidden"/>
      </View>

      <StatusBar style="light" />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: "5%",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
