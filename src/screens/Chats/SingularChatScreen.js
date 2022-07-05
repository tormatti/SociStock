import { StyleSheet, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";

const SingularChatScreen = () => {
  const route = useRoute();
  const channel = route.params?.channel;

  if (!channel) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Select a channel from the list!</Text>
      </View>
    );
  }
  return (
    <Channel channel={channel} key={channel.data.name}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default SingularChatScreen;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  errorText: {
    fontSize: 10,
  },
});
