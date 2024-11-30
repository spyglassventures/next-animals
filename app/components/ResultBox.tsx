type ResultBoxProps = {
  result: string;
};

export default function ResultBox({ result }: ResultBoxProps) {
  return (
    <div className="mt-6 p-6 border-4 border-green-600 rounded-lg bg-green-200 shadow-lg w-80 text-center relative">
      {/* Dinosaur Icon */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-2xl shadow-md border-2 border-green-600">
          🦖
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-extrabold text-green-900 mb-4">Your Selection:</h2>

      {/* Result Text */}
      <p className="text-green-800 text-l font-semibold">{result}</p>
    </div>
  );
}
