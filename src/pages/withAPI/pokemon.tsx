import Head from "next/head";
import styles from "@/styles/Home.module.css";
import DataTable from "@/components/DataTable";
import { Td } from "@chakra-ui/react";
import Link from "next/link";

type Pokemon = {
  name: string;
  url: string;
};

type PokemonData = {
  count: number;
  previous: string | null;
  next: string | null;
  results: Pokemon[];
};

type PokemonProps = {
  data: PokemonData;
  error: null | unknown;
};

const fetchPokemon = async (limit: number, offset: number) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    console.log(data);
    return { data: data, error: null };
  } catch (error) {
    console.log("error");
    return { data: null, error: error };
  }
};

const Row = ({ name, url }: Pokemon) => {
  return (
    <>
      <Td>{name}</Td>
      <Td>
        <Link href={url}>{url}</Link>
      </Td>
    </>
  );
};

export default function Pokemon({ data, error }: PokemonProps) {
  console.log(data);
  return (
    <>
      <Head>
        <title>Tryp Datatable</title>
        <meta name="description" content="Application created for tryp assessment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <DataTable<Pokemon>
          headers={[
            {
              key: "url",
              title: "URL",
            },
            {
              key: "name",
              title: "Name of the pokemon",
            },
          ]}
          data={data.results}
          keyExtractor={(row) => row.name}
          renderRows={Row}
        />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { data, error } = await fetchPokemon(20, 0);
  return {
    props: {
      data: data,
      error: error,
    },
  };
}
