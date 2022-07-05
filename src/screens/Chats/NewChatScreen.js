import {
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ContactListItem from "../../components/ChatComponents/ContactListItem";
import { useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Auth } from "aws-amplify";

const NewChatScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userData = Auth.currentAuthenticatedUser();
  const { userId } = useAuthContext();

  const { client } = useChatContext();

  const fetchUsers = async () => {
    setIsLoading(true);
    const me = userData._W.attributes.sub;
    const response = await client.queryUsers({
      id: { $nin: [`${me}`, "tormatti"] },
    });
    setUsers(response.users);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onPress = async (user) => {
    const channel = client.channel("messaging", { members: [user.id, userId] });
    await channel.watch();
    navigation.navigate("SingularChat", { channel });
  };

  return (
    <View style={styles.container}>
      {/* <Button
        title="Start a new group"
        onPress={navigation.navigate("NewGroup")}
      ></Button> */}
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ContactListItem user={item} onPress={onPress} />
        )}
        refreshing={isLoading}
        onRefresh={fetchUsers}
      />
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate("NewGroup")}>
          <FontAwesome5 name="users" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aligniteq: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#005B86",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 20,
  },
});
