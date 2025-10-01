import { clsx } from "clsx";
import { useEffect } from "react";
import { View, ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { tv } from "tailwind-variants";

type LoadingProps = {
  size?: "sm" | "md";
} & ViewProps;

const ballView = tv({
  base: "rounded-full",
  variants: {
    size: {
      sm: "h-[0.65rem] w-[0.65rem]",
      md: "h-3 w-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const BallView = ({ size = "md", className }: LoadingProps) => (
  <View
    className={ballView({
      size,
      class: className,
    })}
  />
);

function useBlinkingBall(delay: number) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0, { duration: 500 }),
        ),
        -1,
        false,
      ),
    );
  }, [delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  return animatedStyle;
}

const ButtonLoading = ({ size, ...rest }: LoadingProps) => {
  const ball1Style = useBlinkingBall(0);
  const ball2Style = useBlinkingBall(200);
  const ball3Style = useBlinkingBall(400);

  return (
    <View
      className={clsx("w-1/3 flex-row items-center justify-between", {
        "h-7": size === "md",
        "h-6": size === "sm",
      })}
    >
      <Animated.View style={[ball1Style]}>
        <BallView size={size} {...rest} />
      </Animated.View>

      <Animated.View style={[ball2Style]}>
        <BallView size={size} {...rest} />
      </Animated.View>

      <Animated.View style={[ball3Style]}>
        <BallView size={size} {...rest} />
      </Animated.View>
    </View>
  );
};

export { ButtonLoading };
