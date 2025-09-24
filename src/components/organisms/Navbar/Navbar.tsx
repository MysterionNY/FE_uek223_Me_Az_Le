import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    appBarStyles,
    titleTextStyles,
    navbarButtonsBoxStyles,
    redirectButtonStyles,
} from "./NavbarStyles";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        navigate("/");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <AppBar sx={appBarStyles}>
            <Toolbar>
                <Typography sx={titleTextStyles}>
                    Ourspace
                </Typography>

                <Box sx={navbarButtonsBoxStyles}>
                    <Button component={Link} to="/" sx={redirectButtonStyles}>
                        Home
                    </Button>

                    {isLoggedIn ? (
                        <Button onClick={handleLogout} sx={redirectButtonStyles}>
                            Log Out
                        </Button>
                    ) : (
                        <Button onClick={handleLogin} sx={redirectButtonStyles}>
                            Log In
                        </Button>
                    )}

                    <Button component={Link} to="/users" sx={redirectButtonStyles}>
                        Users
                    </Button>

                    <Button component={Link} to="/blogposts" sx={redirectButtonStyles}>
                        Blogposts
                    </Button>

                </Box>
            </Toolbar>
        </AppBar>
    );
}
