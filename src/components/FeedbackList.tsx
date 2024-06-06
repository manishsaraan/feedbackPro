import { useEffect, useState } from "react";
import FeedbackItem, { type IFeedbackItem } from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

type Props = {};

export default function FeedbackList({}: Props) {
  const [feedbackItems, setFeedbackItems] = useState([]);
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
  return (
    <ol className="feedback-list">
      {loading && <Spinner />}
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((feedback: IFeedbackItem) => (
        <FeedbackItem key={feedback.id} feedbackItem={feedback} />
      ))}
    </ol>
  );
}
