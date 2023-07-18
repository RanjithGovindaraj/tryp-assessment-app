import Head from "next/head";
import styles from "@/styles/Home.module.css";
import DataTable from "@/components/DataTable";
import { Td } from "@chakra-ui/react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

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
    return { data: data, error: null };
  } catch (error) {
    return { data: [], error: error };
  }
};

const Row = ({ name, url }: Pokemon) => {
  return (
    <>
      <Td>{name}</Td>
      <Td>
        <Link className={styles.link} href={url}>
          {url}
        </Link>
      </Td>
    </>
  );
};

export default function Pokemon({ data, error }: PokemonProps) {
  const router = useRouter();

  const query = router.query;
  const limit = query.limit ? (Array.isArray(query.limit) ? parseInt(query.limit[0]) : parseInt(query.limit)) : 20;
  const offset = query.offset ? (Array.isArray(query.offset) ? parseInt(query.offset[0]) : parseInt(query.offset)) : 0;

  const previousHandler = () => {
    if (data.previous) {
      const url = new URL(data.previous);
      const limit = url.searchParams.get("limit");
      const offset = url.searchParams.get("offset");
      if (limit && offset) {
        router.push({
          query: {
            limit,
            offset,
          },
        });
      }
    }
  };

  const nextHandler = () => {
    if (data.next) {
      const url = new URL(data.next);
      const limit = url.searchParams.get("limit");
      const offset = url.searchParams.get("offset");
      if (limit && offset) {
        router.push({
          query: {
            limit,
            offset,
          },
        });
      }
    }
  };

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
          pagination
          paginationMetaData={{
            limit: limit,
            page: offset / 20 + 1,
            total: data.count,
          }}
          dataMode="paginated"
          onPreviousClick={previousHandler}
          onNextClick={nextHandler}
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const limit = query.limit ? (Array.isArray(query.limit) ? parseInt(query.limit[0]) : parseInt(query.limit)) : 20;
  const offset = query.offset ? (Array.isArray(query.offset) ? parseInt(query.offset[0]) : parseInt(query.offset)) : 0;
  const { data, error } = await fetchPokemon(limit, offset);
  return {
    props: {
      data: data,
      error: error,
    },
  };
};
