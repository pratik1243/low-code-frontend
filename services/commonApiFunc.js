import axios from "axios";

export const commonPostApiFunction = async (request, token = null) => {
  try {
    const urlKey = request?.key;
    const isFormData = request?.payload instanceof FormData;
    const response = await axios.post(`/api/post?id=${urlKey}`, isFormData ? request?.payload : request,
      {
        headers: {
          "Content-Type": isFormData ? "multipart/form-data" : "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
