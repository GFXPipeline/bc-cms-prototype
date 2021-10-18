import { useMemo } from "react";
import styled from "styled-components";
import { useTable } from "react-table";

const StyledTable = styled.table`
  border-collapse: collapse;
  border-style: hidden;
  font-size: 16px;
  table-layout: auto;
  width: 100%;

  tr {
    td,
    th {
      border: 1px solid #707070;
      padding: 14px 16px;

      button {
        text-align: left;
      }
    }
  }
`;

function Table({ id, tableColumns, tableData }) {
  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => tableData, []);
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <StyledTable id={id} {...getTableProps()}>
      {/* Table head */}
      <thead>
        {headerGroups.map((headerGroup) => {
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>;
            })}
          </tr>;
        })}
      </thead>

      {/* Table body */}
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}

export default Table;
