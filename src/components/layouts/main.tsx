import { PropsWithChildren } from "react";
import { Router } from "next/router";
import Image from "next/image";
import Head from "next/head";
import TopBar from "../TopBar/TopBar";
import { Box, Container, Divider, Flex } from "@chakra-ui/react";
import NavBar from "../NavBar/NavBar";

const Main = ({ children, router }: PropsWithChildren<{ router: Router }>) => {
  return (
    <Box as="main" h="100%">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Aptos Launch" />
        <meta
          name="description"
          content="Aptos Launch - Largest Launchpad on Aptos Eco System"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>AptosLaunch</title>
      </Head>
      <Flex direction="column" w="100%" h="100vh" p={2} pb={0}>
        <TopBar />
        <Flex flex={1} h="100%" py={3} align="center">
          <NavBar path={router.asPath} />
          <Box flex={1} h="100%" overflowX="auto">
            <Container maxW={{ base: "container.md", xl: "container.lg" }}>
              {children}
            </Container>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Main;
