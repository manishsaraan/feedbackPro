import FeedbackItem from "./FeedbackItem";
import { type IFeedbackItem } from "../../lib/types";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../hooks/useFeedbackItemsContext";

export default function FeedbackList() {
  const ctx = useFeedbackItemsContext();

  console.log(ctx);
  return (
    <ol className="feedback-list">
      {ctx.loading && <Spinner />}
      {!!ctx.errorMessage && <ErrorMessage message={ctx.errorMessage} />}
      {ctx.feedbackItems.map((feedback: IFeedbackItem) => (
        <FeedbackItem key={feedback.id} feedbackItem={feedback} />
      ))}
    </ol>
  );
}
