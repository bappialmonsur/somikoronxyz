import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { ad as EyeOff, ae as Eye } from "../_libs/lucide-react.mjs";
const PasswordInput = reactExports.forwardRef(({ className, ...props }, ref) => {
  const [show, setShow] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        ref,
        type: show ? "text" : "password",
        className: cn("pr-10", className),
        ...props
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setShow((s) => !s),
        tabIndex: -1,
        "aria-label": show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান",
        className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
        children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4" })
      }
    )
  ] });
});
PasswordInput.displayName = "PasswordInput";
export {
  PasswordInput as P
};
