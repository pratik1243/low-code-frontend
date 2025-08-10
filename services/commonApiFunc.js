import axios from "axios";

export const commonPostApiFunction = async (request) => {
  try {
    const urlKey = request?.key;
    const isFormData = request?.payload instanceof FormData;
    const response = await axios.post(`/api/post?id=${urlKey}`, isFormData ? request?.payload : request);
    return response;
  } catch (error) {
    return error;
  }
};
