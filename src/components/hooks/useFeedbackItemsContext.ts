import { useContext } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";

export function useFeedbackItemsContext() {
  const ctx = useContext(FeedbackItemsContext);

  if (!ctx) {
    throw new Error("No Feedback Items Context found");
  }

  return ctx;
}
