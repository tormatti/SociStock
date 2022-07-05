import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import NewMessageButton from "../../components/ChatComponents/NewMessageButton";
import { ChannelList, useChatContext } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getStreamToken } from "../../graphql/queries";

const ChatsListScreen = () => {
  const navigation = useNavigation();
  const { client } = useChatContext();
  const { setUserId } = useAuthContext();

  const connectStreamChatUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const { sub, email } = userData.attributes;
    const tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
    const token = tokenResponse?.data?.getStreamToken;

    if (!token) {
      Alert.alert("Failed to fetch the token");
      return;
    }

    setUserId(sub);

    // await client.connectUser(
    //   {
    //     id: sub,
    //     name: name,
    //     image: image,
    //   },
    //   token
    // );
    // setUserId(sub);
  };

  useEffect(() => {
    connectStreamChatUser();
  }, []);

  const onChannelPressed = (channel) => {
    navigation.push("SingularChat", { channel }); // this in tutorial was with props. at the beggining
  };

  const { userId } = useAuthContext();

  const filters = {
    members: {
      $in: [userId],
    },
  };

  return (
    <>
      <ChannelList onSelect={onChannelPressed} filters={filters} />
      <NewMessageButton />
    </>
  );
};

export default ChatsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aligniteq: "center",
    justifyContent: "center",
  },
});
