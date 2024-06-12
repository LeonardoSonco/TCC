import axios from "axios";

export const getProcessingParametersToId = async (processingId: string) => {
    try {
      const response = await axios.get(`/api/processing/${processingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userId")}`,
        },
      });
      return response.data.processing.params;
    } catch (error) {
      console.error("Failed to process parameters:", error);
    }
  };