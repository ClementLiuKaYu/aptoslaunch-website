import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text,
  useToast,
  useDisclosure,
  NumberInputField,
  NumberInput,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../app/redux/hooks";
import {
  registerCoin,
  checkAccountBalance,
  transferCoin,
  parseAddress,
} from "../app/helper/wallet";
import {
  useClaimtALTMutation,
  useGetUserInfoMutation,
  useTaltToAltMutation,
} from "../app/redux/apiSlice";
import { useEffect, useState } from "react";
import { tALT, TO_ADDRESS } from "../app/constants";

const Staking: NextPage = () => {
  const [getInfo, info] = useGetUserInfoMutation();
  const [claimtALT, claimRes] = useClaimtALTMutation();
  const [withdrawALT, withdrawRes] = useTaltToAltMutation();
  const isConnected = useAppSelector(
    (state) => state.application.wallet.walletName != null
  );
  const address = useAppSelector((state) => state.application.wallet.address);
  const balance = useAppSelector((state) => state.application.balance);
  const tALTReg = balance.find((token) => token.tokenName == "tALT")?.isReg;
  const ALTReg = balance.find((token) => token.tokenName == "ALT")?.isReg;

  const time = Date.now();
  let date = new Date(Date.now()).toUTCString();
  const tgeTimeEpoch = 1669888800000;
  const daysAfterTge = Math.floor((time - tgeTimeEpoch) / 86400000);
  const apy = 1.00092226;
  const tALTBalance =
    balance.find((token) => token.tokenName == "tALT")?.amount ?? 0;
  const earned = tALTBalance * apy ** daysAfterTge;

  useEffect(() => {
    getInfo(address);
    date = new Date(Date.now()).toUTCString();
  }, [address, balance]);

  const toast = useToast();

  const connectWalletWrapper = (callback: Function) => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect to a wallet to use this feature.",
        position: "top-right",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    callback();
  };

  const ClaimButton = () => {
    return tALTReg ? (
      (info.data as any)?.userRecord.tge_claim_status == 0 ? (
        <Button
          onClick={() =>
            connectWalletWrapper(() => {
              claimtALT(address);
              checkAccountBalance();
            })
          }
        >
          Claim
        </Button>
      ) : (
        <Button disabled>Claimed</Button>
      )
    ) : (
      <Button
        onClick={() =>
          connectWalletWrapper(() => {
            registerCoin("tALT");
          })
        }
      >
        Register tALT
      </Button>
    );
  };

  const WithdrawButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = useState("0");
    return ALTReg ? (
      <>
        <Button onClick={onOpen}>Convert</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Convert</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading size={"sm"} mb={2}>
                Please enter convert amount:
              </Heading>
              <HStack>
                <Text>tALT:</Text>
                <NumberInput
                  onChange={(valueString) => setValue(valueString)}
                  value={value}
                >
                  <NumberInputField />
                </NumberInput>
                <AiOutlineArrowRight />
                <Text>ALT:</Text>
                <NumberInput
                  onChange={(valueString) =>
                    setValue(
                      (Number(valueString) / apy ** daysAfterTge).toString()
                    )
                  }
                  value={(Number(value) * apy ** daysAfterTge).toString()}
                >
                  <NumberInputField />
                </NumberInput>
              </HStack>
              <Text fontSize={"11px"} color="grey" mt={2}>
                Be aware: After you withdraw to $ALT, you cannot stake in the
                TGE Contract anymore and take advantage of the 40% APY.
              </Text>
              <Text fontSize={"11px"} color="grey" mt={2}>
                The above amounts are estimations, please refer to wallet
                transaction for exact amounts.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={() => {
                  connectWalletWrapper(async () => {
                    await transferCoin(
                      tALT,
                      TO_ADDRESS,
                      Number(value),
                      (res: any) => {
                        withdrawALT({ address: address, txid: res });
                      }
                    );
                  });
                  onClose();
                }}
              >
                Convert
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    ) : (
      <Button
        onClick={() =>
          connectWalletWrapper(() => {
            registerCoin("ALT");
          })
        }
      >
        Register ALT
      </Button>
    );
  };

  return (
    <>
      <Head>
        <title>Staking - AptosLaunch</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Box>
        {/* <Heading mb={2}>Staking</Heading> */}
        <Card>
          <CardHeader>
            <Heading>Stake Tokens</Heading>
          </CardHeader>
          <CardBody>
            <Heading size="md" mb="1">
              Pool - tALT
            </Heading>
            <Divider mb="3" />
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="4">
              <Stat>
                <StatLabel>APY</StatLabel>
                <StatNumber>40.00 %</StatNumber>
                <StatHelpText>Annual Percentage Yield</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>TVL</StatLabel>
                <StatNumber>--.--</StatNumber>
                <StatHelpText>Available soon</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Amount</StatLabel>
                <StatNumber>{tALTBalance} tALT</StatNumber>
                <StatHelpText>
                  {isConnected
                    ? "From wallet " + parseAddress(address)
                    : "Connect to a wallet to see balance"}
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Est. ALT</StatLabel>
                <StatNumber>{earned} ALT</StatNumber>
                <StatHelpText>
                  {isConnected
                    ? "Last updated on " + date
                    : "Connect to a wallet to see earnings"}
                </StatHelpText>
              </Stat>
              <ClaimButton />
              <WithdrawButton />
            </SimpleGrid>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default Staking;
