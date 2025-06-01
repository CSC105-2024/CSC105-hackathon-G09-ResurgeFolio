import React, { useState } from "react";
import { addReview } from "../api/review.api";

export const ReviewModal = ({ portfolioId, onClose, onReviewSubmitted }) => {
  const [status, setStatus] = useState("APPROVED");
  const [failureDesc, setFailureDesc] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const result = await addReview(portfolioId, status, failureDesc);
      onReviewSubmitted(portfolioId, result); // pass failureDesc back
      onClose(); // close modal
    } catch (err) {
      setError("Failed to submit review.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-2xl font-semibold mb-4">Submit Review</h2>

        <label className="block mb-2">
          <input
            type="radio"
            name="status"
            value="APPROVED"
            checked={status === "APPROVED"}
            onChange={() => setStatus("APPROVED")}
          />{" "}
          Approve
        </label>
        <label className="block mb-4">
          <input
            type="radio"
            name="status"
            value="REJECTED"
            checked={status === "REJECTED"}
            onChange={() => setStatus("REJECTED")}
          />{" "}
          Reject
        </label>

        {status === "REJECTED" && (
          <textarea
            className="w-full border p-2 rounded mb-4"
            placeholder="Describe the failure..."
            value={failureDesc}
            onChange={(e) => setFailureDesc(e.target.value)}
            rows={4}
          />
        )}

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <div className="flex justify-end gap-3">
          <button className="text-gray-500" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
