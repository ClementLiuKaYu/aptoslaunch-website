import { PropsWithChildren } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Divider,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
  Spacer,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaTwitter, FaDiscord, FaLink, FaCoins } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { AiTwotoneBank } from "react-icons/ai";
import { externalLinks } from "../../app/constants";

type NavBarProps = { path: string };

const NavBar = (props: NavBarProps) => {
  const { path } = props;
  return (
    <>
      <Flex
        as="nav"
        direction="column"
        w="240px"
        h="100%"
        display={{ base: "none", md: "flex" }}
      >
        <VStack display={{ base: "none", md: "block" }} py={1} pr={3}>
          <NavLink path={path} href="/launchpad" leftIcon={<AiTwotoneBank />}>
            Launchpads
          </NavLink>
          <NavLink
            path={path}
            href="/portfolio"
            leftIcon={<BsFillPiggyBankFill />}
          >
            Portfolio
          </NavLink>
          <NavLink path={path} href="/staking" leftIcon={<FaCoins />}>
            Staking
          </NavLink>
        </VStack>
        <Spacer />
        <Divider />
        <SimpleGrid columns={2} spacing={3} p={3}>
          <LinkBox
            as={Button}
            bg="#1DA1F2"
            _hover={{ bg: "#1DA1F2bb" }}
            leftIcon={<FaTwitter />}
          >
            <LinkOverlay href={externalLinks.twitter} target="_blank">
              Twitter
            </LinkOverlay>
          </LinkBox>
          <LinkBox
            as={Button}
            bg="#7289DA"
            _hover={{ bg: "#7289DAbb" }}
            leftIcon={<FaDiscord />}
          >
            <LinkOverlay href={externalLinks.discord} target="_blank">
              Discord
            </LinkOverlay>
          </LinkBox>
          <LinkBox
            as={Button}
            bg="#f1502f"
            _hover={{ bg: "#f1502fbb" }}
            leftIcon={<SiGitbook />}
          >
            <LinkOverlay href={externalLinks.doc} target="_blank">
              Gitbook
            </LinkOverlay>
          </LinkBox>
          <LinkBox
            as={Button}
            bg="#008000"
            _hover={{ bg: "#008000bb" }}
            leftIcon={<FaLink />}
          >
            <LinkOverlay href={externalLinks.linktree} target="_blank">
              Linktree
            </LinkOverlay>
          </LinkBox>
        </SimpleGrid>
      </Flex>
      <Divider
        orientation="vertical"
        display={{ base: "none", md: "block" }}
        mx={2}
      />
    </>
  );
};

type NavLinkProps = {
  path: string;
  href: string;
  target?: string;
  leftIcon?: any;
};

const NavLink = ({
  path,
  href,
  target,
  leftIcon,
  children,
}: PropsWithChildren<NavLinkProps>) => {
  const isActive: Boolean = path === href;
  return (
    <NextLink href={href}>
      <Link
        p={2}
        target={target}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Box
          as={Button}
          w="100%"
          my={2}
          p={2}
          bg="transparent"
          bgGradient={
            isActive ? "linear(to-br, teal.700, teal.900)" : "transparent"
          }
          justifyContent="start"
          borderRadius={5}
          _hover={{
            bgGradient: "linear(to-br, teal.400, teal.700)",
          }}
          leftIcon={leftIcon}
        >
          {children}
        </Box>
      </Link>
    </NextLink>
  );
};

export default NavBar;
