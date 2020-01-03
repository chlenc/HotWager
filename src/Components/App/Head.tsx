/** @jsx jsx **/
import React from 'react';
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import LoginBtn, { IUser } from "../LoginBtn";
import Button from "../Button";
import copyToClipboard from 'copy-to-clipboard'
import { inject, observer } from "mobx-react";
import { AccountsStore, NotificationsStore } from "../../stores";
import Dialog from "../Dialog";
import Avatar from "./Avatar";

interface IProps {
    user: IUser | null
    notificationsStore?: NotificationsStore;
    accountsStore?: AccountsStore;
}


const Root = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
padding: 20px;
@media (max-width: 720px) {
  flex-direction: column;
}

`;

const UserCardBody = styled.div`
display: flex;
align-items: center;
user-select: none;
margin-right: 15px;
@media (max-width: 720px) {
margin-bottom: 20px
}

`;

const FlexRow = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const FormBody = styled.div`
display: flex;
flex-direction: column;
& > * {
margin-bottom: 12px;
}
`

const TextArea = styled.textarea``;

interface IState {
    seed: string
}

@inject('notificationsStore', 'accountsStore')
@observer
export default class Head extends React.Component<IProps, IState> {

    state = {
        seed: ''
    };

    handleCopyAddress = () => {
        const {user, notificationsStore} = this.props;
        if (user && user.address) {
            copyToClipboard(user.address.toString());
            notificationsStore!.notify('Address was copied', {})
        } else {
            notificationsStore!.notify('Error: address is invalid', {})
        }
    };

    handleTelegramResponse = (response: any) => {
        console.log(this.props.accountsStore!.updateUser(response).address);
    };

    handleSignWithSeed = () => {
        const {seed} = this.state;
        if (seed === '') {
            this.props.notificationsStore!.notify('seed field is empty');
            return
        }
    };

    handleChangeSeed = ({target: {value: seed}}: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({seed});

    render() {
        const {user} = this.props;
        const {seed} = this.state;
        return <Root>
            {
                user && user.address &&
                <UserCardBody onClick={this.handleCopyAddress}>
                    <Avatar address={user.address}/>
                    <div>
                        <div css={css`:hover{color: #595565}`}>{user.address}</div>
                        <div>balance:&nbsp;{user.balance}&nbsp;waves</div>
                    </div>
                </UserCardBody>
            }
            <Dialog
                title={'You can login with'}
                body={
                    <FormBody>
                        {/*<FlexRow>YOU CAN LOGIN WITH</FlexRow>*/}
                        <FlexRow>
                            <div>TELEGRAM:</div>
                            <LoginBtn botName={'HotWagerBot'} onLogin={this.handleTelegramResponse}/>
                        </FlexRow>
                        {/*<FlexRow>OR</FlexRow>*/}
                        {/*<FlexRow>*/}
                        {/*    <div>SEED:</div>*/}
                        {/*    <TextArea onChange={this.handleChangeSeed} value={seed}/>*/}
                        {/*    <Button disabled={seed === ''} onClick={this.handleSignWithSeed}>Add</Button>*/}
                        {/*</FlexRow>*/}
                    </FormBody>
                }
            >
                <Button>Login</Button>
            </Dialog>
        </Root>;
    }

}

