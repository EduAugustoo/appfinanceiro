import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    black: {
      "900": "#000000",
    },
    gray: {
      "600": "#737373",
      "400": "#969CB3",
    },
    white: {
      "400": "#d7d7d7",
      "200": "#e7e9ee",
      "100": "#FFFFFF",
    },
    red: {
      "900": "#FF0000",
    },
  },

  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },

  styles: {
    global: {
      "*": {
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
      },
      "body, input, textarea, button": {
        bg: "white.100",
        color: "black.900",
        fontWeight: "400",
        lineHeight: "tall",
      },
      button: {
        cursor: "pointer",
      },
      ".react-modal-overlay": {
        bg: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      ".react-modal-content": {
        width: "100%",
        maxWidth: "576px",
        bg: "black.900",
        padding: "3rem",
        position: "relative",
        borderRadius: "0.25rem",
      },
      ".react-modal-close": {
        position: "absolute",
        right: "1.5rem",
        top: "1.5rem",
        border: "0",
        bg: "transparent",

        transition: "filter 0.2s",

        "&:hover": {
          filter: "brightness(0.8)",
        },
      },
    },
  },
});
