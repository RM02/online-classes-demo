import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function HeaderComponent ({ isAuth }) {

    const { data: session, status } = useSession();
    const router = useRouter()
    const menuConfig = [
        {
            label: 'Programas',
            path: '/',
        },
        {
            label: 'Cursos',
            path: '/',
            children: [
                { label: 'Artes', path: '/courses/artes' },
                { label: 'Contabilidad', path: '/courses/contabilidad' },
                { label: 'Salud', path: '/courses/salud' },
                { label: 'Tecnología', path: '/courses/tecnología' },

            ]
        },
        {
            label: 'Galería',
            path: '/galeria',
        },
    ]

    const dynamicAccountElement = (status) => {
        if (status == 'authenticated') {
            return (
                <>
                    <a className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        { session?.user?.name?.toLocaleUpperCase() }
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                        <li><button className="dropdown-item" onClick={() => router.push('/courses')}>Mis cursos</button></li>
                        <hr></hr>
                        
                        <li><button className="dropdown-item" href="#">Perfil</button></li>
                        <li><button className="dropdown-item" onClick={() => signOut()}>Logout</button></li>
                    </ul>
                </>
            )
        } else {
            return (
                <>
                    <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Cuenta
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                        <li><button className="dropdown-item" onClick={() => router.push('/account?login=false')}>Registrar</button></li>
                        <li><button className="dropdown-item" onClick={() => router.push('/account?login=true')}>Ingresar</button></li>
                    </ul>
                </>
            )
        }
    }
    const dynamicMenu = () => {
        return (
            <ul className="navbar-nav">
                {   menuConfig.map((item, index) => {
                        return (
                            item?.children ? 
                            <>
                                <li className="nav-item dropdown" key={index}>
                                    <Link className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {item.label}
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        { item.children.map((child, n) => <li key={n}><Link className="dropdown-item" href={child.path}>{child.label}</Link></li>) }
                                    </ul>
                                </li>
                            </> :
                            <>
                                <li className="nav-item" key={index}>
                                    <Link className="nav-link" href={item.path}>{item.label}</Link>
                                </li>
                            </> 
                        )
                    }) 
                }
                <li className="nav-item dropdown account">
                    { dynamicAccountElement(status) }
                </li>
            </ul>
        )
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">
                        <img src="/UBC.png" className="d-inline-block" height="30px"/>
                    </Link>    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        { dynamicMenu() }
                    </div>
                </div>
            </nav>
        </>
    )
}