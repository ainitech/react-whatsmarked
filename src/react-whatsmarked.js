/*
MIT License

Copyright (c) 2025 Claudemir
*/

import React from "react";
import { marked } from "marked";

import "./react-whatsmarked.css";

function escapeHTML(html) {
  return html.replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char];
  });
}

class CustomRenderer extends marked.Renderer {
  heading(input) {
    return marked.parseInline(input.raw);
  }

  em(input) {
    var raw = input.raw;
    var tokens = input.tokens;
    if (raw.startsWith("*")) {
      return "<strong>" + this.parser.parseInline(tokens) + "</strong>";
    }
    return "<em>" + this.parser.parseInline(tokens) + "</em>";
  }

  strong(input) {
    var raw = input.raw;
    var tokens = input.tokens;
    var firstChar = raw.charAt(0);
    if (firstChar === "_") {
      return (
        firstChar +
        "<em>" +
        this.parser.parseInline(tokens) +
        "</em>" +
        firstChar
      );
    }
    return (
      firstChar +
      "<strong>" +
      this.parser.parseInline(tokens) +
      "</strong>" +
      firstChar
    );
  }

  codespan(input) {
    return "<code>" + escapeHTML(input.text) + "</code>";
  }

  unsupported(input) {
    console.debug(input);
    return input.raw.replace("\n", "<br>");
  }

  checkbox(input) {
    return input.checked ? "<tt>[X]</tt>" : "<tt>[ ]</tt>";
  }

  table(input) {
    return this.unsupported(input);
  }

  link(obj) {
    var href = obj.href;
    var text = obj.text;
    var raw = obj.raw;
    if (href === raw) {
      return '<a href="' + href + '" target="_blank">' + text + "</a>";
    }
    return raw.replace(/\n/g, "<br>");
  }

  html(obj) {
    return escapeHTML(obj.text);
  }

  space(input) {
    return input.raw.replace(/\n\n/g, "").replace(/\n/g, "<br>");
  }
}

// use ⣿ for gray text
var gray = {
  name: "gray",
  level: "inline",
  start: function (src) {
    return src.indexOf("⣿");
  },
  tokenizer: function (src) {
    var rule = /^⣿(?=\S)(.*\S)⣿/;
    var match = rule.exec(src);
    if (match) {
      return {
        type: "gray",
        raw: match[0],
        text: match[1].trim(),
      };
    }
  },
  renderer: function (token) {
    return (
      '<span class="graytext">' + escapeHTML(token.text) + "</span>"
    );
  },
};

var renderer = new CustomRenderer();

marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

marked.use({ extensions: [gray] });

function WhatsMarked(props) {
  var children = props.children;
  var oneline = props.oneline;
  var className = props.className;

  if (!children) return null;

  // insert blank line after blockquotes
  children = children.replace(/^(>.*)(\n(?!\n))/gm, "$1\n$2");

  var htmlContent = oneline
    ? marked.parseInline(children)
    : marked.parse(children);

  var appliedClass =
    className || oneline ? "whatsmarkedOneline" : "whatsmarked";

  return (
    <div
      className={appliedClass}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default WhatsMarked;
