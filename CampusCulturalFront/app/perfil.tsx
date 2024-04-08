import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfileScreen = () => {
  const userData = {
    name: "Lucas dos Santos",
    course: "Engenharia de Software",
   
    photo: "https://via.placeholder.com/150", 
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.photo }} style={styles.photo} />
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.course}>{userData.course}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  course: {
    fontSize: 18,
    fontStyle: "italic",
  },
});

export default ProfileScreen;
