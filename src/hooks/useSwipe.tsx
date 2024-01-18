import {Dimensions, GestureResponderEvent} from "react-native";
const windowWidth = Dimensions.get("window").width;

export const useSwipe = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  rangeOffset = 4,
) => {
  let firstTouch = 0;

  const onTouchStart = (e: GestureResponderEvent) => {
    firstTouch = e.nativeEvent.pageX;
  };

  const onTouchEnd = (e: GestureResponderEvent) => {
    const positionX = e.nativeEvent.pageX;
    const range = windowWidth / rangeOffset;

    if (positionX - firstTouch > range) {
      onSwipeRight && onSwipeRight();
    } else if (firstTouch - positionX > range) {
      onSwipeLeft && onSwipeLeft();
    }
  };

  return {onTouchStart, onTouchEnd};
};
