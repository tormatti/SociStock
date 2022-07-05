import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import ContactListItem from "../../components/ChatComponents/ContactListItem";
import { AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChannelMembersScreen = () => {
  const [members, setMembers] = useState([]);
  const route = useRoute();
  const channel = route.params.channel;
  const navigation = useNavigation();

  const fetchMembers = async () => {
    const response = await channel.queryMembers({});
    setMembers(response.members);
  };

  useEffect(() => {
    fetchMembers();
  }, [channel]);

  return (
    <FlatList
      data={members}
      keyExtractor={(item) => item.user_id}
      renderItem={({ item }) => (
        <ContactListItem user={item.user} onPress={() => {}} />
      )}
      ListHeaderComponent={() => {
        if (channel.type == "team") {
          return (
            <View style={styles.mainContainer}>
              <Text style={styles.participants}>
                There are {members.length} participants
              </Text>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Invite", { channel });
                  }}
                >
                  <AntDesign name="adduser" size={28}></AntDesign>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
        return (
          <Text style={styles.participants}>
            There are {members.length} participants
          </Text>
        );
      }}
    />
  );
};

export default ChannelMembersScreen;

const styles = StyleSheet.create({
  participants: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    alignItems: "center",
  },
  container: {
    backgroundColor: "cyan",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },
});
