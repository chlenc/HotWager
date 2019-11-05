import * as React from 'react';
import * as avatar from 'identity-img';
import styled from "@emotion/styled";


const SIZE = 67;

interface IProps {
    size?: number,
    address: string,
}

const _Img = styled.img`
border-radius: 50%;
margin: 8px;`

const Avatar = (props: IProps) => {
    const {
        size = SIZE,
        address,
    } = props;

    avatar.config({
        rows: 8,
        cells: 8
    });

    const src = address
        ? avatar.create(address, {size: size * 3})
        : '';

    return <_Img src={src} width={size} height={size} alt="Avatar"/>
};

export default Avatar;
