import React from "react";

/**
 * Highlights text based on bracket patterns:
 * - Double asterisks **text** -> <span className="text-xl text-destacado">text</span>
 * - Single brackets {text} -> <span className="font-bold">text</span>
 * - Double brackets {{text}} -> <span className="font-bold underline-z">text</span>
 */
export function textHighlighter(text: string): React.ReactNode {
  if (!text) return text;

  // Handle both literal \n and escaped \\n characters
  let processedText = text;

  // First, convert escaped newlines \\n to literal newlines \n
  processedText = processedText.replace(/\\n/g, "\n");

  // Split text by newlines to handle line breaks
  const lines = processedText.split("\n");

  // Process each line and combine with line breaks
  const processedLines: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines but still add line break
    if (line === "") {
      if (i < lines.length - 1) {
        // Don't add line break after the last line
        processedLines.push(React.createElement("br", { key: `br-${i}` }));
      }
      continue;
    }

    // Process the line for highlighting patterns
    // First, handle double asterisks **text** -> text-xl text-destacado
    let processedLine = line.replace(
      /\*\*([^*]+)\*\*/g,
      '<span className="text-4xl text-destacado">$1</span>'
    );

    // Then, handle double brackets {{text}} -> font-bold underline
    processedLine = processedLine.replace(
      /\{\{([^}]+)\}\}/g,
      '<span className="font-bold underline decoration-destacado">$1</span>'
    );

    // Finally, handle single brackets {text} -> font-bold
    processedLine = processedLine.replace(
      /\{([^}]+)\}/g,
      '<span className="font-bold">$1</span>'
    );

    // Parse the HTML-like string and convert to React elements
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;

    // Find all span tags
    const spanRegex = /<span className="([^"]+)">([^<]+)<\/span>/g;
    let match;

    while ((match = spanRegex.exec(processedLine)) !== null) {
      // Add text before the span
      if (match.index > currentIndex) {
        parts.push(processedLine.slice(currentIndex, match.index));
      }

      // Add the span element
      const className = match[1];
      const content = match[2];
      parts.push(
        React.createElement(
          "span",
          { className, key: `${i}-${currentIndex}` },
          content
        )
      );

      currentIndex = match.index + match[0].length;
    }

    // Add remaining text after the last span
    if (currentIndex < processedLine.length) {
      parts.push(processedLine.slice(currentIndex));
    }

    // If no spans were found, return the original line
    if (parts.length === 0) {
      parts.push(line);
    }

    // Add the processed line
    processedLines.push(
      React.createElement(React.Fragment, { key: `line-${i}` }, ...parts)
    );

    // Add line break after each line except the last one
    if (i < lines.length - 1) {
      processedLines.push(React.createElement("br", { key: `br-${i}` }));
    }
  }

  return processedLines;
}
