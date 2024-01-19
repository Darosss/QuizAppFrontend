import {
  ColorValue,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

type CustomButtonProps = {
  title: string;
  bgColor?: ColorValue;
  onPress?: ((event: GestureResponderEvent) => void) | null;
  overrideStyles?: boolean;
  customStyle?: ViewStyle;
  disabled?: boolean;
};
export const CustomButton = ({
  title,
  onPress,
  bgColor = "cornflowerblue",
  overrideStyles,
  customStyle,
  disabled,
}: CustomButtonProps) => {
  return (
    <Pressable
      style={{
        ...(!overrideStyles && styles.button),
        ...customStyle,
        backgroundColor: bgColor,
        ...(disabled && {backgroundColor: "gray"}),
      }}
      disabled={disabled ? true : false}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
