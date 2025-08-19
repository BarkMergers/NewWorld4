import type { ReactNode } from 'react';
import './Panel.css'

export default function Panel({ children }: { children: ReactNode }) {
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