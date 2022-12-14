import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useGetUserInfoMutation } from "../app/redux/apiSlice";
import { useEffect } from "react";
import { useAppSelector } from "../app/redux/hooks";

const Portfolio: NextPage = () => {
  const address = useAppSelector((state) => state.application.wallet.address);
  const [getInfo, info] = useGetUserInfoMutation();
  const record = (info.data as any)?.userRecord;

  useEffect(() => {
    getInfo(address);
  }, [address]);

  return (
    <>
      <Head>
        <title>Portfolio - AptosLaunch</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Box>
        <Card>
          <CardHeader>
            <Heading>Portfolio</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Project</Th>
                    <Th textAlign="center">Purchased</Th>
                    <Th textAlign="center">Unlock at TGE</Th>
                    <Th textAlign="center">Locked</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {(record?.seed_round ?? 0) > 0 && (
                    <Tr>
                      <Td>AptosLaunch Token (Seed)</Td>
                      <Td textAlign="center">{record?.seed_round ?? 0}</Td>
                      <Td textAlign="center">
                        {(record?.seed_round * 0.25).toFixed(2) ?? 0}
                      </Td>
                      <Td textAlign="center">
                        {(record?.seed_round * 0.75).toFixed(2) ?? 0}
                      </Td>
                    </Tr>
                  )}
                  {(record?.private_round ?? 0) > 0 && (
                    <Tr>
                      <Td>AptosLaunch Token (Private)</Td>
                      <Td textAlign="center">{record?.private_round ?? 0}</Td>
                      <Td textAlign="center">
                        {(record?.private_round * 0.3).toFixed(2) ?? 0}
                      </Td>
                      <Td textAlign="center">
                        {(record?.private_round * 0.7).toFixed(2) ?? 0}
                      </Td>
                    </Tr>
                  )}
                  <Tr>
                    <Td>AptosLaunch Token (OG)</Td>
                    <Td textAlign="center">{record?.og_round ?? 0}</Td>
                    <Td textAlign="center">{record?.og_round ?? 0}</Td>
                    <Td textAlign="center">0</Td>
                  </Tr>
                  <Tr>
                    <Td>AptosLaunch Token (Public)</Td>
                    <Td textAlign="center">{record?.public_round ?? 0}</Td>
                    <Td textAlign="center">{record?.public_round ?? 0}</Td>
                    <Td textAlign="center">0</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default Portfolio;
