import { Axios } from "../utils/axiosInstance";

export const addReview = async (portfolioId, status, failureDesc) => {
  try {
    const res = await Axios.post("/review", {
      portfolioId,
      status,
      failureDesc,
    });
    return res.data.review.failureDesc; // fix here
  } catch (error) {
    console.error("Add review error:", error);
    throw error;
  }
};
