import React, { useState } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';

//bg-[#FAFAFC]
export const SpendTable = ({ columns, data, searchAble }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const [searchTerm, setSearchTerm] = useState('');
  const onSearch = (e) => {
    e.preventDefault();
    setGlobalFilter(searchTerm);
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start">
      {searchAble && (
        <form
          onSubmit={onSearch}
          className="w-full h-16 p-1 mb-4 flex justify-start items-end"
        >
          <label
            htmlFor="search-input"
            className="min-w-fit mb-3 text-lg font-semibold mr-3"
          >
            Search :
          </label>
          <input
            id="search-input"
            className="outline-none w-3/4 h-[90%] border border-x-0 border-t-0 border-b-2 bg-[#FDFDFE]"
            placeholder="Enter search words..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      )}
      <table
        className="w-full min-w-[150px] overflow-x-scroll h-auto p-4 border border-[#eee] shadow-lg"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="pl-2 md:pl-5 text-left h-12 align-middle"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      className="pl-2 md:pl-5 bg-[#f5f5f7a2] text-left h-11 align-middle"
                      {...cell.getCellProps()}
                    >
                      <div className="flex items-center">
                        {index === 1 && (
                          <div className="bg-yellow-200 rounded-2xl w-6 h-6 flex justify-center items-center mr-3  text-xs">
                            <i className="fa-solid fa-plane-departure"></i>
                          </div>
                        )}
                        {cell.render('Cell')}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
