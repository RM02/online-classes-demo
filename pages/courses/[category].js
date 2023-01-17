import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import HeaderComponent from "../../components/header";
import Card from "../../components/cardComponent";
import Footer from "../../components/footer";
import styles from "../../styles/Home.module.css";
import CardSkeleton from "../../components/cardSkeleton";

export default function Category () {
    const router = useRouter();
    const [courses, setCourses] = useState();
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    const API = process.env.NEXT_PUBLIC_API_URL;

    const getCourses = () => {
        setLoading(true)
        fetch(`${API}/courses/getAll`)
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                setLoading(false)
                setCourses(data.data)
            }, 2000)
        })
    }
    const subscribe = (item) => {
        alert("Se ha inscrito en este curso")
    }
    const renderCategoryElements = (data) => {
        return data.map((item, index) => <Card data={item} showContent={true} key={index}></Card>)
    }
    useEffect(() => {
        getCourses()
    }, [])
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <div className="container">
                <div className={styles.layout}>
                    <p className={styles.subtitle}>{ router?.query?.category?.toUpperCase() }</p>
                    <div className={styles.grid}>
                        { loading ? <CardSkeleton></CardSkeleton> : renderCategoryElements(courses) }
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>        
    )   
}