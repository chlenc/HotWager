import React from 'react';
import { IUser } from "../LoginBtn";
import { AccountsStore, DappStore } from "../../stores";
import { inject, observer } from 'mobx-react';
import Head from "./Head";
import styled from "@emotion/styled";

interface IInjectedProps {
    accountsStore?: AccountsStore
    dappStore?: DappStore
}

const Root = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin: 20px 60px;
`;

@inject('accountsStore', 'dappStore')
@observer
class App extends React.Component<IInjectedProps> {

    handleTelegramResponse = (response: any) => {
        console.log(this.props.accountsStore!.updateUser(response).address);
    };

    render() {
        const user = this.props.accountsStore!.user;
        const {k1, k2, story, chooseEvent, withdraw, load} = this.props.dappStore!;
        return <Root>
        <Head user={user}/>
        </Root>

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
