import { Options } from "@nuxtjs/vuetify";

const options: Options = {
    theme : {
        dark : false,
        default : false,
        disable : false,
        options : {
            customProperties: true
        },
        themes: {
            light: {
                primary: "#009688",
                secondary: "#ff9800",
                accent: "#ff5722",
                error: "#f44336",
                warning: "#ffc107",
                info: "#2196f3",
                success: "#4caf50"
            },
            dark : {
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
    treeShake : true
}

export default options