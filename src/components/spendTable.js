import React, { useState } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';

const rowLimit = [
  { value: 100, name: '100개' },
  { value: 200, name: '200개' },
  { value: 500, name: '500개' },
  { value: -1, name: '제한없음' },
];

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
  const requestMonth = (e) => {
    console.log(e.target.value);
  };
  const sortBySearchTerm = (e) => {
    const searchWord = e.target.value;
    setSearchTerm(searchWord);
    setGlobalFilter(searchWord);
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start">
      {searchAble && (
        <form
          onSubmit={onSearch}
          className="w-full h-16 p-1 mb-4 flex justify-evenly items-center"
        >
          <div className="w-full h-full flex items-center">
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
              onChange={sortBySearchTerm}
            />
          </div>
          <select
            className="m-0 py-0 min-w-0 w-28 lg:w-24 mx-1 sm:mr-2 md:mr-4 h-3/4 border rounded-lg shadow-inner bg-transparent hover:border-orange-400 hover:border-2 focus:outline-none"
            name="select"
            key={'select'}
            defaultValue={rowLimit[0].value}
            onChange={requestMonth}
          >
            {rowLimit.map((month, index) => (
              <option key={index} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
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
                            {/* <i className="fa-solid fa-plane-departure"></i> */}
                            <i class="fa-solid fa-beer-mug-empty"></i>
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
