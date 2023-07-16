import Head from "next/head";
import styles from "@/styles/Home.module.css";
import DataTable from "@/components/DataTable";
import data from "@/data/data.json";
import { Box, Flex, IconButton, Td, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

type rowType = {
  timestamp: string;
  purchase_id: string;
  email: string;
  name: string;
  source: string | null;
  status: string;
};

const Row = (row: rowType) => (
  <>
    <Td>{row.timestamp}</Td>
    <Td>{row.purchase_id}</Td>
    <Td>{row.email}</Td>
    <Td>{row.name}</Td>
    <Td>{row.source}</Td>
    <Td>{row.status}</Td>
  </>
);

export default function Home() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Tryp Datatable</title>
        <meta name="description" content="Application created for tryp assessment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box width={"100%"} padding={"20px"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Box>DataTable</Box>
          <IconButton
            aria-label="toggle color scheme"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </Flex>
      </Box>
      <main className={`${styles.main}`}>
        <DataTable<rowType>
          caption="Table with no data"
          headers={["TIMESTAMP", "ID", "EMAIL", "NAME", "SOURCE", "STATUS"]}
          data={[]}
          keyExtractor={(row) => row.purchase_id}
          renderRows={Row}
          sortable={false}
        />
        <DataTable<rowType>
          caption="Table with mock data"
          headers={["TIMESTAMP", "ID", "EMAIL", "NAME", "SOURCE", "STATUS"]}
          data={data.slice(0, 10)}
          keyExtractor={(row) => row.purchase_id}
          renderRows={Row}
          sortable={false}
        />
      </main>
    </>
  );
}
