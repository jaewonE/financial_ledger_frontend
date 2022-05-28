import axios from 'axios';

export const sendQuery = async (query) => {
  try {
    const {
      status,
      data: { err, data },
    } = await axios.get(query);
    return err ? { status, data: null, err } : { status, data, err: null };
  } catch (err) {
    console.error({ status: 404, data: null, err });
    return { status: 404, data: null, err };
  }
};

export const sendPost = async (post, postData) => {
  try {
    const {
      status,
      data: { err, data },
    } = await axios.post(post, postData);
    return err ? { status, data: null, err } : { status, data, err: null };
  } catch (err) {
    console.error({ status: 404, data: null, err });
    return { status: 404, data: null, err };
  }
};
