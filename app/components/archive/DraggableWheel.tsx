import { useState } from "react";

type DraggableWheelProps = {
  options: { icon: string; label: string }[];
  onChange: (selected: { icon: string; label: string }) => void;
};

export default function DraggableWheel({ options, onChange }: DraggableWheelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startY, setStartY] = useState<number | null>(null);

  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    const clientY = (event as React.MouseEvent).clientY || (event as React.TouchEvent).touches[0].clientY;
    setStartY(clientY);
  };

  const handleMouseMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (startY === null) return;
    const clientY = (event as React.MouseEvent).clientY || (event as React.TouchEvent).touches[0].clientY;

    // Determine drag direction
    const delta = clientY - startY;
    if (Math.abs(delta) > 50) {
      const newIndex =
        delta > 0
          ? (currentIndex + 1) % options.length // Dragging down moves forward
          : (currentIndex - 1 + options.length) % options.length; // Dragging up moves backward
      setCurrentIndex(newIndex);
      setStartY(clientY);
      onChange(options[newIndex]);
    }
  };

  const handleMouseUp = () => {
    setStartY(null);
  };

  return (
    <div
      className="relative w-32 h-48 overflow-hidden border rounded-lg shadow-md bg-white"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <div
        className="absolute flex flex-col items-center justify-center transition-transform duration-300"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
        }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center justify-center h-48 text-4xl ${
              index === currentIndex ? "text-black" : "text-gray-400"
            }`}
          >
            {option.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
