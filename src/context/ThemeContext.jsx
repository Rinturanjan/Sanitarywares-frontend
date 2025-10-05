import { createContext, useContext, useState } from "react";
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(v => !v) }}>
      <div className={dark ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
}
