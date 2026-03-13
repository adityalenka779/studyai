type Props = {
  topic: string;
  explanation: string;
};

export default function ExplanationCard({ topic, explanation }: Props) {
  return (
    <div className="mt-6 w-full max-w-xl bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-blue-700 mb-2">Topic: {topic}</h2>
      <p className="text-gray-700 text-base leading-relaxed">{explanation}</p>
    </div>
  );
}