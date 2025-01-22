import React, { useMemo, useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { CSVLink } from 'react-csv';
import { createClient } from '@supabase/supabase-js';

const TableComponent = () => {
  const [data, setData] = useState([]);

  // Supabase initialization
  const supabaseUrl = 'https://bqeujxgpwuiyigjlmpsn.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxZXVqeGdwd3VpeWlnamxtcHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzQ2MTgsImV4cCI6MjA0NzUxMDYxOH0.y5WRPP61rAkPk3zWcr7yqCQFVEUvZxzi-b5yL-REGUU';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    // Fetch data from the users_main table in Supabase
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('users_main')
        .select('id, name, age, career, total_attendance, attendance_time , Emotion');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data); // Set the data into state
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Career', accessor: 'career' },
      { Header: 'Total Attendance', accessor: 'total_attendance' },
      { Header: 'Attendance Time', accessor: 'attendance_time' },
      { Header: 'Emotion', accessor: 'Emotion' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, usePagination);

  return (
    <div className="p-4">
      {/* Table container for responsiveness */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table
          {...getTableProps()}
          className="w-full border-collapse border border-gray-200 text-left"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-100 border-b border-gray-300"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-2 text-sm font-medium text-gray-700"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-50 border-t">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-2 text-sm text-gray-600">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination and CSV export */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={`px-3 py-1 text-sm font-medium rounded ${
              canPreviousPage
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`px-3 py-1 text-sm font-medium rounded ${
              canPreviousPage
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {'<'}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-3 py-1 text-sm font-medium rounded ${
              canNextPage
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            className={`px-3 py-1 text-sm font-medium rounded ${
              canNextPage
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {'>>'}
          </button>
        </div>
        <span className="text-sm text-gray-700">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <CSVLink
          data={data}
          className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Export CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default TableComponent;
