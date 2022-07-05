import "react-native-gesture-handler";
import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  LogBox,
} from "react-native";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat, Edit } from "stream-chat-expo";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ExploreScreen from "./src/screens/Explore/ExploreScreen";
import FavoritesScreen from "./src/screens/Chats/FavoritesScreen";
import ChatsListScreen from "./src/screens/Chats/ChatsListScreen";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./src/screens/Registration/SignInScreen";
import SignUpScreen from "./src/screens/Registration/SignUpScreen";
import ConfirmEmailScreen from "./src/screens/Registration/ConfirmEmailScreen";
import ForgotPasswordScreen from "./src/screens/Registration/ForgotPasswordScreen";
import NewPasswordScreen from "./src/screens/Registration/NewPasswordScreen";
import Amplify, { Auth, Hub } from "aws-amplify";
import config from "./src/aws-exports";
import SingularChatScreen from "./src/screens/Chats/SingularChatScreen";
import NewChatScreen from "./src/screens/Chats/NewChatScreen";
import AuthContext from "./src/contexts/AuthContext";
import ChannelMembersScreen from "./src/screens/Chats/ChannelMembersScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import NewGroupScreen from "./src/screens/Chats/NewGroupScreen";
import InviteMembersScreen from "./src/screens/Chats/InviteMembersScreen";
import ProfileScreen from "./src/screens/Registration/ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import HeaderForApp from "./src/screens/Explore/HeaderForApp";
import TermsAndConditions from "./src/screens/Registration/TermsAndConditions";

const API_KEY = "rgbsk9fc4h3u";
const client = StreamChat.getInstance(API_KEY);

console.disableYellowBox = true;

Amplify.configure(config);

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function MyTabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        //tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#F08080" },
        tabBarInactiveTintColor: "#FFC5F3",
        tabBarActiveTintColor: "#34FFC1",
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" color={color} size={size} />
          ),
          headerTitle: () => <HeaderForApp />,
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          ),
          headerTitle: () => <HeaderForApp />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-star" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: () => <HeaderForApp />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          // headerTitleStyle: {
          //   color: "white",
          // },
          // headerStyle: {
          //   backgroundColor: "#202020",
          // },
          headerTitle: () => <HeaderForApp />,
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [user, setUser] = useState(undefined);
  const [username, setUsername] = useState("");

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // useEffect(() => {
  //   return () => {
  //     client.disconnectUser();
  //   };
  // }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkUser();
      }
    };

    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <AuthContext client={client}>
      <NavigationContainer>
        <OverlayProvider>
          <Chat client={client}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: "black" },
              }}
            >
              {user ? (
                <>
                  <Stack.Screen name="Tabs" component={MyTabs} />
                  <Stack.Screen
                    name="SingularChat"
                    component={SingularChatScreen}
                    options={({ navigation, route }) => ({
                      headerShown: true,
                      cardStyle: { backgroundColor: "white" },
                      headerTitle: () => <HeaderForApp />,
                      headerRight: () =>
                        route?.params?.channel && (
                          <Pressable
                            style={styles.icon}
                            onPress={() =>
                              navigation.navigate("ChannelMembers", {
                                channel: route.params.channel,
                              })
                            }
                          >
                            <FontAwesome5 name="users" size={24} />
                          </Pressable>
                        ),
                    })}
                  />
                  <Stack.Screen
                    name="NewChat"
                    component={NewChatScreen}
                    options={{
                      headerShown: true,
                      cardStyle: { backgroundColor: "white" },
                      headerTitle: () => <HeaderForApp />,
                    }}
                  />
                  <Stack.Screen
                    name="ChannelMembers"
                    component={ChannelMembersScreen}
                    options={{
                      headerShown: true,
                      cardStyle: { backgroundColor: "white" },
                      headerTitle: () => <HeaderForApp />,
                    }}
                  />
                  <Stack.Screen
                    name="NewGroup"
                    component={NewGroupScreen}
                    options={{
                      headerShown: true,
                      cardStyle: { backgroundColor: "white" },
                      headerTitle: () => <HeaderForApp />,
                    }}
                  />
                  <Stack.Screen
                    name="Invite"
                    component={InviteMembersScreen}
                    options={{
                      headerShown: true,
                      cardStyle: { backgroundColor: "white" },
                      headerTitle: () => <HeaderForApp />,
                    }}
                  />
                  <Stack.Screen
                    name="Terms"
                    component={TermsAndConditions}
                    options={{
                      headerShown: true,
                      cardStyle: { backgroundColor: "white" },
                      headerTitle: () => <HeaderForApp />,
                    }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen name="SignIn" component={SignInScreen} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} />
                  <Stack.Screen
                    name="ConfirmEmail"
                    component={ConfirmEmailScreen}
                  />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                  />
                  <Stack.Screen
                    name="NewPassword"
                    component={NewPasswordScreen}
                  />
                  <Stack.Screen
                    name="Terms"
                    component={TermsAndConditions}
                    options={{
                      headerShown: true,
                      cardStyle: { backgroundColor: "white" },
                      headerTitle: () => <HeaderForApp />,
                    }}
                  />
                </>
              )}
            </Stack.Navigator>
          </Chat>
        </OverlayProvider>
      </NavigationContainer>
    </AuthContext>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

export default App;
