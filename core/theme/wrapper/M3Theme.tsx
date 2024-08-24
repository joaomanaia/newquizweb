import { useContext, useEffect, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { ThemeSchemeContext } from "../providers/ThemeSchemeProvider";
import { getMUIPalette } from "../utils/getMUIPalette";
import { getMUIComponents } from "../utils/getMUIComponents";
import { useTheme } from "next-themes";
import { ThemeMode } from "@/core/theme/types/ThemeMode";

interface M3Props {
  children?: React.ReactNode;
}

const M3Theme = ({ children }: M3Props) => {
  const { themeScheme } = useContext(ThemeSchemeContext);
  const { resolvedTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const m3Theme = useMemo(() => {
    const themeMode: ThemeMode = resolvedTheme === "dark" ? "dark" : "light";
    const muiPalette = getMUIPalette(themeMode, themeScheme);

    let theme = createTheme(muiPalette);
    theme = deepmerge(theme, getMUIComponents(theme));
    theme = responsiveFontSizes(theme);

    return theme;
  }, [resolvedTheme, themeScheme]);

  if (!isMounted) return null;

  return (
    <ThemeProvider theme={m3Theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
};

export default M3Theme;
