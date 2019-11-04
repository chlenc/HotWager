/** @jsx jsx **/
import React from 'react';
import styled from "@emotion/styled";
import {css, jsx} from "@emotion/core";
import {IUser} from "../LoginBtn";
import Button from "./Button";
import copyToClipboard from 'copy-to-clipboard'
import {inject, observer} from "mobx-react";
import {NotificationsStore} from "../../stores";

interface IProps {
    user: IUser | null
    notificationsStore?: NotificationsStore;
}


const Root = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px 60px;
`;

const UserCardBody = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
user-select: none;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 8px;
`

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

@inject('notificationsStore')
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
    //TODO add login dialog
    render() {
        const {user} = this.props;
        return <Root>
            {
                user
                    ? <UserCardBody onClick={this.handleCopyAddress}>
                        <Avatar alt="Telegram photo" src={user.photo_url}/>
                        <div>
                            <div css={css`:hover{color: #595565}`}>{user.address}</div>
                            <div>balance:&nbsp;{user.balance}&nbsp;waves</div>
                        </div>
                    </UserCardBody>
                    : <UserCardBody>
                        <AvatarSceleton/>
                        <div><TextSceleton/><TextSceleton/></div>
                    </UserCardBody>
            }
            <Button>Login</Button>
        </Root>;
    }

}

