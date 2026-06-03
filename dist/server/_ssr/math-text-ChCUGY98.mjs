import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { k as katex } from "../_libs/katex.mjs";
const CMDS = [
  "frac",
  "sqrt",
  "cap",
  "cup",
  "leq",
  "geq",
  "neq",
  "subset",
  "supset",
  "subseteq",
  "supseteq",
  "cdot",
  "times",
  "div",
  "pm",
  "mp",
  "infty",
  "rightarrow",
  "leftarrow",
  "Rightarrow",
  "Leftarrow",
  "left",
  "right",
  "alpha",
  "beta",
  "gamma",
  "delta",
  "theta",
  "lambda",
  "mu",
  "pi",
  "sigma",
  "phi",
  "omega",
  "sin",
  "cos",
  "tan",
  "log",
  "ln",
  "sum",
  "prod",
  "int",
  "lim",
  "hspace",
  "emptyset",
  "mathbb",
  "setminus",
  "varnothing",
  "le",
  "ge"
];
function cleanArtifacts(s) {
  return s.replace(/<!--.*?-->/g, " ").replace(/\[[^\]]*বো\.[^\]]*\]/g, " ").replace(/\[[^\]]*board[^\]]*\]/gi, " ").replace(/\\?hspace\{[^}]*\}/g, " ").replace(/[\r\f]/g, "").replace(/ight/g, "right").replace(/\bfracrac\b/g, "\\frac").replace(/\bfleft\b/g, "\\left").replace(/\\{2,}(frac|left|right|cup|cap|leq|geq|le|ge|setminus|phi|sqrt|times|div|infty|emptyset|varnothing|mathbb|subset|supset|subseteq|supseteq|alpha|beta|gamma|delta|theta|lambda|mu|pi|sigma|omega)/g, "\\$1").replace(new RegExp("(?<![\\\\])left\\(", "g"), "\\left(").replace(new RegExp("(?<![\\\\])right\\)", "g"), "\\right)").replace(/\s+/g, " ").trim();
}
function normalizeMath(s) {
  let t = cleanArtifacts(s).replace(/\f/g, "\\frac").replace(/\t/g, "\\times").replace(/\\hspace\{[^}]*\}/g, " ");
  for (const c of CMDS) {
    t = t.replace(new RegExp(`(?<![\\\\A-Za-z])${c}\\b`, "g"), `\\${c}`);
  }
  t = t.replace(new RegExp("(?<![\\\\A-Za-z])in(?=\\s*[A-Za-z\\\\{(])", "g"), "\\in");
  t = t.replace(new RegExp("(?<![A-Za-z}\\\\])\\{([^{}\\\\]*)\\}", "g"), (_m, inner) => `\\{${inner}\\}`);
  return t;
}
function renderMath(src) {
  const normalized = normalizeMath(src);
  try {
    const html = katex.renderToString(normalized, { throwOnError: true, output: "html" });
    return { html, ok: true };
  } catch {
    return { html: "", ok: false };
  }
}
function cleanPlain(s) {
  return cleanArtifacts(s).replace(/[\s\\&]+$/g, "").replace(/\$\{([^{}]+)\}\$/g, "$\\{$1\\}$");
}
function MathText({ children, className }) {
  const raw = cleanPlain(children ?? "");
  if (!raw) return null;
  if (!raw.includes("$")) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, children: raw });
  const parts = [];
  const regex = /(\$\$[^$]+\$\$|\$[^$\n]+\$)/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: raw.slice(lastIndex, match.index) }, key++));
    }
    const token = match[0];
    const inner = token.startsWith("$$") ? token.slice(2, -2).trim() : token.slice(1, -1).trim();
    const { html, ok } = renderMath(inner);
    if (ok) {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "katex-inline",
            dangerouslySetInnerHTML: { __html: html }
          },
          key++
        )
      );
    } else {
      parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: inner }, key++));
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < raw.length) parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: raw.slice(lastIndex) }, key++));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, children: parts });
}
export {
  MathText as M
};
