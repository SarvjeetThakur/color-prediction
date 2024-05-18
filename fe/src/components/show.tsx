"use client";
import * as React from 'react'

export default function Show(props: any) {
    
    let If: any = null;
    let Else: any = null;
    React.Children.forEach(props.children, children => {        
        if (children.props.isTrue === undefined) {
            Else = children
        } else if (!If && children.props.isTrue === true) {
            If = children
        }
    })
    return If || Else
}
Show.If = ({ isTrue, children }:{ isTrue:boolean, children :React.ReactNode }) => isTrue && children;
Show.Else = ({ render, children }:{ render:any, children :React.ReactNode }) => render && children;