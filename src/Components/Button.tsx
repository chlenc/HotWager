import React from 'react';
import styled from "@emotion/styled";


const Button = styled.button`
outline: none;
border: 4px solid #9192a2;
background-color: #343d3f;
color: #9192a2;
width: 200px;
min-height: 40px;
font-family: 'Major Mono Display', monospace;
font-size: 20px;
text-transform: uppercase;
:hover{
background-color: #9192a2;
color: #343d3f;
}
:disabled{
background-color: #343d3f;
border-color: #343d3f;
cursor: not-allowed;
}
`;

export default Button
