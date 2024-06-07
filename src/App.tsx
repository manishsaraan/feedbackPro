import { useEffect, useState } from "react";
import Containter from "./components/Containter";
import Footer from "./components/Footer";
import HashTagList from "./components/HashTagList";
import { type IFeedbackItem } from "./lib/types";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<IFeedbackItem[]>([]);
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

  const handleAddToList = (text: string) => {
    if (text.length === 0) {
      return;
    }

    const companyNameArr = text.split(" ").filter((work) => !!work.length);
    if (companyNameArr.length === 0) {
      return;
    }

    const companyNameHashTag = companyNameArr.find((word) =>
      word?.includes("#")
    );

    if (!companyNameHashTag) {
      return;
    }

    const companyName = companyNameHashTag!.substring(1);

    const newItem: IFeedbackItem = {
      id: new Date().getTime(),
      text,
      upvoteCount: 0,
      daysAgo: 0,
      companyName: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);
  };
  useEffect(() => {
    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Containter
        errorMessage={errorMessage}
        loading={loading}
        feedbackItems={feedbackItems}
        handleAddToList={handleAddToList}
      />
      <HashTagList />
    </div>
  );
}

export default App;
