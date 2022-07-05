import { createContext, useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { getStreamToken } from "../graphql/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  userId: null,
  setUserId: (newId) => {},
});

const AuthContextComponent = ({ children, client }) => {
  const [userId, setUserId] = useState(null);
  const [picture, setPicture] = useState("");

  const connectStreamChatUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const { sub, email } = userData.attributes;
    const tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
    const token = tokenResponse?.data?.getStreamToken;
    const name = userData.attributes.preferred_username.toLowerCase();
    if (!userData) return;

    try {
      const value = await AsyncStorage.getItem(userData.attributes.sub);
      if (value != null) {
        console.log("VALUE FROM AUTH");
        console.log(value);
        setPicture(value);
      } else console.log("null");
    } catch (error) {
      console.log("error");
    }

    if (!token) {
      Alert.alert("Failed to fetch the token");
      return;
    }

    await client.connectUser(
      {
        id: sub,
        name: name,
        image: picture,
      },
      token
    );
    setUserId(sub);
  };

  useEffect(() => {
    connectStreamChatUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId, picture, setPicture }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
