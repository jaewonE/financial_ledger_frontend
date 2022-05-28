import React, { useEffect, useMemo, useState } from 'react';
import BaseWrapper from '../components/baseWrapper';
import { SpendTable } from '../components/spendTable';
import { sendQuery } from '../mysql';

const data_tableColumn = [
  { accessor: 'categoryName', Header: '카테고리' },
  { accessor: 'nDate', Header: '날짜' },
  { accessor: 'store', Header: '가계' },
  { accessor: 'price', Header: '가격' },
];

const Spend = ({ userObj, jwt }) => {
  const [info, setInfo] = useState();
  const [limit, setLimit] = useState(100);
  const columns = useMemo(() => data_tableColumn, []);
  const data = useMemo(() => info, [info]);
  useEffect(() => {
    const requestSpend = async (jwt, limit) => {
      const { status, data, err } = await sendQuery(
        `http://localhost:4000/spend/${jwt}${limit ? '/' + limit : ''}`
      );
      if (status === 200 && data) setInfo(data);
      else {
        console.error(err);
        alert('Error');
      }
    };
    requestSpend(jwt, limit);
  }, [jwt, limit]);

  return (
    <BaseWrapper userObj={userObj}>
      <div className="w-full text-left text-2xl font-semibold mb-2">
        최근 지출
      </div>
      {info && (
        <SpendTable
          columns={columns}
          column_length={columns.length}
          data={data}
          searchAble={true}
          setLimit={setLimit}
        />
      )}
    </BaseWrapper>
  );
};

export default Spend;
