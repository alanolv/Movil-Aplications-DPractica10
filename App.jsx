import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [dog, setDog] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await res.json();
      setDog(data);
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  const pickImage = async () => {
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setDog({ message: result.assets[0].uri });
    }
  };

  const deleteImage = () => {
    setDog(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.txtTitle}>Welcome to Dog API</Text>
      </View>

      {error && <Text>{error}</Text>}
      {dog && (
        <View style={styles.dataContainer}>
          <Image style={styles.image} source={{ uri: dog.message }} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.btnText}>Get Random Dog</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.btnText}>Upload Dog</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.button} onPress={deleteImage}>
          <Text style={styles.btnText}>Delete Dog</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex:1,
    justifyContent: "center",
    
  },
  dataContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 4,
    flexDirection: "columns",
    alignItems: "center",
    marginTop: 20,
  },
  txtTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#8e44ad",
    padding: 5,
    margin: 10,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default App;
