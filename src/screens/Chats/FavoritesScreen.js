import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-expo";
import { Auth } from "aws-amplify";
import { useAuthContext } from "../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = () => {
  const { client } = useChatContext();
  const [email, setEmail] = useState("");
  //const [id, setId] = useState("");
  const { setPicture, picture } = useAuthContext();

  const getUserData = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    setEmail(userData.attributes.email);
    //console.log(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const onPress = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    console.log(userData);
    //const userData = await Auth.currentAuthenticatedUser();
    //setId(userData.attributes.sub);
    // console.log(userData.attributes.sub);
    // console.log(client._user);
    // const id = "1234";
    // const picture = "12345677890";
    // console.log(picture);
    // console.log(userData.attributes.sub);
    // console.log(typeof userData.attributes.sub);
    // console.log(picture);

    // try {
    //   await AsyncStorage.setItem(id, picture);
    // } catch (error) {
    //   console.log("error1");
    // }

    // try {
    //   const value = await AsyncStorage.getItem(id);
    //   if (value != null) {
    //     console.log(value);
    //   }
    // } catch (error) {
    //   console.log("error2");
    // }
    // const update = {
    //   id: client._user.id,
    //   set: {
    //     image: "https://api.adorable.io/avatars/80/abott@adorable.png",
    //   },
    // };

    //console.log(client._user);

    // const response = await client.upsertUser({
    //   id: id,
    //   name: client._user.name,
    //   image:
    //     "https://i.pinimg.com/originals/08/61/b7/0861b76ad6e3b156c2b9d61feb6af864.jpg",
    // });
    // setPicture(
    //   "https://i.pinimg.com/originals/08/61/b7/0861b76ad6e3b156c2b9d61feb6af864.jpg"
    // );

    // const response = await client.upsertUser(update);
    //console.log(response.users);

    //console.log(client._user);
    console.log(
      "----------------------------------------------------------------------------------------------"
    );

    //  console.log(Object.values(response.users)[0].image);
  };

  return <Button title="test" onPress={onPress} />;
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
