import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Title, Text, TouchableRipple } from "react-native-paper";
import { useTheme } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useChatContext } from "stream-chat-expo";
import { Auth } from "aws-amplify";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { useAuthContext } from "../../contexts/AuthContext";
import TermsAndConditions from "./TermsAndConditions";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { client } = useChatContext();
  const { picture, setPicture } = useAuthContext();
  const Fname = client._user.name;
  const name = Fname.charAt(0).toUpperCase() + Fname.slice(1);
  const [email, setEmail] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasPhotoPermission, setHasPhotoPermission] = useState(null);
  const navigation = useNavigation();
  const [pic, setPic] = useState("");

  const bs = React.useRef(null);
  const fall = new Animated.Value(1);

  const savePic = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      await AsyncStorage.setItem(userData.attributes.sub, picture);
      console.log("SUCCESS");
    } catch (error) {
      console.log("error");
    }
  };

  const getUserData = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    setEmail(userData.attributes.email);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const terms = () => {
    navigation.navigate("Terms");
  };

  const choosePhotoFromLibrary = async () => {
    if (!hasGalleryPermission) {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setPicture(result.uri);
      const response = await client.upsertUser({
        id: client._user.id,
        name: client._user.name,
        image: result.uri,
      });
      console.log(response);
      savePic();
    }
  };

  const takePhotoFromCamera = async () => {
    if (!hasPhotoPermission) {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasPhotoPermission(galleryStatus.status === "granted");
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPicture(result.uri);
      const response = await client.upsertUser({
        id: client._user.id,
        name: client._user.name,
        image: result.uri,
      });
      console.log(response);
      savePic();
    }
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const signOut = async () => {
    await Auth.signOut();
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <TouchableOpacity
              onPress={() => {
                bs.current.snapTo(0);
              }}
            >
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={{
                    uri: picture,
                  }}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                {name}
              </Title>
            </View>
          </View>
        </View>
      </Animated.View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="email" color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{email}</Text>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="refresh" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Refresh</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            terms();
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="form-select" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Terms and Conditions</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            signOut();
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  menuWrapper: {
    marginBottom: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
