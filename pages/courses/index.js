import Head from 'next/head';
import { useState, useEffect } from 'react';
import useAppContext from '../../contexts/context';

import styles from '../../styles/Home.module.css';

import HeaderComponent from "../../components/header";
import Footer from "../../components/footer";
import { useSession } from 'next-auth/react';

export default function Courses () {
    const [courses, setCourses] = useState(null);
    const { data: session } = useSession();
    
    const API = process.env.NEXT_PUBLIC_API_URL;

    const getCourses = (id) => {
        if (id)
        fetch(`${API}/user/${id}`)
        .then((res) => res.json())
        .then((response) => {
            const subscriptions = response?.data[0]?.subscriptions;
            const courses = subscriptions?.map(item => item?.courses[0])
            setCourses(courses)
        })
    }

    const renderCourses = () => {
        const children = courses?.map((item) => 
            <div className="card">
                <div className="card-body">
                    <div className="card-title"> { item?.subject?.toUpperCase() } </div>
                    <div className="card-subtitle"> { item?.category } </div>
                    <p className="card-text"> { item?.description } </p>
                </div>
            </div>
        )
        return (children)
    }

    useEffect(() => {
        if (session?.user?.id) {
            getCourses(session?.user?.id)
        }
    }, [session])

    return (
        <>
            <Head>
                <title>UBC | Mis Cursos</title>
                <meta name="description" content="UBC | Mis cursos" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderComponent></HeaderComponent>
            <div className="container">
                <div className={styles.layout}>
                    { JSON.stringify(session?.user) }
                    <p className={styles.subtitle}>Mis cursos</p>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">Todos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">En curso</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" data-bs-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Completados</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="home-tab">
                            { courses ? renderCourses() : <h3>No hay cursos registrados</h3> }
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            { courses ? renderCourses() : <h3>No hay cursos registrados</h3> }
                        </div>
                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            { courses ? renderCourses() : <h3>No hay cursos registrados</h3> }
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}