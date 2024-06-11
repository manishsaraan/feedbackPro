import Containter from "./components/layout/Containter";
import Footer from "./components/layout/Footer";
import HashTagList from "./components/hashtag/HashTagList";
import FeedbackItemsContextProvider from "./components/contexts/FeedbackItemsContextProvider";

function App() {
  return (
    <div className="app">
      <Footer />
      <FeedbackItemsContextProvider>
        <Containter />
        <HashTagList />
      </FeedbackItemsContextProvider>
    </div>
  );
}

export default App;
