import { useState } from "react";
import { MAX_CHARACTERS } from "../../constants";
type Props = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: Props) {
  const [text, setText] = useState<string>("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInValidIndicator, setShowInValidIndicator] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(newText);
  };

  const resetIndicators = () => {
    setShowValidIndicator(false);
    setShowInValidIndicator(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.includes("#") && text.length > 5) {
      setShowValidIndicator(true);
      setShowInValidIndicator(false);
      setTimeout(resetIndicators, 2000);
    } else {
      setShowValidIndicator(false);
      setShowInValidIndicator(true);
      setTimeout(resetIndicators, 2000);
      return;
    }

    setText("");
    onAddToList(text);
  };

  const charCount = MAX_CHARACTERS - text.length;

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInValidIndicator ? "form--invalid" : ""
      }`}
    >
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        spellCheck={false}
        maxLength={MAX_CHARACTERS}
        placeholder="Enter your feedback here. Remember to #hastag the company"
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here. Remember to #hastag the company
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>Submit</button>
      </div>
    </form>
  );
}
