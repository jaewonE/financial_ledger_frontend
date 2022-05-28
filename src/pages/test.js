import React, { useEffect, useState } from 'react';
import { sendPost, sendQuery } from '../mysql';

const Test = ({ userObj, jwt }) => {
  const [loading, setLoading] = useState(true);
  const onClickQuery = async () => {
    console.log('sendQuery');
    const result = await sendQuery('asd');
    console.log(result);
  };
  const onClickPost = async () => {
    console.log('sendPost');
    const result = await sendPost('http://localhost:4000/auth/login', {
      email: 'helloSQL@email.com',
      password: '12345',
    });
    console.log(result);
  };

  return (
    <div>
      <input
        className="w-20 h-20 z-10 bg-slate-300 m-5"
        value="query"
        type="button"
        onClick={onClickQuery}
      />
      <input
        className="w-20 h-20 z-10 bg-slate-300 m-5"
        value="post"
        type="button"
        onClick={onClickPost}
      />
      <span>{loading ? 'loading...' : 'Done!'}</span>
    </div>
  );
};

export default Test;
