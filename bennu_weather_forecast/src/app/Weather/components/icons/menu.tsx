
import React from 'react';
interface Props {
    color: string
}
export default function MenuIcon(props: Props) {
    return (
        <svg viewBox="0  26" width={20} xmlns="http://www.w3.org/2000/svg" >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M4 4H22M4 10H16" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
        </svg>
    );
}


