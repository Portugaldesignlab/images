// Vercel serverless function — proxies image requests to NVIDIA NIM.
// The API key lives in the NVIDIA_API_KEY environment variable, never in the browser.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.NVIDIA_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "Server is missing NVIDIA_API_KEY." });
  }

  try {
    const { model, ...payload } = req.body || {};
    if (!model) return res.status(400).json({ error: "Missing model." });

    const upstream = await fetch(`https://ai.api.nvidia.com/v1/genai/${model}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const text = await upstream.text();
    // Forward NVIDIA's status and body straight through so the client sees real errors.
    res.status(upstream.status);
    res.setHeader("Content-Type", "application/json");
    return res.send(text);
  } catch (err) {
    return res.status(502).json({ error: "Proxy failed: " + err.message });
  }
}
