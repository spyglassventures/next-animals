import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in the .env.local file
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ message: "Invalid or missing prompt" });
    }

    // Generate an image using OpenAI's API
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;

    // Fetch the image data from the URL
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set headers to serve the image as a PNG
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", `inline; filename="image.png"`);

    // Send the image buffer as the response
    res.status(200).send(buffer);
  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
    res.status(500).json({ message: "Error generating image", error: error.response?.data });
  }
}
