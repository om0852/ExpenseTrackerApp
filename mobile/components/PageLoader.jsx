import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { styles } from "../assets/styles/home.styles";
import React from "react";
import { COLORS } from "../constants/colors";

const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  );
};

export default PageLoader;
