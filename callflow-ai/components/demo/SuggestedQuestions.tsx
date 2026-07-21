export default function SuggestedQuestions({
  questions,
  onSelect,
  disabled,
}: {
  questions: string[];
  onSelect: (q: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((q) => (
        <button
          key={q}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(q)}
          className="focus-ring rounded-full border border-border-subtle bg-surface px-3.5 py-2 text-xs text-ink-muted transition-colors hover:border-signal/40 hover:text-ink disabled:opacity-50"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
