import "react-native-get-random-values";
import "@ethersproject/shims";
import { PrivyProvider } from "@privy-io/expo";
import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


// Create a client
const queryClient = new QueryClient()

export default function Layout() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <PrivyProvider appId="clpsidj9n00fujt0fh5n2wamm">
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen name="reveal" options={{ presentation: "modal" }} />
        </Stack>
      </PrivyProvider>
      </QueryClientProvider>
    </>
  );
}
