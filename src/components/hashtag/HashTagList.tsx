import { useFeedbackItemsContext } from "../hooks/useFeedbackItemsContext";
import HashTagItem from "./HashTagItem";

export default function HashTagList() {
  const ctx = useFeedbackItemsContext();

  return (
    <ul className="hashtags">
      {ctx.companyList.map((company: string) => (
        <HashTagItem
          onClick={ctx.setSelectedCompany}
          key={company}
          company={company}
        />
      ))}
    </ul>
  );
}
