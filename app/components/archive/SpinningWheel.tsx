import { useState } from "react";

type SpinningWheelProps = {
  options: { icon: string; label: string }[];
  onChange: (selected: { icon: string; label: string }) => void;
};

export default function SpinningWheel({ options, onChange }: SpinningWheelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return; // Prevent multiple spins
    setIsSpinning(true);

    const totalSpins = Math.floor(Math.random() * 10) + 10; // Random number of spins
    let finalIndex = currentIndex;

    for (let i = 0; i <= totalSpins; i++) {
      setTimeout(() => {
        finalIndex = (finalIndex + 1) % options.length;
        setCurrentIndex(finalIndex);

        if (i === totalSpins) {
          setIsSpinning(false);
          onChange(options[finalIndex]);
        }
      }, i * 100); // Adjust speed as needed
    }
  };

  return (
    <div
      onClick={spinWheel}
      className="relative w-32 h-48 overflow-hidden border rounded-lg shadow-md bg-white cursor-pointer"
    >
      <div
        className="absolute flex flex-col items-center justify-center transition-transform"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
          transition: isSpinning ? "transform 0.1s linear" : "",
        }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-48 text-4xl"
          >
            {option.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
