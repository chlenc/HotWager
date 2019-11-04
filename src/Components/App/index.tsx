import React from 'react';
import LoginBtn, { IUser } from "../LoginBtn";
import { AccountsStore, DappStore } from "../../stores";
import { inject, observer } from 'mobx-react';
import Head from "./Head";

interface IInjectedProps {
    accountsStore?: AccountsStore
    dappStore?: DappStore
}


@inject('accountsStore', 'dappStore')
@observer
class App extends React.Component<IInjectedProps> {

    handleTelegramResponse = (response: any) => {
        console.log(this.props.accountsStore!.updateUser(response).address);
    };

    render() {
        const user = this.props.accountsStore!.user;
        const {k1, k2, story, chooseEvent, withdraw, load} = this.props.dappStore!;
        return <>
        <Head user={user}/>
        </>

    }

}

interface IEventCardProps {
    title: string,
    k: number | null,
    user: IUser | null,
    chooseEvent: (n: number, s: string) => void
    load: boolean
}

class EventCard extends React.Component<IEventCardProps> {

    render() {
        const {title, k, user, chooseEvent, load} = this.props;
        return null
    }
}

export default App;
