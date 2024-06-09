type Props = {
  company: string;
  onClick: (company: string) => void;
};

export default function HashTagItem({ company, onClick }: Props) {
  return (
    <li key={company}>
      <button onClick={() => onClick(company)}>#{company}</button>
    </li>
  );
}
