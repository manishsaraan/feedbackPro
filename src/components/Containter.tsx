import FeedbackList from "./FeedbackList";
import Header from "./Header";

type Props = {};

export default function Containter({}: Props) {
  return (
    <main className="container">
      <Header />
      <FeedbackList />
    </main>
  );
}
