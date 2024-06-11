import { useEffect, useState } from "react";
import { IFeedbackItem } from "../../lib/types";

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<IFeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchFeedbackItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      setLoading(false);
      setFeedbackItems(data.feedbacks);
      setErrorMessage("");
    } catch (e) {
      console.log(e);
      setLoading(false);
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    fetchFeedbackItems();
  }, []);

  return {
    loading,
    errorMessage,
    feedbackItems,
    setLoading,
    setErrorMessage,
    setFeedbackItems,
  };
}
