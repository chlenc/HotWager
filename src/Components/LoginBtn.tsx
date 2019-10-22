import React from 'react';

export interface IUser {
    auth_date: number
    hash: string
    id: number
    first_name?: string
    last_name?: string
    photo_url?: string
    username?: string
}

interface IProps {
    botName: string
    onLogin?: (user: IUser) => void
    buttonSize?: 'large' | 'medium' | 'small',
    cornerRadius?: number,
    requestAccess?: string,
    usePic?: boolean,
    className?: string
}

class LoginBtn extends React.Component<IProps> {

    instance: any;

    setRef = (component: any) => {
        this.instance = component;
    };

    componentDidMount() {
        const {
            botName,
            buttonSize = 'medium',
            cornerRadius,
            requestAccess = 'write',
            usePic = false,
            onLogin = (user: any) => console.log(user)
        } = this.props;

        if (!botName) return <div>bot name is undefined</div>;

        window.TelegramLoginWidget = {dataOnauth: (user: IUser) => onLogin(user)};

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?4';
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-size', buttonSize);
        cornerRadius && script.setAttribute('data-radius', cornerRadius.toString());
        script.setAttribute('data-request-access', requestAccess);
        script.setAttribute('data-userpic', usePic.toString());
        script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
        script.async = true;
        this.instance.appendChild(script);
    }

    render() {
        return <div className={this.props.className} ref={this.setRef}>{this.props.children}</div>;
    }
}


export default LoginBtn;
