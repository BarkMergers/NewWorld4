import React from 'react';
import './Panel.css'

export default function Panel({ children }) {
    return (
        <>
            <div className="panelBorderOuter">
                <div className="panelBorder">
                    { children }
                </div>
            </div>
        </>    
    );
};