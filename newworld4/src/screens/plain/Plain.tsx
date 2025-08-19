import AgentTable from "../../elements/agentTable/AgentTable";
import CustomerTable from "../../elements/customerTable/CustomerTable";
import StatsBar from "../../elements/statsBar/StatsBar";
import TitleBar from "../../elements/titleBar/TitleBar";

import type { AccountInfo } from "@azure/msal-browser";

export default function Plain({ accounts }: { accounts: AccountInfo[] } ) {
    return (
        <>

            <TitleBar title="NewWORLD"></TitleBar>

            <StatsBar></StatsBar>

            <AgentTable></AgentTable>


            {
                accounts.length > 0 &&
                <CustomerTable></CustomerTable>
            }


        </>
    )
}