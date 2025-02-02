# Markdown LiveEditor

Markdown LiveEditor is a **real-time Markdown editor** with a **live preview**. It provides a seamless way to write and visualize Markdown content instantly.

---

## 🚀 Features

✅ **Live Markdown preview** as you type\
✅ **Custom toolbar** with formatting buttons\ 
✅ **Dark theme with modern UI**\
✅ **Resizable editor & preview pane**\
✅ **Supports GitHub Flavored Markdown (GFM)**\
✅ **Keyboard shortcuts for Markdown elements**\
✅ **Automatic scrolling sync between editor and preview**

## ScreenShot : 
<img src="https://raw.githubusercontent.com/Taks-69/Markdown-LiveEditor/main/image.svg" width="900">

---

## 📥 Installation

### **Prerequisites**

- **A modern web browser (Chrome, Firefox, Edge, etc.)**

### **Clone the Repository**

```bash
git clone https://github.com/Taks-69/Markdown-LiveEditor.git
cd Markdown-LiveEditor
```

---

## 🛠 Usage

### **1️⃣ Open the Editor**

Simply open the `index.html` file in a web browser:

```bash
open index.html
```

or, if you have Python installed, you can run a local server:

```bash
python -m http.server
```

Then visit `http://localhost:8000` in your browser.

---

## 🎨 Interface Overview

### **📝 Editor**

- Write Markdown in the left panel.
- Formatting buttons allow quick insertion of Markdown syntax.

### **👀 Live Preview**

- The right panel renders the Markdown output in real time.
- Scroll synchronization ensures a smooth editing experience.

### **⚙️ Toolbar Functions**

| Button     | Function                        |
| ---------- | ------------------------------- |
| **B**      | Bold (`**bold**`)               |
| *I*        | Italic (`*italic*`)             |
| H1         | Heading (`# Heading`)           |
| `</>`      | Inline Code (`\`code\`\`)       |
| Code Block | Multi-line Code Block (` ``` `) |
| 🔗 Link    | Insert `[text](url)`            |
| 🖼 Image   | Insert `![alt text](image_url)` |
| 📑 UL      | Unordered List (`- item`)       |
| 🔢 OL      | Ordered List (`1. item`)        |
| 💬 Quote   | Blockquote (`> quote`)          |

---

## 🔐 Security Considerations

🔹 Uses **Marked.js** with **GitHub Flavored Markdown (GFM)** for rendering.\
🔹 Sanitization prevents XSS vulnerabilities.\
🔹 No external dependencies required beyond the CDN.

---

## 🛠 Future Improvements

- 💡 **Custom themes & light mode**
- 💡 **Drag & Drop file support**
- 💡 **Save markdown files**
- 💡 **Load multiple markdown files simultaneously**
- 
---

## 📜 Disclaimer

> This project is for **educational purposes only**. The author is **not responsible** for any misuse.

---

## 📚 License

This project is licensed under the GNU General Public License v3.0.

---

🔥 **Feel free to star ⭐ the repository if you find this project useful!** 🚀
