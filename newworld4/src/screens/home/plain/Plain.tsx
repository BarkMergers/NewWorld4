import type { AccountInfo } from "@azure/msal-browser";

import StatsBar from "../../../elements/statsBar/StatsBar";
import TitleBar from "../../../elements/titleBar/TitleBar";

export default function Plain({ accounts }: { accounts: AccountInfo[] } ) {
    return (
        <>
            <TitleBar title="NewWORLD"></TitleBar>

            <StatsBar></StatsBar>
        </>
    )
}