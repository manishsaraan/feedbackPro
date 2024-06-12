import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import HashTagItem from "./HashTagItem";

export default function HashTagList() {
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList());
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

  return (
    <ul className="hashtags">
      {companyList.map((company: string) => (
        <HashTagItem onClick={selectCompany} key={company} company={company} />
      ))}
    </ul>
  );
}
