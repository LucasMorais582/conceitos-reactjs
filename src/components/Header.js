import React from 'react';
import "../styles.css";

export default function Header({ title, children }){
    return(
        <header>
            <h1>{ title }</h1>
            <p>{ children }</p>
        </header>
    );
}