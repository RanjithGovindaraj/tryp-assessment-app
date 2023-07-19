import Head from "next/head";
import styles from "@/styles/Home.module.css";
import DataTable from "@/components/DataTable";
import data1000 from "@/data/data-1000.json";
import { Box, Heading, ListItem, Tag, Td, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";

type rowType = {
  timestamp: string;
  purchase_id: string;
  email: string;
  name: string;
  source: string | null;
  status: string;
};

const StatusTag = ({ status }: { status: string }) => {
  let colorScheme = "gray";
  switch (status.toLowerCase()) {
    case "failed":
      colorScheme = "red";
      break;
    case "paid":
      colorScheme = "green";
      break;
    case "waiting":
      colorScheme = "yellow";
      break;
    default:
      colorScheme = "gray";
      break;
  }
  return (
    <Tag borderRadius={"16px"} colorScheme={colorScheme}>
      {status}
    </Tag>
  );
};

const Row = (row: rowType) => (
  <>
    <Td>{row.timestamp}</Td>
    <Td>{row.purchase_id}</Td>
    <Td>{row.email}</Td>
    <Td>{row.name}</Td>
    <Td>{row.source}</Td>
    <Td>
      <StatusTag status={row.status} />
    </Td>
  </>
);

const headers = [
  {
    title: "TIMESTAMP",
    key: "timestamp",
  },
  {
    title: "ID",
    key: "purchase_id",
  },
  {
    title: "EMAIL",
    key: "email",
  },
  {
    title: "NAME",
    key: "name",
  },
  {
    title: "SOURCE",
    key: "source",
  },
  {
    title: "STATUS",
    key: "status",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Tryp Datatable</title>
        <meta name="description" content="Application created for tryp assessment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Box width={"100%"}>
          <Heading as="h1">Table of contents</Heading>
          <UnorderedList>
            <ListItem>
              <a className={styles.link} href="#no-data">
                Table with no data
              </a>
            </ListItem>
            <ListItem>
              <a className={styles.link} href="#mock-data">
                Table with mock data
              </a>
            </ListItem>
            <ListItem>
              <a className={styles.link} href="#mock-data-with-sorting">
                Table with mock data with sorting enabled
              </a>
            </ListItem>
            <ListItem>
              <a className={styles.link} href="#mock-data-with-pagination">
                Table with mock data with pagination enabled
              </a>
            </ListItem>
            <ListItem>
              <Link className={styles.link} href={"/withAPI/pokemon"}>
                Table with data from pokemon API
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
        <a id="no-data"></a>
        <DataTable<rowType>
          caption="Table with no data"
          headers={headers}
          data={[]}
          keyExtractor={(row) => row.purchase_id}
          renderRows={Row}
          sortable={false}
        />
        <br />
        <br />
        <a id="mock-data"></a>
        <DataTable<rowType>
          caption="Table with mock data"
          headers={headers}
          data={data1000.slice(0, 10)}
          keyExtractor={(row) => row.purchase_id}
          renderRows={Row}
          sortable={false}
        />
        <br />
        <br />
        <a id="mock-data-with-sorting"></a>
        <DataTable<rowType>
          caption="Table with mock data with sorting enabled"
          headers={headers}
          data={data1000.slice(0, 10)}
          keyExtractor={(row) => row.purchase_id}
          renderRows={Row}
          sortable={true}
        />
        <br />
        <br />
        <a id="mock-data-with-pagination"></a>
        <DataTable<rowType>
          caption="Table with mock data with pagination enabled"
          headers={headers}
          data={data1000}
          keyExtractor={(row) => row.purchase_id}
          renderRows={Row}
          pagination={true}
          sortable
        />
      </main>
    </>
  );
}
