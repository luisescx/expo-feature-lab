import LabLogo from "@/assets/images/expo-feature-lab-logo.png";
import {
  Button,
  Input,
  ScrollViewThemed,
  ThemedText,
  ThemeToggle,
} from "@/components/ui";
import { useAuthStore } from "@/stores/auth";
import { Image } from "expo-image";
import { useCallback, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(5, "Password must have at least 5 characters")
    .max(10, "Password must have a maximum of 10 characters"),
});

type UserSchema = z.infer<typeof userSchema>;

export default function SignIn() {
  const [form, setForm] = useState<UserSchema>({ email: "", password: "" });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserSchema, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSignIn = useAuthStore((state) => state.handleSignIn);

  const handleLogin = useCallback(async () => {
    setErrors({});

    const result = userSchema.safeParse(form);

    if (!result?.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      await handleSignIn();
    } catch {
      //
    } finally {
      setIsLoading(false);
    }
  }, [form, handleSignIn]);

  return (
    <ScrollViewThemed className="w-full">
      <View className="my-8 flex-row items-center justify-center">
        <Image
          source={LabLogo}
          style={{
            width: 48,
            height: 48,
          }}
        />

        <ThemedText type="titleSemi" className="text-2xl">
          Expo Feature Lab
        </ThemedText>
      </View>

      <View className="w-full items-center">
        <View className={`mb-16 w-[85%] items-center text-center`}>
          <ThemedText type="title" className="mb-2">
            Welcome
          </ThemedText>

          <ThemedText type="subtitle">Please login to your account</ThemedText>
        </View>

        <View className={"w-[85%]"}>
          <Input
            ref={emailRef}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            label="Email"
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => setForm((p) => ({ ...p, email: text }))}
            hasErrorValidation
            onSubmitEditing={() => passwordRef.current?.focus()}
            fieldHasError={!!errors.email}
            errorMessage={errors.email}
          />

          <Input
            ref={passwordRef}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="send"
            label="Password"
            placeholder="Password"
            textContentType="password"
            value={form.password}
            onChangeText={(text) => setForm((p) => ({ ...p, password: text }))}
            onSubmitEditing={handleLogin}
            hasErrorValidation
            fieldHasError={!!errors.password}
            errorMessage={errors.password}
          />

          <Pressable
            className="mb-6 self-end active:opacity-70"
            onPress={() => {
              //
            }}
            hitSlop={8}
          >
            <ThemedText type="link">Forgot Password?</ThemedText>
          </Pressable>

          <Button
            className="mb-6"
            colorType="primary"
            disabled={isLoading}
            isLoading={isLoading}
            onPress={handleLogin}
          >
            Login
          </Button>

          <View className="flex-row items-center justify-center">
            <ThemedText>Don&apos;t have an account?</ThemedText>
            <Pressable
              className="active:opacity-70"
              onPress={() => {
                //
              }}
              hitSlop={8}
            >
              <ThemedText type="link" className="pl-2 text-base">
                Sign up
              </ThemedText>
            </Pressable>
          </View>
        </View>

        <View className="mt-10">
          <ThemeToggle />
        </View>
      </View>
    </ScrollViewThemed>
  );
}
