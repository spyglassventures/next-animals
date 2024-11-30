"use client";

import { useState } from "react";
import { wheelOptions } from "./data/optionsData";
import ArrowControlledWheel from "./components/ArrowControlledWheel";
import ResultBox from "./components/ResultBox";
import "./globals.css"; // Adjust path if needed

export default function Home() {
  const [result1, setResult1] = useState({ icon: "", label: "" });
  const [result2, setResult2] = useState({ icon: "", label: "" });
  const [result3, setResult3] = useState({ icon: "", label: "" });

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);

    const combinedPrompt = `Create a image of an single  animal that is the combination of a  ${result1.label || "Animal"}, ${result2.label || "Dinosaur"}, and ${result3.label || "Creature"}.  No lengend, just the image. It is for kids.`;

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: combinedPrompt }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      } else {
        const errorText = await response.text();
        console.error("Error generating image:", errorText);
        setError("Failed to generate image. Check console for details.");
      }
    } catch (error) {
      console.error("Error accessing API:", error);
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (imageUrl) {
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = "magic_animal.png";
      a.click();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-100 p-4"
      style={{ maxWidth: "390px", height: "844px" }}
    >
      <h1 className="text-2xl font-bold mb-6 text-black text-center pt-3">
        Magic Animal Creator
      </h1>

      {/* Wheels Section */}
      <div className="flex flex-row gap-4 mb-6">
        <ArrowControlledWheel options={wheelOptions.animals} onChange={setResult1} />
        <ArrowControlledWheel options={wheelOptions.dinosaurs} onChange={setResult2} />
        <ArrowControlledWheel options={wheelOptions.creatures} onChange={setResult3} />
      </div>

      {/* Result Box */}
      <ResultBox
        result={`${result1.label || "Animal"} + ${result2.label || "Dinosaur"} + ${
          result3.label || "Creature"
        }`}
      />

      {/* Generate Image Button */}
      <button
        onClick={generateImage}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "⚙️ Generating..." : "🪄 Generate Image ✨"}
      </button>

      {/* Display the Image and Download Button */}
      {imageUrl && (
        <div className="mt-6 flex flex-col items-center">
          <img
            src={imageUrl}
            alt="Generated Art"
            className="w-full max-w-md rounded-lg shadow-lg mb-4"
          />
          <button
            onClick={downloadImage}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            📥 Download Image
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-4 text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
