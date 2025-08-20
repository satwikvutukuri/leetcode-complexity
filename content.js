(function injectButton() {
  if (document.getElementById("lc-llm-analyze-btn")) return;

  const btn = document.createElement("button");
  btn.id = "lc-llm-analyze-btn";
  btn.textContent = "Check Complexity (LLM)";
  Object.assign(btn.style, {
    position: "fixed", top: "12px", right: "12px",
    padding: "8px 12px", borderRadius: "8px",
    background: "#222", color: "#fff", border: "none",
    zIndex: "999999", cursor: "pointer", fontFamily: "Inter, sans-serif"
  });

  const status = document.createElement("div");
  status.id = "lc-llm-status";
  Object.assign(status.style, {
    position: "fixed", top: "52px", right: "12px",
    padding: "10px 12px", borderRadius: "10px",
    background: "#111", color: "#fff", zIndex: "999999",
    maxWidth: "380px", fontSize: "12px", lineHeight: "1.4",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)", display: "none", whiteSpace: "pre-wrap"
  });

  function showStatus(msg) { 
    status.style.display = "block"; 
    status.textContent = msg; 
  }

  btn.onclick = async () => {
    showStatus("Reading code from editor…");

    // Try to read Monaco editor content
    let code = "";
    const monacoView = document.querySelector(".view-lines");
    if (monacoView) {
      code = Array.from(monacoView.querySelectorAll(".view-line"))
        .map(l => l.innerText).join("\n");
    }

    // Fallback: try clipboard
    if (!code || code.trim().length < 3) {
      try { code = await navigator.clipboard.readText(); } catch (e) {}
    }

    if (!code || code.trim().length < 3) {
      showStatus("Could not read code. Tip: Click in editor, press Ctrl+A then Ctrl+C, then try again.");
      return;
    }

    showStatus("Analyzing with local LLM…");
    chrome.runtime.sendMessage({ action: "analyze", code }, (resp) => {
      if (!resp) { showStatus("No response. Is the local LLM server running?"); return; }
      if (resp.error) { showStatus("Error: " + resp.error); return; }
      showStatus(
        `Time: ${resp.time_complexity}\nSpace: ${resp.space_complexity}\n\nWhy: ${resp.reasoning}`
      );
    });
  };

  document.body.appendChild(btn);
  document.body.appendChild(status);
})();