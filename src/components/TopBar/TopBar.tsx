import { MouseEventHandler, PropsWithChildren, useEffect } from "react";
import NextLink from "next/link";
import Image, { StaticImageData } from "next/image";
import {
  Box,
  Button,
  Link,
  Heading,
  HStack,
  VStack,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Input,
  InputLeftElement,
  InputGroup,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  SimpleGrid,
  Text,
  Circle,
  Stack,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { TbSwitch, TbPower } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import logoBlack from "../../../public/assets/images/aptos-launch-logo-b.png";
import logoWhite from "../../../public/assets/images/aptos-launch-logo-w.png";
import petraLogo from "../../../public/assets/images/petra.png";
import martianLogo from "../../../public/assets/images/martian.png";
import pontemLogo from "../../../public/assets/images/pontem.png";
import cryptoLogo from "../../../public/assets/images/crypto.png";
import bitkeepLogo from "../../../public/assets/images/bitkeep.png";
import { connectWallet, parseAddress } from "../../app/helper/wallet";
import { RootState } from "../../app/redux/store";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks";
import { disconnectWallet } from "../../app/redux/applicationSlice";

const TopBar = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      w="100%"
      p={2}
      // bg="#FFFFFF15"
      // backdropFilter="auto"
      // backdropBlur="10px"
      // zIndex={2}
    >
      <HStack justify={"space-between"}>
        <Box pt={2} _hover={{ cursor: "pointer" }}>
          <NextLink href="/">
            <Image
              src={useColorModeValue(logoBlack, logoWhite)}
              alt="AptosLaunch Main Logo"
              width={224}
              height={33}
            />
          </NextLink>
        </Box>
        {/* <Box>
          <InputGroup display={{ base: "none", md: "block" }}>
            <InputLeftElement>
              <AiOutlineSearch />
            </InputLeftElement>
            <Input
              variant="filled"
              placeholder="Search"
              w="30vw"
              borderRadius={20}
            />
          </InputGroup>
        </Box> */}
        <Box>
          <Box display={{ base: "none", md: "flex" }}>
            {/* <LinkItem path="" href="/">
              Home
            </LinkItem>
            <LinkItem path="" href="/">
              About
            </LinkItem>
            <LinkItem path="" href="/">
              Launch App
            </LinkItem> */}
            <ConnectButton />
            {/* <ColorModeSwitch /> */}
          </Box>
          {/* add change dark light */}
          <Box display={{ base: "inline-block", md: "none" }}>
            <Menu isLazy>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                bg="transparent"
              ></MenuButton>
              <MenuList>
                <NextLink href="/" passHref>
                  <MenuItem as={Link}>Home</MenuItem>
                </NextLink>
                <NextLink href="/" passHref>
                  <MenuItem as={Link}>About</MenuItem>
                </NextLink>
                <NextLink href="/" passHref>
                  <MenuItem as={Link}>Launch App</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

type LinkItemProps = {
  path: string;
  href: string;
  target?: string;
};

const LinkItem = ({
  path,
  href,
  target,
  children,
}: PropsWithChildren<LinkItemProps>) => {
  const isActive: Boolean = path === href;
  return (
    <NextLink href={href}>
      <Link p={2} target={target}>
        {children}
      </Link>
    </NextLink>
  );
};

const ConnectButton = () => {
  const wallet = useAppSelector((state) => state.application.wallet);
  const balance = useAppSelector((state) => state.application.balance);
  const APTBalance =
    balance.find((token: any) => token.tokenName == "APT")?.amount ?? 0;
  const tALTBalance =
    balance.find((token: any) => token.tokenName == "tALT")?.amount ?? 0;
  const ALTBalance =
    balance.find((token: any) => token.tokenName == "ALT")?.amount ?? 0;
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return wallet.walletName == null ? (
    <>
      <Button mx={2} size={"md"} onClick={onOpen}>
        Connect Wallet
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect to a wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <SimpleGrid columns={2} spacing={7}>
              <ModalWalletButton
                walletName="Petra"
                src={petraLogo}
                onClick={() => {
                  connectWallet("petra", dispatch);
                  onClose();
                }}
              />
              <ModalWalletButton
                walletName="Martian"
                src={martianLogo}
                onClick={() => {
                  connectWallet("martian", dispatch);
                  onClose();
                }}
              />
              <ModalWalletButton
                walletName="Pontem"
                src={pontemLogo}
                onClick={() => {
                  connectWallet("pontem", dispatch);
                  onClose();
                }}
              />
              <ModalWalletButton
                walletName="Crypto.com"
                src={cryptoLogo}
                onClick={() => {
                  connectWallet("crypto", dispatch);
                  onClose();
                }}
              />
              {/* <ModalWalletButton
                walletName="Bitkeep"
                src={bitkeepLogo}
                onClick={() => {connectWallet("bitkeep", dispatch);onClose();}}
              /> */}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  ) : (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        mx={2}
        size={"md"}
        // onClick={() => dispatch(disconnectWallet())}
      >
        {parseAddress(wallet.address)}
      </MenuButton>
      <MenuList>
        <MenuItem>
          <HStack>
            <Circle size="40px" mr={2} bg="white"></Circle>
            <Stack>
              <Text>APT</Text>
              <Text fontSize="12px" fontWeight="700">
                {APTBalance}
              </Text>
            </Stack>
          </HStack>
        </MenuItem>
        <MenuItem>
          <HStack>
            <Circle size="40px" mr={2} bg="white"></Circle>
            <Stack>
              <Text>tALT</Text>
              <Text fontSize="12px" fontWeight="700">
                {tALTBalance}
              </Text>
            </Stack>
          </HStack>
        </MenuItem>
        <MenuItem>
          <HStack>
            <Circle size="40px" mr={2} bg="white"></Circle>
            <Stack>
              <Text>ALT</Text>
              <Text fontSize="12px" fontWeight="700">
                {ALTBalance}
              </Text>
            </Stack>
          </HStack>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<TbSwitch />}
          onClick={() => {
            dispatch(disconnectWallet());
            onOpen();
          }}
        >
          Connect a different wallet
        </MenuItem>
        <MenuItem
          icon={<TbPower />}
          onClick={() => dispatch(disconnectWallet())}
        >
          Disconnect Wallet
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

type ModalWalletButtonProps = {
  walletName: string;
  src: StaticImageData;
  onClick: MouseEventHandler;
};

const ModalWalletButton = ({
  walletName,
  src,
  onClick,
}: ModalWalletButtonProps) => {
  return (
    <Box
      p={3}
      borderRadius="md"
      _hover={{
        bgGradient: "linear(to-br, teal.400, teal.700)",
      }}
      onClick={onClick}
    >
      <VStack>
        <Image
          src={src}
          alt={walletName + " icon"}
          width="50px"
          height="50px"
        />
        <Heading size="md">{walletName}</Heading>
      </VStack>
    </Box>
  );
};

const ColorModeSwitch = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle Color Mode"
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
      onClick={toggleColorMode}
    />
  );
};

export default TopBar;
