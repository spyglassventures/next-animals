import { useState } from "react";

type ArrowControlledWheelProps = {
  options: { icon: string; label: string }[];
  onChange: (selected: { icon: string; label: string }) => void;
};

export default function ArrowControlledWheel({
  options,
  onChange,
}: ArrowControlledWheelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveUp = () => {
    const newIndex = (currentIndex - 1 + options.length) % options.length;
    console.log(`Up: ${newIndex}`);
    setCurrentIndex(newIndex);
    onChange(options[newIndex]);
  };

  const moveDown = () => {
    const newIndex = (currentIndex + 1) % options.length;
    console.log(`Down: ${newIndex}`);
    setCurrentIndex(newIndex);
    onChange(options[newIndex]);
  };

  return (
    <div className="flex flex-col items-center w-32 h-48 border rounded-lg shadow-md bg-white relative overflow-hidden">
      {/* Up Arrow */}
      <button
        onClick={moveUp}
        className="absolute top-2 bg-green-600 text-white p-3 rounded-full shadow-md hover:bg-green-700 transition z-10"
      >
        ▲
      </button>

      {/* Options */}
      <div className="flex items-center justify-center h-full">
        <div className="text-4xl text-black font-bold">
          {options[currentIndex].icon}
        </div>
      </div>

      {/* Down Arrow */}
      <button
        onClick={moveDown}
        className="absolute bottom-2 bg-green-600 text-white p-3 rounded-full shadow-md hover:bg-green-700 transition z-10"
      >
        ▼
      </button>
    </div>
  );
}
