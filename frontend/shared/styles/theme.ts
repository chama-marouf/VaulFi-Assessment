// Color palette
export const colors = {
    primary: {
        main: "#2563EB",
        light: "#3B82F6",
        dark: "#1D4ED8",
        contrastText: "#FFFFFF",
    },
    secondary: {
        main: "#10B981",
        light: "#34D399",
        dark: "#059669",
        contrastText: "#FFFFFF",
    },
    error: {
        main: "#EF4444",
        light: "#F87171",
        dark: "#DC2626",
        contrastText: "#FFFFFF",
    },
    warning: {
        main: "#F59E0B",
        light: "#FBBF24",
        dark: "#D97706",
        contrastText: "#FFFFFF",
    },
    info: {
        main: "#3B82F6",
        light: "#60A5FA",
        dark: "#2563EB",
        contrastText: "#FFFFFF",
    },
    success: {
        main: "#10B981",
        light: "#34D399",
        dark: "#059669",
        contrastText: "#FFFFFF",
    },
    grey: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
    },
    common: {
        black: "#000000",
        white: "#FFFFFF",
    },
    background: {
        default: "#F9FAFB",
        paper: "#FFFFFF",
        dark: "#111827",
    },
    text: {
        primary: "#111827",
        secondary: "#4B5563",
        disabled: "#9CA3AF",
    },
}

// Typography settings
export const typography = {
    fontFamily: {
        primary: "'Inter', sans-serif",
        secondary: "'Poppins', sans-serif",
    },
    fontSizes: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        md: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
    },
    fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
}

// Spacing values (in pixels)
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
}

// Border radius values
export const borderRadius = {
    none: "0",
    sm: "0.125rem", // 2px
    md: "0.25rem", // 4px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px", // Circular
}

// Shadow values
export const shadows = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
}

// Common transitions
export const transitions = {
    default: "all 0.3s ease",
    fast: "all 0.15s ease",
    slow: "all 0.5s ease",
}

// Z-index values
export const zIndex = {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
}

export const theme = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    transitions,
    zIndex,
}

export default theme
