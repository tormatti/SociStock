import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  rules = {},
  editable = true,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#E8E8E8" },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              editable={editable}
              placeholderTextColor={"#505050"}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6C6C6C",
    width: "100%",
    height: 40,

    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: "center",
  },
  input: {},
});
