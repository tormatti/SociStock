import { StyleSheet, Text, Image, Pressable, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../../contexts/AuthContext";
import { Entypo } from "react-native-vector-icons";

const ContactListItem = ({ user, onPress, isSelected = false }) => {
  const { client } = useChatContext();
  const { userId } = useAuthContext();
  const navigation = useNavigation();

  // const onPress = async () => {
  //   if (!user.id || !userId || userId == user.id) {
  //     return;
  //   }
  //   const channel = client.channel("messaging", { members: [user.id, userId] });
  //   await channel.watch();
  //   navigation.navigate("SingularChat", { channel });
  // };

  return (
    <Pressable onPress={() => onPress(user)} style={styles.root}>
      <Image style={styles.image} source={{ uri: user.image }} />
      <Text>{user.name}</Text>
      <View style={{ marginLeft: "auto" }}>
        {isSelected && <Entypo name="check" size={24} color="green" />}
      </View>
    </Pressable>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 50,
    marginRight: 10,
  },
});
