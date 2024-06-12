import FeedbackItem from "./FeedbackItem";
import { type IFeedbackItem } from "../../lib/types";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../hooks/useFeedbackItemsContext";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackList() {
  // const ctx = useFeedbackItemsContext();

  const loading = useFeedbackItemsStore((state) => state.loading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  const feedbackItems = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbackItems()
  );

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
