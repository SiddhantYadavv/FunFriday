import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="pages/Results" options={{ headerShown: false }} />
      <Stack.Screen name="pages/Roles" options={{ headerShown: false }} />
    </Stack>
  );
}
