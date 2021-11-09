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

      &.edit-button {
        width: 80px;
      }
      &.title {
        width: 350px;
      }
      &.modified_date {
        width: 200px;
      }
      &.location {
        width: 480px;
      }
      &.frequency {
        width: 150px;
      }
      &.next_review {
        width: 200px;
      }
    }
  }

  tr {
    td,
    th {
      border: 1px solid #707070;
      padding: 8px;
      text-align: left;

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
        <col span="1" className="edit_button" />
        <col span="1" className="title" />
        <col span="1" className="modified_date" />
        <col span="1" className="location" />
        <col span="1" className="frequency" />
        <col span="1" className="next_review" />
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
