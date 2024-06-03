import Pattern from "./Pattern";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import FeedbackForm from "./FeedbackForm";

type Props = {};

export default function Header({}: Props) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm />
    </header>
  );
}
