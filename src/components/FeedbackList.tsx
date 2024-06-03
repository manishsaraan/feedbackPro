import { TriangleUpIcon } from "@radix-ui/react-icons";

type Props = {};

export default function FeedbackList({}: Props) {
  return (
    <ol className="feedback-list">
      <li className="feedback">
        <button>
          <TriangleUpIcon />
          <span>539</span>
        </button>
        <div>
          <p>B</p>
        </div>

        <div>
          <p>Faceboo</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            doloribus necessitatibus modi consectetur ut dolore.
          </p>
        </div>

        <p>4d</p>
      </li>
    </ol>
  );
}
