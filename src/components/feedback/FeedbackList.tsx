import FeedbackItem from "./FeedbackItem";
import { type IFeedbackItem } from "../../lib/types";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

type Props = {
  feedbackItems: IFeedbackItem[];
  loading: boolean;
  errorMessage: string;
};

export default function FeedbackList({
  feedbackItems,
  loading,
  errorMessage,
}: Props) {
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
