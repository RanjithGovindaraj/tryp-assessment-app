import { ArrowUpIcon, ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type DataTableProps<T> = {
  className?: string;
  caption?: string;
  headers: {
    title: string;
    key: string;
  }[];
  data: T[];
  keyExtractor: (row: T) => string;
  renderRows: (item: T) => React.ReactNode;
  sortable?: boolean;
  pagination?: boolean;
  /**
   * use dataMode: `raw`, when pagination has to be handled by data table
   * use dataMode: paginated when pagination is handled by api
   *
   * if dataMode is `paginated`, send paginationMetaData */
  dataMode?: "raw" | "paginated";
  paginationMetaData?: {
    total: number;
    limit: number;
    page: number;
  };
};

type sortingOrder = "ascending" | "descending";

// keeping it out so that is not initialized everytime
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
  sortable = false,
  caption,
  headers,
  data,
  keyExtractor,
  renderRows,
  className,
  pagination = false,
  dataMode = "raw",
  paginationMetaData = {
    total: 0,
    page: 1,
    limit: 10,
  },
}: DataTableProps<T>) {
  const [sortingOption, setSortingOption] = useState("");
  const [tableData, setTableData] = useState<T[]>([]);
  const [paginationData, setPaginationData] = useState({
    total: 0,
    page: 1,
    limit: 10,
  });
  const [sortedData, setSortedData] = useState<T[]>([]);

  useEffect(() => {
    if (pagination) {
      if (dataMode === "raw") {
        setTableData(data.slice(0, 10));
        setSortedData(data);
        setPaginationData({
          total: data.length,
          page: 1,
          limit: 10,
        });
      } else {
        setPaginationData(paginationMetaData);
      }
    } else setTableData(data);
  }, [data, pagination, dataMode]);

  const sortingHandler = (value: string, order: sortingOrder) => {
    setSortingOption(`${value}:${order}`);
    const tempSortedData = sortData(data, value, order);
    setSortedData(sortData(data, value, order));
    if (pagination) {
      setTableData(tempSortedData.slice(0, 10));
      setPaginationData({
        total: data.length,
        page: 1,
        limit: 10,
      });
    } else setTableData(tempSortedData);
  };

  const previousClickHandler = () => {
    const { limit, page } = paginationData;
    const start = (page - 2) * limit;
    const end = (page - 1) * limit;
    setPaginationData((prev) => ({
      limit: prev.limit,
      page: prev.page - 1,
      total: prev.total,
    }));
    const pageData = sortable ? sortedData.slice(start, end) : data.slice(start, end);
    setTableData(pageData);
  };

  const nextClickHandler = () => {
    const { limit, page } = paginationData;
    const start = page * limit;
    const end = (page + 1) * limit;
    setPaginationData((prev) => ({
      limit: prev.limit,
      page: prev.page + 1,
      total: prev.total,
    }));
    const pageData = sortable ? sortedData.slice(start, end) : data.slice(start, end);
    setTableData(pageData);
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
        {pagination && (
          <Tfoot>
            <Tr>
              <Th colSpan={headers.length} textAlign={"center"}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Button
                    onClick={previousClickHandler}
                    isDisabled={paginationData.page === 1}
                    leftIcon={<ChevronLeftIcon />}
                    mr="10px"
                  >
                    Previous
                  </Button>
                  <Box>
                    page {paginationData.page} of {Math.ceil(paginationData.total / paginationData.limit)}
                  </Box>
                  <Button
                    onClick={nextClickHandler}
                    isDisabled={paginationData.page * paginationData.limit >= paginationData.total}
                    ml={"10px"}
                    rightIcon={<ChevronRightIcon />}
                  >
                    Next
                  </Button>
                </Flex>
              </Th>
            </Tr>
          </Tfoot>
        )}
      </Table>
    </TableContainer>
  );
}

export default DataTable;
