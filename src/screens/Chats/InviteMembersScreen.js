import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "stream-chat-expo";
import ContactListItem from "../../components/ChatComponents/ContactListItem";

const InviteMembersScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const { userId } = useAuthContext();
  const { client } = useChatContext();
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const route = useRoute();
  const channel = route.params?.channel;

  const fetchUsers = async () => {
    const existingMembers = await channel.queryMembers({});
    const existingMemberIds = existingMembers.members.map((m) => m.user_id);
    existingMemberIds.push("tormatti");
    const response = await client.queryUsers({
      id: { $nin: existingMemberIds },
    });
    setUsers(response.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectUser = (user) => {
    if (selectedUserIds.includes(user.id)) {
      setSelectedUserIds((existingUsers) =>
        existingUsers.filter((id) => id !== user.id)
      );
    } else {
      setSelectedUserIds((existingUsers) => [...existingUsers, user.id]);
    }
  };

  const inviteUsers = async () => {
    await channel.addMembers(selectedUserIds);
    navigation.goBack();
  };

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <ContactListItem
          user={item}
          onPress={selectUser}
          isSelected={selectedUserIds.includes(item.id)}
        />
      )}
      ListHeaderComponent={() =>
        !!selectedUserIds.length && (
          <Button title="Invite" onPress={inviteUsers} />
        )
      }
    />
  );
};

export default InviteMembersScreen;

const styles = StyleSheet.create({});
