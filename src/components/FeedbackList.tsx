import { useEffect, useState } from "react";
import FeedbackItem, { type IFeedbackItem } from "./FeedbackItem";
import Spinner from "./Spinner";

type Props = {};

export default function FeedbackList({}: Props) {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setFeedbackItems(data.feedbacks);
      });
  }, []);
  return (
    <ol className="feedback-list">
      {loading ? <Spinner /> : null}
      {feedbackItems.map((feedback: IFeedbackItem) => (
        <FeedbackItem key={feedback.id} feedbackItem={feedback} />
      ))}
    </ol>
  );
}
