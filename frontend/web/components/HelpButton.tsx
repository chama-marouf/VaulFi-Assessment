"use client"

import React from "react"
import { IconButton, Tooltip } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

const HelpButton: React.FC = () => {
    const handleHelpClick = () => {
        // TODO: Implement help functionality
        console.log("Help clicked")
    }

    return (
        <Tooltip title='Need help?'>
            <IconButton
                onClick={handleHelpClick}
                sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    color: "#757575",
                    "&:hover": {
                        color: "#0B045D",
                    },
                }}>
                <HelpOutlineIcon />
            </IconButton>
        </Tooltip>
    )
}

export default HelpButton
