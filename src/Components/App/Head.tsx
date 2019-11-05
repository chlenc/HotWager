/** @jsx jsx **/
import React from 'react';
import styled from "@emotion/styled";
import {css, jsx} from "@emotion/core";
import LoginBtn, {IUser} from "../LoginBtn";
import Button from "../Button";
import copyToClipboard from 'copy-to-clipboard'
import {inject, observer} from "mobx-react";
import {AccountsStore, NotificationsStore} from "../../stores";
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
`;

const UserCardBody = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
user-select: none;
margin-right: 15px;
`;

// const Avatar = styled.img`
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   margin-right: 8px;
// `

const AvatarSceleton = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: darkgray;
`

const TextSceleton = styled.div`
  border-radius: 50%;
  width: 150px;
  height: 40px;
  background-color: darkgray;
`

@inject('notificationsStore', 'accountsStore')
@observer
export default class Head extends React.Component<IProps> {

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

    render() {
        const {user} = this.props;
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
                    // : <UserCardBody>
                    //     <AvatarSceleton/>
                    //     <div><TextSceleton/><TextSceleton/></div>
                    // </UserCardBody>
            }
            <Dialog
                title={'You can login with'}
                body={
                    <UserCardBody>
                    <div>TELEGRAM: </div>
                    <LoginBtn botName={'HotWagerBot'} onLogin={this.handleTelegramResponse}/>
                    </UserCardBody>
                }
            >
                <Button>Login</Button>
            </Dialog>
        </Root>;
    }

}

