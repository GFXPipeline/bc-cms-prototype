import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSortBy, useTable } from "react-table";
import styled from "styled-components";

import Button from "../../../../../../components/Button";

const TableContainer = styled.div`
  margin-top: 24px;
  overflow-x: auto;

  table {
    border: 1px solid #d7d7d7;
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

      th {
        color: #1a5a96;
      }
    }
  }
`;

function Table({ pages }) {
  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "edit_button",
        Cell: ({ row }) => {
          return (
            <Button
              onClick={() => history.push(`/content/${row?.original?.id}`)}
              primary
            >
              Edit
            </Button>
          );
        },
      },
      {
        Header: "Page title",
        accessor: "title",
      },
      {
        Header: "Last modified",
        accessor: "modified_date",
      },
      {
        Header: "Page location",
        accessor: "location",
      },
      {
        Header: "Review frequency",
        accessor: "frequency",
        Cell: ({ row }) => {
          return <span>{`${row?.original?.frequency} months`}</span>;
        },
      },
      {
        Header: "Next review",
        accessor: "next_review",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      pages?.map((item) => {
        let dateModified = "";
        let dateNextReview = "";

        if (item?.time_last_updated) {
          const itemDate = new Date(item?.time_last_updated);
          const datePart = itemDate.toISOString().split("T")[0];
          const hours = itemDate.getHours();
          const amPm = hours >= 12 ? "PM" : "AM";
          const displayHours = hours % 12 ? hours % 12 : 12;
          const minutes = itemDate.getMinutes();
          const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
          dateModified = `${datePart} ${displayHours}:${displayMinutes} ${amPm}`;

          if (item?.review_frequency_months) {
            const reviewDate = new Date(
              itemDate.setMonth(
                itemDate.getMonth() + item?.review_frequency_months
              )
            );
            const datePart = reviewDate.toISOString().split("T")[0];
            const hours = reviewDate.getHours();
            const amPm = hours >= 12 ? "PM" : "AM";
            const displayHours = hours % 12 ? hours % 12 : 12;
            const minutes = reviewDate.getMinutes();
            const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
            dateNextReview = `${datePart} ${displayHours}:${displayMinutes} ${amPm}`;
          }
        }

        return {
          id: item?.id,
          title: item?.title,
          modified_date: dateModified,
          location: "",
          frequency: item?.review_frequency_months,
          next_review: dateNextReview,
        };
      }),
    [pages, history]
  );

  const tableInstance = useTable({ columns, data }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  function getRowProps(row) {
    const overdue = new Date() > new Date(row?.original?.next_review);

    return {
      style: {
        color: overdue ? "#D8292F" : null,
        "font-weight": overdue ? "700" : "400",
      },
    };
  }

  return (
    <TableContainer>
      <table id="content-review-schedule-table" {...getTableProps()}>
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
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
}

export default Table;
