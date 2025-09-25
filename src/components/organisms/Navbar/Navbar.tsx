import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
    appBarStyles,
    titleTextStyles,
    navbarButtonsBoxStyles,
    redirectButtonStyles,
} from "./NavbarStyles";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import React, { useContext } from "react";
import roles from "../../../config/Roles";
import activeUserContext from "../../../Contexts/ActiveUserContext";


export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout, activeUserHasRole } = useContext(ActiveUserContext);
    const isLoggedIn = !!user;


    const handleLogout = () => {
        logout();
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


                    {isLoggedIn ? (
                    <Button component={Link} to="/blogpost/create" sx={redirectButtonStyles}>
                        New Blogpost
                    </Button>
                    ) : (
                    <Button component={Link} to="/register" sx={redirectButtonStyles}>
                        Register
                    </Button>
                    )}

                    {activeUserHasRole(roles.USER) && user?.id && (
                      <Button
                        component={Link}
                        to={`/blogpost/author/${user.id}`}
                        sx={redirectButtonStyles}
                      >
                          Your Posts
                      </Button>
                    )}

                    <Button component={Link} to="/blogposts" sx={redirectButtonStyles}>
                        Blogposts
                    </Button>

                    {activeUserHasRole(roles.ADMIN) && (
                        <>
                            <Button component={Link} to="/admin" sx={redirectButtonStyles}>
                                Admin Overview
                            </Button>

                            <Button component={Link} to="/users" sx={redirectButtonStyles}>
                                Users
                            </Button>
                        </>
                    )}

                    {isLoggedIn ? (
                      <Button onClick={handleLogout} sx={redirectButtonStyles}>
                          Log Out
                      </Button>
                    ) : (
                      <Button onClick={handleLogin} sx={redirectButtonStyles}>
                          Log In
                      </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}