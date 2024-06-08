import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";
import { type IFeedbackItem } from "../../lib/types";

type Props = {
  feedbackItems: IFeedbackItem[];
  loading: boolean;
  errorMessage: string;
  handleAddToList: (text: string) => void;
};

export default function Containter({
  feedbackItems,
  loading,
  errorMessage,
  handleAddToList,
}: Props) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        errorMessage={errorMessage}
        loading={loading}
        feedbackItems={feedbackItems}
      />
    </main>
  );
}
