import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type DataTableProps<T> = {
  sortable: boolean;
  caption?: string;
  headers: {
    title: string;
    key: string;
  }[];
  data: T[];
  keyExtractor: (row: T) => string;
  renderRows: (item: T) => React.ReactNode;
  showPagination?: boolean;
  className?: string;
};

type sortingOrder = "ascending" | "descending";

// keeping it out so that is not re-rendered everytime
const sortData = (data: any[], key: string, order: sortingOrder = "ascending") => {
  let sortedData = data.sort((a, b) => {
    if (order === "ascending") {
      if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
      if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
      return 0;
    } else {
      if (a[key].toLowerCase() > b[key].toLowerCase()) return -1;
      if (a[key].toLowerCase() < b[key].toLowerCase()) return 1;
      return 0;
    }
  });
  return sortedData;
};

function DataTable<T>({
  sortable,
  caption,
  headers,
  data,
  keyExtractor,
  renderRows,
  className,
  showPagination = false,
}: DataTableProps<T>) {
  const [sortingOption, setSortingOption] = useState("");
  const [tableData, setTableData] = useState<T[]>([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const sortingHandler = (value: string, order: sortingOrder) => {
    setSortingOption(`${value}:${order}`);
    setTableData(sortData(data, value, order));
  };

  return (
    <TableContainer width={data.length === 0 ? "100%" : "auto"} className={className || ""}>
      <Table variant="striped">
        <TableCaption placement="top">{caption || ""}</TableCaption>
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header.key}>
                {header.title}
                {sortingOption === `${header.key}:ascending` ? (
                  <IconButton
                    visibility={sortable ? "visible" : "hidden"}
                    onClick={() => sortingHandler(header.key, "descending")} // calling the opposite order to toggle the sort
                    variant={"ghost"}
                    size={"sm"}
                    aria-label={`sort ${header}`}
                    title="ascending"
                    icon={<ArrowUpIcon />}
                    color={sortingOption === `${header.key}:ascending` ? "green.700" : "current"}
                  />
                ) : (
                  <IconButton
                    visibility={sortable ? "visible" : "hidden"}
                    onClick={() => sortingHandler(header.key, "ascending")} // calling the opposite order to toggle the sort
                    variant={"ghost"}
                    size={"sm"}
                    aria-label={`sort ${header}`}
                    title="descending"
                    icon={<ArrowDownIcon />}
                    color={sortingOption === `${header.key}:descending` ? "green.700" : "current"}
                  />
                )}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableData.length === 0 ? (
            <Tr>
              <Td colSpan={headers.length} textAlign={"center"}>
                No data found
              </Td>
            </Tr>
          ) : (
            <>
              {tableData.map((row) => (
                <Tr key={keyExtractor(row)}>{renderRows(row)}</Tr>
              ))}
            </>
          )}
        </Tbody>
        {showPagination && (
          <Tfoot>
            <Tr>
              <Th>pagination</Th>
            </Tr>
          </Tfoot>
        )}
      </Table>
    </TableContainer>
  );
}

export default DataTable;
