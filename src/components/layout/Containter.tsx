import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";
import { type IFeedbackItem } from "../../lib/types";

type Props = {
  feedbackItems: IFeedbackItem[];
  loading: boolean;
  errorMessage: string;
  handleAddToList: (text: string) => void;
};

export default function Containter() {
  return (
    <main className="container">
      <Header />
      <FeedbackList
      // errorMessage={errorMessage}
      // loading={loading}
      // feedbackItems={feedbackItems}
      />
    </main>
  );
}
