import React from 'react';
import _Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import Button from "./Button";

interface IProps {
    title?: string
    body: JSX.Element
}

interface IState {
    visible: boolean
}

export default class Dialog extends React.Component<IProps, IState> {

    state = {visible: false};

    handleClose = () => this.setState({visible: false})

    handleOpen = () => this.setState({visible: true});

    render() {
        const {children, body, ...other} = this.props;
        const {visible} = this.state;
        return <div>
            <div onClick={this.handleOpen}>{children}</div>
            <_Dialog {...other}
                     onClose={this.handleClose}
                     visible={visible}
                     footer={<Button onClick={this.handleClose}>Close</Button>}
            >
                {body}
            </_Dialog>
        </div>
            ;
    }

}
