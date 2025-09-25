import { makeStyles } from "@mui/styles";

const NAVBAR_HEIGHT = 64;

const usePageLayoutStyles = makeStyles(() => ({
    contentPusher: {
        display: "flex",
        flexDirection: "column",
        marginTop: NAVBAR_HEIGHT,
        padding: "1rem",
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        boxSizing: "border-box",
        backgroundColor: "#f9f9f9",
    },
    contentStyle: {
        flex: 1,
        width: "100%",
    },

}));

export default usePageLayoutStyles;
