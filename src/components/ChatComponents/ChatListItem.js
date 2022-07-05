import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ChatListItem = ({ user, onPress, isSelected = false }) => {
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate("SingularChat");
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={require("../../../assets/RandomAvatar.png")}
            style={styles.avatar}
          />
          <View style={styles.midContainter}>
            <Text style={styles.username}>Name</Text>
            <Text style={styles.lastMessage}>Last Message</Text>
          </View>
        </View>
        <Text style={styles.time}>Date</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 50,
  },
  midContainter: {
    justifyContent: "space-around",
  },
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: "row",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 14,
    color: "gray",
  },
  time: {
    fontSize: 14,
    color: "gray",
  },
});
