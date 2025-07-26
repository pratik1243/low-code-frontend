import axios from "axios";

export const commonPostApiFunction = async (request) => {
  try {
    const urlKey = request?.key;
    const response = await axios.post(`/api/post?id=${urlKey}`, request);
    return response;
  } catch (error) {
    return error;
  }
};
