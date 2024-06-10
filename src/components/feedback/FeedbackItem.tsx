import { useState } from "react";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { type IFeedbackItem } from "../../lib/types";

type Props = {
  feedbackItem: IFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: Props) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // stop bubbling
    e.currentTarget.disabled = true; //disable the clicked button only
    setUpvoteCount((prev) => prev + 1);
  };
  return (
    <li
      onClick={() => setOpen((prev) => !prev)}
      className={`feedback ${open ? "feedback--expand" : ""}`}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
