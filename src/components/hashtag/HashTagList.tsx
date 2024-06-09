import HashTagItem from "./HashTagItem";

type Props = {
  companyList: string[];
  setSelectedCompany: (company: string) => void;
};

export default function HashTagList({
  companyList,
  setSelectedCompany,
}: Props) {
  return (
    <ul className="hashtags">
      {companyList.map((company: string) => (
        <HashTagItem
          onClick={setSelectedCompany}
          key={company}
          company={company}
        />
      ))}
    </ul>
  );
}
