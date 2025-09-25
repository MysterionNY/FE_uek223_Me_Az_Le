import { SxProps, Theme } from "@mui/material";

export const appBarStyles: SxProps<Theme> = {
    backgroundColor: "rgb(3, 65, 252)",
    position: "absolute",
};

export const titleTextStyles: SxProps<Theme> = {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
    flexGrow: 1,
    color: "black",
    paddingLeft: "350px",
};

export const navbarButtonsBoxStyles: SxProps<Theme> = {
    display: "flex",
    gap: "16px",
};

export const redirectButtonStyles: SxProps<Theme> = {
    backgroundColor: "rgba(50, 205, 50, 0)",
    color: "black",
    zIndex: 9999,
    position: "relative",
    "&:hover": {
        backgroundColor: "rgba(87, 79, 90, 0.53)",
        color: "rgb(111, 62, 131)",
    },
};
