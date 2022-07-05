import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useChatContext } from "stream-chat-expo";
import { v4 as uuidv4 } from "uuid";

import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";

const NewGroupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const { client } = useChatContext();
  const { userId } = useAuthContext();

  const createChannel = async () => {
    const channel = client.channel("team", uuidv4(), { name });
    await channel.create();
    await channel.addMembers([userId]);
    navigation.navigate("SingularChat", { channel });
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Channel name"
        style={styles.input}
        placeholderTextColor="lightgrey"
      />
      <Button title="Create channel" onPress={createChannel} />
    </View>
  );
};

export default NewGroupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    color: "black",
  },
});
