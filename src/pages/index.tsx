import Head from "next/head";
import styles from "@/styles/Home.module.css";
import DataTable from "@/components/DataTable";
import data1000 from "@/data/data-1000.json";
import { Tag, Td } from "@chakra-ui/react";

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
