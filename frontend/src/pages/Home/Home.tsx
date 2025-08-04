import { User } from "../../components/user/User";
import { History } from "../../components/history/History";
import { PayButton, ReceiveButton } from "../../components/buttons/Buttons";
import { Account } from "../../components/account/Account";

import './Home.css';

export function HomePage() {
    return(
        <div className="main">
            <User></User>
            <Account></Account>
            <div className="buttons">
                <PayButton></PayButton>
                <ReceiveButton></ReceiveButton>
                <PayButton></PayButton> {/*FUTURE BET BUTTON*/}
            </div>
            <div className="history">
                <History></History>
            </div>
        </div>
    );
}