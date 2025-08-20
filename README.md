# LeetCode Complexity Analyzer (LLM-Powered Chrome Extension)

Leverage the power of advanced AI to **instantly analyze the time and space complexity** of your code solutions on LeetCode — absolutely free. This Chrome extension provides a comprehensive, language-agnostic algorithm complexity analyzer that works seamlessly across **all programming languages** supported by LeetCode and for **every problem** on the platform.

---

## Features

- **Universal Language Support:** Analyze code complexity for every LeetCode programming language including Java, Python, C++, JavaScript, and more.  
- **Complete Problem Coverage:** Works across **all LeetCode problems**, from easy to hard.  
- **Instant Complexity Feedback:** Displays precise time and space complexity results with clear, concise explanations beside your code editor.  
- **Powered by Large Language Models:** Supports integration with local open-source models (via LM Studio) or cloud APIs (OpenAI, Hugging Face) for deep semantic analysis.  
- **Flexible Backend:** Choose to run locally on your machine for zero cost or take advantage of cloud APIs for ease of use.  
- **Free & Open Source:** Democratizing high-quality complexity analysis without premium fees or restrictive licenses.  
- **Seamless Integration:** Adds a user-friendly “Check Complexity (LLM)” button directly on LeetCode problem pages.

---

## Installation

### Chrome Extension

1. Clone or download this repository.  
2. Open Chrome and navigate to `chrome://extensions/`.  
3. Enable **Developer mode** in the top right corner.  
4. Click **Load unpacked** and select the folder containing this extension.  
5. The extension icon and "Check Complexity (LLM)" button will appear on applicable LeetCode pages.

### Backend Setup

#### Local (LM Studio)

- Download and install [LM Studio](https://lmstudio.ai).  
- Download the recommended model (e.g., `qwen2.5-coder-3b-instruct`).  
- Enable **CORS** in LM Studio settings.  
- Ensure LM Studio is running on `http://127.0.0.1:1234`.  
- Your extension will connect to this local server for complexity analysis.

#### Cloud (Optional)

- Sign up for OpenAI or Hugging Face API.  
- Insert your API key in `background.js`.  
- Update backend endpoint URLs accordingly.  
- No local model installation needed.

---

## Usage

- Open any LeetCode problem page.  
- Write or paste your solution code in the editor.  
- Click the floating **Check Complexity (LLM)** button at the top right.  
- View the returned time complexity, space complexity, and the reasoning right beside your code.

---

## Contributing

Contributions are welcome!  
Feel free to open issues or pull requests for bug fixes, new features, or improvements.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- Powered by open-source large language models and LM Studio.  
- Inspired by the need for accessible and explainable algorithm complexity analysis for developers worldwide.

---

## Contact

For questions or feedback, please open an issue or contact me via GitHub.
