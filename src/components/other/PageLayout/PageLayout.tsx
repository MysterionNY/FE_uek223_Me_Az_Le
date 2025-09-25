import React, { useState } from "react";
import clsx from "clsx";
import Navbar from "../../organisms/Navbar/Navbar";
import usePageLayoutStyles from "./PageLayoutStyles"; // ✅ correct import

/**
 * PageLayoutProps defines all props on the PageLayout component
 */
type PageLayoutProps = {
    children: React.ReactNode;
};

/**
 * PageLayout component wraps its children inside a layout
 * with a Navbar on top and the content beneath it.
 */
const PageLayout = ({ children }: PageLayoutProps) => {
    const classes = usePageLayoutStyles();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Navbar />
            <div
                className={clsx(
                    classes.contentPusher,
                    classes.contentStyle
                )}
            >
                {children}
            </div>
        </>
    );
};

export default PageLayout;
