type Props = {};

export default function FeedbackForm({}: Props) {
  return (
    <form className="form">
      <textarea
        id="feedback-textarea"
        spellCheck={false}
        maxLength={150}
        placeholder="Enter your feedback here. Remember to #hastag the company"
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here. Remember to #hastag the company
      </label>
      <div>
        <p className="u-italic">150</p>
        <button>Submit</button>
      </div>
    </form>
  );
}
