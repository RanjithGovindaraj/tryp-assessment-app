import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Box, Flex, IconButton, useColorMode, ChakraProvider } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <ChakraProvider>
      <Box width={"100%"} padding={"20px"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Link href={"/"}>DataTable</Link>
          <IconButton
            aria-label="toggle color scheme"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </Flex>
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
