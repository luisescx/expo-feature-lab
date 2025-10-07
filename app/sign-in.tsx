import LabLogo from "@/assets/images/expo-feature-lab-logo.png";
import {
  Button,
  Input,
  ScrollViewThemed,
  ThemedText,
  ThemeToggle,
} from "@/components/ui";
import { useTranslation } from "@/hooks/use-translation";
import { useSessionStore } from "@/stores/session";
import { Image } from "expo-image";
import { useCallback, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email({ message: "invalidEmail" }),
  password: z
    .string()
    .min(5, { message: "passwordMin" })
    .max(10, { message: "passwordMax" }),
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

  const handleSignIn = useSessionStore((state) => state.handleSignIn);
  const { translation } = useTranslation();

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
    <ScrollViewThemed className="w-full" edges={["top"]} addInsets={["bottom"]}>
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
            {translation("login.title")}
          </ThemedText>

          <ThemedText type="subtitle">
            {" "}
            {translation("login.subtitle")}
          </ThemedText>
        </View>

        <View className={"w-[85%]"}>
          <Input
            ref={emailRef}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            label={translation("login.emailLabel")}
            placeholder={translation("login.emailLabel")}
            value={form.email}
            onChangeText={(text) => setForm((p) => ({ ...p, email: text }))}
            hasErrorValidation
            onSubmitEditing={() => passwordRef.current?.focus()}
            fieldHasError={!!errors.email}
            errorMessage={
              errors.email ? translation(`login.errors.${errors.email}`) : null
            }
          />

          <Input
            ref={passwordRef}
            keyboardType="default"
            autoCapitalize="none"
            returnKeyType="send"
            label={translation("login.passwordLabel")}
            placeholder={translation("login.passwordLabel")}
            textContentType="password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => setForm((p) => ({ ...p, password: text }))}
            onSubmitEditing={handleLogin}
            hasErrorValidation
            fieldHasError={!!errors.password}
            errorMessage={
              errors.password
                ? translation(`login.errors.${errors.password}`)
                : null
            }
          />

          <Pressable
            className="mb-6 self-end active:opacity-70"
            onPress={() => {
              //
            }}
            hitSlop={8}
          >
            <ThemedText type="link">
              {translation("login.forgotPassword")}
            </ThemedText>
          </Pressable>

          <Button
            className="mb-6"
            colorType="primary"
            disabled={isLoading}
            isLoading={isLoading}
            onPress={handleLogin}
          >
            {translation("login.loginButton")}
          </Button>

          <View className="flex-row items-center justify-center">
            <ThemedText> {translation("login.noAccount")}</ThemedText>
            <Pressable
              className="active:opacity-70"
              onPress={() => {
                //
              }}
              hitSlop={8}
            >
              <ThemedText type="link" className="pl-2 text-base">
                {translation("login.signUp")}
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
