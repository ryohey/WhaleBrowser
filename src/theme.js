import { fade, darken, lighten } from "material-ui/utils/colorManipulator"
import spacing from "material-ui/styles/spacing"

const primaryColor = "#27ae60"
const backgroundColor = "#273847"
const textColor = "#ffffff"

export default {
  spacing: spacing,
  fontFamily: "Roboto, sans-serif",
  palette: {
    primary1Color: primaryColor,
    primary2Color: darken(primaryColor, 0.1),
    primary3Color: darken(primaryColor, 0.2),
    accent1Color: lighten(primaryColor, 0.4),
    accent2Color: lighten(primaryColor, 0.5),
    accent3Color: lighten(primaryColor, 0.6),
    textColor: textColor,
    secondaryTextColor: fade(textColor, 0.7),
    alternateTextColor: fade(textColor, 0.7),
    canvasColor: backgroundColor,
    borderColor: fade(textColor, 0.3),
    disabledColor: fade(textColor, 0.3),
    pickerHeaderColor: fade(textColor, 0.12),
    clockCircleColor: fade(textColor, 0.12),
  },
}
