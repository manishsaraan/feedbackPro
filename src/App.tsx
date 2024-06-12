import Containter from "./components/layout/Containter";
import Footer from "./components/layout/Footer";
import HashTagList from "./components/hashtag/HashTagList";
import { useEffect } from "react";
import { useFeedbackItemsStore } from "./stores/feedbackItemsStore";

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems
  );

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />
      <Containter />
      <HashTagList />
    </div>
  );
}

export default App;
