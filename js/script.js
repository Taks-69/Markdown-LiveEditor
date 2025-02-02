document.addEventListener("DOMContentLoaded", function() {
    const editor = document.getElementById("editor");
    const preview = document.getElementById("preview");
    const divider = document.getElementById("divider");
    const container = document.querySelector(".editor-container");
  
    // Configure Marked for GitHub Flavored Markdown and line breaks
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
  
    // Update live preview and auto-scroll to the bottom if needed
    function updatePreview() {
      preview.innerHTML = marked.parse(editor.value);
      if (preview.scrollHeight > preview.clientHeight) {
        preview.scrollTop = preview.scrollHeight;
      }
    }
    updatePreview();
    editor.addEventListener("input", updatePreview);
  
    // Toolbar button events
    document.getElementById("bold-btn").addEventListener("click", function() {
      wrapSelection("**");
    });
    document.getElementById("italic-btn").addEventListener("click", function() {
      wrapSelection("*");
    });
    document.getElementById("header-btn").addEventListener("click", function() {
      insertAtLineStart("# ");
    });
    document.getElementById("hr-btn").addEventListener("click", function() {
      insertAtCursor("\n---\n");
    });
  
    // Additional toolbar buttons
    document.getElementById("code-btn").addEventListener("click", function() {
      wrapSelection("`");
    });
    document.getElementById("code-block-btn").addEventListener("click", function() {
      wrapSelectionBlock("```");
    });
    document.getElementById("link-btn").addEventListener("click", function() {
      addLink();
    });
    document.getElementById("image-btn").addEventListener("click", function() {
      addImage();
    });
    document.getElementById("ul-btn").addEventListener("click", function() {
      addList("- ");
    });
    document.getElementById("ol-btn").addEventListener("click", function() {
      addList("1. ");
    });
    document.getElementById("quote-btn").addEventListener("click", function() {
      addList("> ");
    });
  
    // Function to wrap the selected text with a given wrapper
    function wrapSelection(wrapper) {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const selectedText = editor.value.substring(start, end);
      const newText = wrapper + selectedText + wrapper;
      replaceSelection(newText);
    }
  
    // Function to wrap the selected text as a block with a given wrapper
    function wrapSelectionBlock(wrapper) {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const selectedText = editor.value.substring(start, end);
      let newText;
      if (selectedText) {
        newText = "\n" + wrapper + "\n" + selectedText + "\n" + wrapper + "\n";
      } else {
        newText = "\n" + wrapper + "\n\n" + wrapper + "\n";
      }
      replaceSelection(newText);
    }
  
    // Insert text at the beginning of the current line
    function insertAtLineStart(text) {
      const start = editor.selectionStart;
      const before = editor.value.lastIndexOf("\n", start - 1) + 1;
      editor.value = editor.value.slice(0, before) + text + editor.value.slice(before);
      updatePreview();
    }
  
    // Insert text at the current cursor position
    function insertAtCursor(text) {
      replaceSelection(text);
    }
  
    // Replace the currently selected text with new text
    function replaceSelection(text) {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.value = editor.value.substring(0, start) + text + editor.value.substring(end);
      editor.focus();
      editor.selectionStart = editor.selectionEnd = start + text.length;
      updatePreview();
    }
  
    // Add a prefix to each line of the selection (for lists or quotes)
    function addList(prefix) {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      let selectedText = editor.value.substring(start, end);
      let lines = selectedText.split("\n");
      for (let i = 0; i < lines.length; i++) {
        lines[i] = prefix + lines[i];
      }
      const newText = lines.join("\n");
      replaceSelection(newText);
    }
  
    // Prompt user to add a link and format the selected text as a Markdown link
    function addLink() {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const selectedText = editor.value.substring(start, end) || "text";
      const url = prompt("Enter the URL:");
      if (url) {
        const markdownLink = `[${selectedText}](${url})`;
        replaceSelection(markdownLink);
      }
    }
  
    // Prompt user to add an image and insert a Markdown image
    function addImage() {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const altText = editor.value.substring(start, end) || "description";
      const url = prompt("Enter the image URL:");
      if (url) {
        const markdownImage = `![${altText}](${url})`;
        replaceSelection(markdownImage);
      }
    }
  
    // Intelligent paste event to transform selected text into a link if a valid URL is pasted
    editor.addEventListener("paste", function(e) {
      const clipboardData = e.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('Text').trim();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      if (start !== end && isValidUrl(pastedData)) {
        e.preventDefault();
        const selectedText = editor.value.substring(start, end);
        const markdownLink = `[${selectedText}](${pastedData})`;
        replaceSelection(markdownLink);
      }
    });
  
    // Check if a string is a valid URL
    function isValidUrl(str) {
      try {
        new URL(str);
        return true;
      } catch (_) {
        return false;
      }
    }
  
    // Resizable panels via the vertical divider
    divider.addEventListener("mousedown", function(e) {
      e.preventDefault();
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  
    function onMouseMove(e) {
      const containerRect = container.getBoundingClientRect();
      let newWidth = e.clientX - containerRect.left;
      const minWidth = 100; // minimum width for the editor
      const maxWidth = containerRect.width - 100; // minimum width for the preview
      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;
      editor.style.width = newWidth + "px";
      preview.style.width = (containerRect.width - newWidth - divider.offsetWidth) + "px";
    }
  
    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  
    // Handle Ctrl+Z and Ctrl+Y shortcuts to update preview after undo/redo actions
    editor.addEventListener("keydown", function(e) {
      if (e.ctrlKey && (e.key.toLowerCase() === "z" || e.key.toLowerCase() === "y")) {
        // Allow the browser to process the undo/redo before updating the preview
        setTimeout(updatePreview, 0);
      }
    });
    
  });
  