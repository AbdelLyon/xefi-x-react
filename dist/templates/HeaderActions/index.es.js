import { jsxs, jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { LanguageSelect } from "../LanguageSelect/index.es.js";
import { ProfileDropdown } from "../ProfileDropdown/index.es.js";
import { ToggleTheme } from "../../theme/ToggleTheme/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const gapClasses = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "6": "gap-6",
  "8": "gap-8"
};
const alignClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly"
};
const HeaderActions = forwardRef(
  ({
    className,
    gap = "2",
    align = "end",
    showThemeToggle = true,
    themeToggleProps = {},
    showLanguageSelect = true,
    languages = [],
    selectedLanguage,
    onLanguageChange,
    languageSelectProps = {},
    showProfileDropdown = true,
    user,
    profileSections = [],
    onProfileAction,
    profileDropdownProps = {}
  }, ref) => {
    const containerClasses = mergeTailwindClasses(
      "flex items-center",
      gapClasses[gap],
      alignClasses[align],
      className
    );
    return /* @__PURE__ */ jsxs("div", { ref, className: containerClasses, children: [
      showThemeToggle && /* @__PURE__ */ jsx(
        ToggleTheme,
        {
          className: mergeTailwindClasses(
            "flex-shrink-0",
            themeToggleProps.className
          ),
          size: themeToggleProps.size
        }
      ),
      showLanguageSelect && languages.length > 0 && /* @__PURE__ */ jsx(
        LanguageSelect,
        {
          languages,
          value: selectedLanguage,
          onSelectionChange: onLanguageChange,
          size: languageSelectProps.size,
          placeholder: languageSelectProps.placeholder,
          "aria-label": languageSelectProps["aria-label"],
          classNames: {
            base: mergeTailwindClasses(
              "flex-shrink-0 min-w-[100px]",
              languageSelectProps.className
            )
          }
        }
      ),
      showProfileDropdown && user && /* @__PURE__ */ jsx(
        ProfileDropdown,
        {
          user,
          sections: profileSections,
          onActionPress: onProfileAction,
          size: profileDropdownProps.size,
          variant: profileDropdownProps.variant,
          showUserInfo: profileDropdownProps.showUserInfo,
          placement: profileDropdownProps.placement,
          classNames: {
            base: mergeTailwindClasses(
              "flex-shrink-0",
              profileDropdownProps.className
            )
          }
        }
      )
    ] });
  }
);
HeaderActions.displayName = "HeaderActions";
export {
  HeaderActions
};
