import React from "react";
import "./CassettePanel.css";

function CassettePanel({ children }) {
    return (
        <div className="cassette-panel">
            <div className="top-bar">
                {/* Schroeven aan de bovenkant */}
                <div className="screw top-left"></div>
                <div className="screw top-right"></div>
            </div>
            <div className="content">
                {children}
            </div>
            <div className="bottom-bar">
                {/* bump onderkant cassette */}
                <div className="bottom-bump"></div>
                {/* Schroeven aan de onderkant */}
                <div className="screw bottom-left"></div>
                <div className="screw bottom-right"></div>
            </div>
        </div>
    );
}

export default CassettePanel;
