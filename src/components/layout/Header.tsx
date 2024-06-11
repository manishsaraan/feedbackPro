import Pattern from "../Pattern";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import FeedbackForm from "../feedback/FeedbackForm";
import { useFeedbackItemsContext } from "../hooks/useFeedbackItemsContext";

export default function Header() {
  const ctx = useFeedbackItemsContext();
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={ctx.handleAddToList} />
    </header>
  );
}
