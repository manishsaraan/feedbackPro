import React, {
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import { IFeedbackItem } from "../../lib/types";

type Props = {
  children: React.ReactNode;
};

type IFeedbackItemsContext = {
  loading: boolean;
  feedbackItems: IFeedbackItem[];
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  setSelectedCompany: (company: string) => void;
};
export const FeedbackItemsContext = createContext<IFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({ children }: Props) {
  const [feedbackItems, setFeedbackItems] = useState<IFeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedback: IFeedbackItem) => feedback.company === selectedCompany
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  );

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((feedback: IFeedbackItem) => feedback.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedbackItems]
  );

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

  useEffect(() => {
    fetchFeedbackItems();
  }, []);

  return (
    <FeedbackItemsContext.Provider
      value={{
        feedbackItems: filteredItems,
        loading,
        errorMessage,
        companyList,
        handleAddToList,
        setSelectedCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}

export function useFeedbackItemsContext() {
  const ctx = useContext(FeedbackItemsContext);

  if (!ctx) {
    throw new Error("No Feedback Items Context found");
  }

  return ctx;
}
