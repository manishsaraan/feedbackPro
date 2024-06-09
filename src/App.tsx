import { useEffect, useMemo, useState } from "react";
import Containter from "./components/layout/Containter";
import Footer from "./components/layout/Footer";
import HashTagList from "./components/hashtag/HashTagList";
import { type IFeedbackItem } from "./lib/types";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<IFeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((feedback: IFeedbackItem) => feedback.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedbackItems]
  );

  const filteredItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedback: IFeedbackItem) => feedback.company === selectedCompany
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  );

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

  const saveItem = async (newItem: IFeedbackItem) => {
    try {
      const res = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = res.json();

      console.log(data, "data");
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleAddToList = async (text: string) => {
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
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);
    await saveItem(newItem);
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
        feedbackItems={filteredItems}
        handleAddToList={handleAddToList}
      />
      <HashTagList
        setSelectedCompany={setSelectedCompany}
        companyList={companyList}
      />
    </div>
  );
}

export default App;
