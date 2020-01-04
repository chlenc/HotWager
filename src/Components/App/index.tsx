import React from 'react';
import { AccountsStore, DappStore } from "../../stores";
import { inject, observer } from 'mobx-react';
import Head from "./Head";
import styled from "@emotion/styled";
import Button from "../Button";
import Table from 'rc-table';
import { TStoryItem } from "../../stores/DappStore";
// import 'rc-table/assets/index.css'

const Border = styled.div`border-bottom: 1px solid`;

const columns = [
    {title: 'Index', dataIndex: 'i', key: 'i', width: 100,},
    {
        title: 'Coef1', dataIndex: 'k1', key: 'k1', width: 100, render: (v: number, {e}: TStoryItem) =>
            e === 1 ? <Border>{v / 100}</Border> : v / 100
    },
    {
        title: 'Coef2', dataIndex: 'k2', key: 'k2', width: 100, render: (v: number, {e}: TStoryItem) =>
            e === 2 ? <Border>{v / 100}</Border> : v / 100
    },
];


interface IInjectedProps {
    accountsStore?: AccountsStore
    dappStore?: DappStore
}

const Root = styled.div`
height: calc(100vh - 80px);
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
margin: 20px 60px;

& > * {
margin-bottom: 40px;
}
`;

const EventLayout = styled.div`
display: flex;

 flex-direction: column;
 > * {
  margin: 14px;
 }
`

const Footer = styled.div``;

@inject('accountsStore', 'dappStore')
@observer
class App extends React.Component<IInjectedProps> {

    render() {
        const user = this.props.accountsStore!.user;
        const {k1, k2, story, chooseEvent, load, event1amount, event2amount, withdraw} = this.props.dappStore!;
        return <Root>
            <Head user={user}/>
            <EventCard title="Event I" chooseEvent={chooseEvent} event={1} k={k1} load={load} descr={event1amount}/>
            <EventCard title="Event II" chooseEvent={chooseEvent} event={2} k={k2} load={load} descr={event2amount}/>
            <Button disabled={load} onClick={withdraw}>withdraw</Button>
            {story && <Table columns={columns} data={story}/>}
            <Footer>HotWager©</Footer>
        </Root>


    }

}

interface IEventCardProps {
    title: string,
    event: number,
    k: number | null,
    chooseEvent: (n: number) => void
    load: boolean
    descr: number | null
}

const EventItem = styled.div`
min-height: 100px;
min-width: 300px;
padding: 20px;
border: solid 4px #9192a2;
display: flex;
flex-direction: column;
 > * {
  margin-bottom: 14px;
 }
`;

class EventCard extends React.Component<IEventCardProps> {

    render() {
        const {title, k, chooseEvent, load, event, descr} = this.props;
        return <EventItem>
            <div><b>{title}</b>&nbsp;k{k && k / 100}</div>
            <Button disabled={load} onClick={() => chooseEvent(event)}>Bet</Button>
            {descr && <div>{title} win {descr / 100}</div>}
        </EventItem>;
    }
}


export default App;
