import React, { createContext, useState } from "react";

const themeConfigs = {
  light: {
    primaryColor: "#FFEB3B",
    bgColor: "#FFF9C4",
    secondaryBgColor: "#FFF",
    fontColor: "#000",
  },
  dark: {
    primaryColor: "#FFF55D",
    fontColor: "#dedede",
    bgColor: "#121212",
    secondaryBgColor: "#212121",
  },
};

export const ThemeContext = createContext({});

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    if (typeof window !== undefined && window.localStorage.getItem("mode")) {
      let mode = localStorage.getItem("mode") || "dark";
      return mode;
    } else {
      return "dark";
    }
  });

  //change theme mode from dark to light and vise-versa
  const changeMode = () => {
    if (mode === "dark") {
      localStorage.setItem("mode", "light");
      let colorMode = localStorage.getItem("mode");
      setMode(colorMode);
      changeThemeColor(colorMode);
    } else {
      localStorage.setItem("mode", "dark");
      let colorMode = localStorage.getItem("mode");
      setMode(colorMode);
      changeThemeColor(colorMode);
    }
  };

  //set state for theme colors according to theme mode
  const [themeColors, setThemeColors] = useState({
    ...themeConfigs[mode],
  });
  //change theme colors from light::colors to dark::colors depending on mode change
  const changeThemeColor = mode => {
    setThemeColors({
      ...themeConfigs[mode],
    });
  };
  return (
    <ThemeContext.Provider
      value={{
        changeMode,
        themeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
