import { create } from "zustand";
import { IFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: IFeedbackItem[];
  loading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => IFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
  saveItem: (newItem: IFeedbackItem) => Promise<void>;
};
export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  loading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((feedback: IFeedbackItem) => feedback.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },
  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedback: IFeedbackItem) =>
            feedback.company === state.selectedCompany
        )
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
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

    set((state) => ({ feedbackItems: [...state.feedbackItems, newItem] }));
    // setFeedbackItems([...feedbackItems, newItem]);
    await get().saveItem(newItem);
  },
  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company,
    }));
  },
  fetchFeedbackItems: async () => {
    // setLoading(true);
    set(() => ({ loading: true }));
    try {
      const res = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      set(() => ({
        loading: false,
        feedbackItems: data.feedbacks,
        errorMessage: "",
      }));
      //   setLoading(false);
      //   setFeedbackItems(data.feedbacks);
      //   setErrorMessage("");
    } catch (e) {
      console.log(e);

      set(() => ({
        loading: false,
        errorMessage: "Something went wrong",
      }));
      //   setLoading(false);
      //   setErrorMessage("Something went wrong");
    }
  },
  saveItem: async (newItem: IFeedbackItem) => {
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
  },
}));
