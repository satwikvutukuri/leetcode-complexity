// IMPORTANT: Replace with the exact model name shown in LM Studio’s server panel
const MODEL_NAME = "qwen2.5-coder-3b-instruct";  // example
const ENDPOINT = "http://127.0.0.1:1234/v1/chat/completions";  // corrected endpoint URL

function buildPrompt(code) {
  return `You are a senior algorithms tutor.
Analyze the following code and return STRICT JSON ONLY with keys:
- time_complexity: Big-O like O(n), O(n log n), etc.
- space_complexity: Big-O
- reasoning: ONE concise sentence.

Code:
<CODE>
${code}
</CODE>

Respond as:
{"time_complexity":"...","space_complexity":"...","reasoning":"..."}`;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action !== "analyze") return;

  (async () => {
    try {
      const body = {
        model: MODEL_NAME,
        messages: [
          { role: "system", content: "You analyze algorithmic complexity and reply with strict JSON only." },
          { role: "user", content: buildPrompt(msg.code) }
        ],
        temperature: 0
      };

      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await r.json();

      // LM Studio returns {choices:[{message:{content:"..."}}]}
      const raw = data?.choices?.[0]?.message?.content || "{}";

      // Debug raw output
      console.log("Raw LLM Output:", raw);

      let parsed = {};
      try {
        // Extract JSON block anywhere in output
        const match = raw.match(/\{[\s\S]*?\}/);
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          parsed = JSON.parse(raw);
        }
      } catch (e) {
        console.error("Error parsing JSON:", e, "Raw output:", raw);
      }

      const resp = {
        time_complexity: parsed.time_complexity || "Unknown",
        space_complexity: parsed.space_complexity || "Unknown",
        reasoning: parsed.reasoning || "N/A"
      };
      sendResponse(resp);
    } catch (err) {
      sendResponse({ error: String(err) });
    }
  })();

  return true; // allow async sendResponse
});