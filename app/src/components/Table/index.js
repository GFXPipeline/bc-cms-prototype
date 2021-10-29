import { useMemo } from "react";
import styled from "styled-components";
import { useSortBy, useTable } from "react-table";

const StyledTable = styled.table`
  border-collapse: collapse;
  border-style: hidden;
  font-size: 16px;
  table-layout: fixed;
  width: 100%;

  colgroup {
    col {
      text-align: left;

      &.title {
        width: 280px;
      }
      &.status {
        width: 120px;
      }
      &.type {
        width: 170px;
      }
      &.date {
        width: 110px;
      }
      &.user {
        width: 140px;
      }
    }
  }

  tr {
    td,
    th {
      border: 1px solid #707070;
      padding: 8px;
      text-align: left;
      width: 200px;

      button {
        text-align: left;
      }
    }
  }
`;

function Table({ id, tableColumns, tableData }) {
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const data = useMemo(() => tableData, [tableData]);
  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <StyledTable id={id} {...getTableProps()}>
      <colgroup>
        <col span="1" className="name" />
        <col span="1" className="status" />
        <col span="1" className="type" />
        <col span="1" className="date" />
        <col span="1" className="user" />
      </colgroup>

      {/* Table head */}
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▲"
                          : " ▼"
                        : ""}
                    </span>
                  </th>
                );
              })}
            </tr>
          );
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
