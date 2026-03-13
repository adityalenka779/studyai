type Props = {
  topic: string;
  setTopic: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

export default function TopicInput({ topic, setTopic, onSubmit, loading }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      <input
        type="text"
        placeholder="Enter a study topic e.g. Photosynthesis"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full bg-white"
      />
      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
      >
        {loading ? "Generating explanation..." : "Explain Topic"}
      </button>
    </div>
  );
}