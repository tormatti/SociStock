import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import React, { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

const ExploreScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(null);
  const [close, setClose] = useState(null);
  const [up, setUp] = useState(false);

  const search = async () => {
    setSuccess(false);
    const key = searchInput.toUpperCase();
    //console.log(key);
    const url = `http://193.106.55.137:8080/api/instruments/search?searchPhrase=${key}&addExtraDetails=true`;
    const priceUrl = `http://193.106.55.137:8080/api/instruments/currentPrice?symbolName=${key}`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Api-key": "cc2f6a3b-5602-4901-af65-17388a0d1bd1",
      },
    });
    const responsePrice = await fetch(priceUrl, {
      headers: {
        Accept: "application/json",
        "Api-key": "cc2f6a3b-5602-4901-af65-17388a0d1bd1",
      },
    });
    const data = await response.json();
    const dataPrice = await responsePrice.json();
    if (data.length == 0) {
      console.log("Empty");
      setSuccess(false);
    } else {
      setName(data[0].name);
      setImage(data[0].details.image);
      setSymbol(data[0].symbol);
      setPrice(dataPrice.price);
      setClose(dataPrice.prevClose);
      setSuccess(true);
    }

    if (price > close) setUp(true);

    console.log(data);
  };

  return (
    <View style={styles.Container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          marginRight: 20,
        }}
      >
        <Feather
          name="search"
          size={20}
          color="#C6C6C6"
          style={{ marginTop: 20, marginHorizontal: 10 }}
        />
        <TextInput
          style={styles.TextInput}
          value={searchInput}
          onChangeText={(val) => setSearchInput(val)}
          placeholder={"Search"}
        ></TextInput>
      </View>
      <Button
        style={{ marginTop: 20 }}
        title="Search"
        onPress={() => search()}
      ></Button>
      {success ? (
        <View style={styles.MainPostView}>
          <View style={styles.title}>
            <Image
              source={{
                uri: image,
              }}
              style={styles.Picture}
            ></Image>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={{ fontSize: 15 }}>({symbol})</Text>
            </View>
          </View>
          {up ? (
            <View
              style={{ flex: 1, justifyContent: "flex-end", marginBottom: 15 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.price}>
                  {price} ({close})
                </Text>
                <Entypo name="arrow-up" size={24} color={"green"} />
              </View>
            </View>
          ) : (
            <View
              style={{ flex: 1, justifyContent: "flex-end", marginBottom: 15 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.price2}>
                  {price} ({close})
                </Text>
                <Entypo name="arrow-down" size={24} color={"red"} />
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.MainPostView}></View>
      )}
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  name: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  title: {
    flexDirection: "row",
  },
  Heading: {
    fontSize: 32,
    marginTop: 20,
    marginLeft: 15,
    fontWeight: "bold",
  },
  TextInput: {
    height: 39,
    width: "90%",
    backgroundColor: "#C2C2C2",
    borderRadius: 20,
    paddingLeft: 15,
    marginTop: 20,
  },
  MainPostView: {
    padding: 20,
    margin: 20,
    height: "70%",
    backgroundColor: "#C2C2C2",
    borderRadius: 20,
  },
  Picture: {
    alignSelf: "center",
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  price: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "green",
  },
  price2: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "red",
  },
});
