import { TriangleUpIcon } from "@radix-ui/react-icons";
import { type IFeedbackItem } from "../lib/types";
type Props = {
  feedbackItem: IFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: Props) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{feedbackItem.upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.companyName}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo}d</p>
    </li>
  );
}
