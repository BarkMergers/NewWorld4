import React, { useRef } from 'react'
import keyIcon from '/key.png'
import bellIcon from '/bell.png'
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

import type { AccountInfo } from "@azure/msal-browser";

//import {
//    useLocation
//} from "react-router-dom";


function NavBar({ title, accounts, handleLogout, handleLogin }: { title: string, accounts: AccountInfo[], handleLogout: ()=> void, handleLogin: () => void }) {


    const navigate = useNavigate();

    //const location = useLocation();

    //const loginNavigate = () => {
    //    switch (location.pathname) {
    //        case "/loggedout":
    //        case "/notfound":
    //            {
    //                setTimeout(() => navigate("/"), 100);
    //            }
    //    }
    //}

    const mainMenu = [
        { "name": "Dashboard", onClick: () => navigate('/dashboard'), secure: false },
        {
            "name": "Order", secure: true, list: [
                { name: "Accounts", onClick: () => navigate('/Accounts') },
                { name: "-" },
                { name: "Reject", onClick: () => alert('This has been rejected') }
            ]
        },
        {
            "name": "Claims", secure: true, list: [
                { name: "Submit", onClick: () => alert('Claim submitted') },
                { name: "Reject", onClick: () => alert('Claim reject') }
            ]
        },
        { "name": "Admin", secure: true, onClick: () => navigate('/admin') },
    ]

    const endMenu = [
        {
            "icon": "key", secure: true, "list": [
                { name: "Permissions", onClick: () => alert('Permissions') },
                { name: "-" },
                { name: "Structure", onClick: () => alert('No structure keys') }
            ]
        },
        {
            "icon": "bell", secure: true, "list": [
                { name: "Alerts", onClick: () => alert('You have no alerts') },
                { name: "Emails", onClick: () => alert('You have no emails') }
            ]
        }
    ]










    const containerRef = useRef(null);

    const closeMenus = function () {
        const divs = containerRef!.current!.querySelectorAll('details[open]');
        divs.forEach((div) => {
            div.removeAttribute("open");
        });
        document.activeElement.blur();
    }

    const clicker = function (fn: any) {
        closeMenus();
        setTimeout(fn, 1);
    }

    const menuFocus = function (elem: any) {
        setTimeout(() => {
            if ((elem.nodeName) == "A")
                elem.parentNode.nextElementSibling.focus();
            else 
                elem.nextElementSibling.focus();
        }, 10)
    }

    const menuNarrow = function () {
        return (



            <>

                

                <ul className="menu menu-horizontal inline-flex justify-center px-1 text-center sm:hidden">
                    {endMenuWide()}
                </ul >
                {
                    mainMenu.map((item, i) => {

                        if (item.secure && accounts.length == 0) return

                        if (typeof item.list === "undefined")
                            return <li key={i}>

                                <a onClick={() => clicker(item.onClick)}>{item.name}</a>

                            </li>

                        return <li key={i}>
                            <a>{item.name}</a>
                            <ul className="p-2">
                                {item.list.map(makeSubMenuItem)}
                            </ul></li>
                    })
                }
            </>
        );
    }


    const makeSubMenuItem = (subItem) => {
        return (<li key={Math.random()}>
            {subItem.name == "-" ?
                <div className="divider"></div> :
                        
                        <a onClick={() => clicker(subItem.onClick)}>{subItem.name}</a>
                  
                    }
        </li>)
    }

    const menuWide = function () {
        return (
            mainMenu.map((item, i) => {

                if (item.secure && accounts.length == 0) return

                if (typeof item.list === "undefined")
                    return <li key={i}><a onClick={() => clicker(item.onClick)}>{item.name}</a></li>

                return <li key={i}>
                    <details>
                        <summary onClick={(event) => menuFocus(event.target)}><a>{item.name}</a></summary>
                        <ul tabIndex={0} onBlur={closeMenus} className="p-2">{item.list.map(makeSubMenuItem)}</ul>
                    </details></li>
            })
        );
    }

    const endMenuWide = function () {
        return (
            endMenu.map((item, i) => {

                return <li key={i}>
                    <details>
                        <summary onClick={(event) => menuFocus(event.target)} className="side-icon-summary"><img className="side-icon" src={getIcon(item.icon)}></img></summary>
                        <ul tabIndex={0} onBlur={closeMenus} className="p-2">
                            { item.list.map(makeSubMenuItem) }
                        </ul>
                    </details></li>
            })
        );
    }

    const getIcon = function (icon: string) {
        switch (icon) {
            case "key": return keyIcon;
            case "bell": return bellIcon;
        }
    }

    return (
        <div ref={containerRef} className="navbar bg-base-100 pl-[0px] shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="hamburger btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        { menuNarrow() }
                    </ul>
                </div>
                <a className="navbar-title btn-ghost text-xl" style={{ cursor: "pointer" }} onClick={() => navigate('/') }>{title}</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuWide()}
                </ul>
            </div>

            <div className="navbar-end">
                <ul className="menu menu-horizontal hidden px-1 sm:inline-flex">
                    {endMenuWide()}
                </ul>

                <div className="text-center" >

                    {accounts.length > 0 ? (
                        <>

                            <div style={{ "cursor": "pointer" }}><a className="userNameDisplay" onClick={() => navigate('/mydetails')}>{accounts[0].name}</a></div>
                            <div style={{ "cursor": "pointer" }}><a onClick={() => { handleLogout(); navigate('/loggedout'); } }>Log out</a></div>
                        </>
                    ) : (
                            <div style={{ "cursor": "pointer" }}><a onClick={() => { handleLogin() }}>Log in</a></div>
                    )}

                </div>
            </div>
        </div>    
    );
}

export default NavBar;
