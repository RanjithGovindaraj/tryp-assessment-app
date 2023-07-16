import { ChevronDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, IconButton } from "@chakra-ui/react";

type DataTableProps<T> = {
  sortable: boolean;
  caption?: string;
  headers: string[];
  data: T[];
  keyExtractor: (row: T) => string;
  renderRows: (item: T) => React.ReactNode;
  showPagination?: boolean;
  className?: string;
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
  return (
    <TableContainer width={data.length === 0 ? "100%" : "auto"} className={className || ""}>
      <Table variant="striped">
        <TableCaption placement="top">{caption || ""}</TableCaption>
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header}>
                {header}
                <IconButton variant={"ghost"} size={"xs"} aria-label={`sort ${header}`} icon={<ChevronDownIcon />} />
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 ? (
            <Tr>
              <Td colSpan={headers.length} textAlign={"center"}>
                No data found
              </Td>
            </Tr>
          ) : (
            <>
              {data.map((row) => (
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
