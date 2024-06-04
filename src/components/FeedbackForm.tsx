import { useState } from "react";
import { MAX_CHARACTERS } from "../constants";
type Props = {};

export default function FeedbackForm({}: Props) {
  const [text, setText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(newText);
  };

  const charCount = MAX_CHARACTERS - text.length;
  return (
    <form className="form">
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
