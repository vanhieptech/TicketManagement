import { Options } from "@nuxtjs/vuetify";

const options: Options = {
  theme: {
    dark: false,
    default: false,
    disable: false,
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#005A8A",
        secondary: "#384955",
        accent: "#E99B27",
        error: "#B4504A",
        warning: "#EEE8A9",
        info: "#00BCFF",
        success: "#008A5A"
      },
      dark: {
        primary: "#009688",
        secondary: "#ff9800",
        accent: "#ff5722",
        error: "#f44336",
        warning: "#ffc107",
        info: "#2196f3",
        success: "#4caf50"
      }
    }
  },
  treeShake: true
}

export default options
