import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css'
import HeaderComponent from '../components/header'
import useAppContext from '../contexts/context';
import Footer from '../components/footer';
import { useSession } from 'next-auth/react';
import Card from '../components/cardComponent';
import CardSkeleton from '../components/cardSkeleton';
import BodySkeleton from '../components/bodySkeleton';
import MenuSkeleton from '../components/categoryMenuSkeleton';
import Link from 'next/link';

export default function Home() {

  const router = useRouter();
  const { isAuth, setIsAuth } = useAppContext();
  const { data: session } = useSession();
  const [ courses, setCourses ] = useState();
  const [ promo, setPromo ] = useState();
  const [ loading, setLoading ] = useState();


  const [ categories, setCategories ] = useState();

  const API = process.env.NEXT_PUBLIC_API_URL;

  const navigate = (route) => {
    switch (route) {
      case "register":
      case "logIn":
        router.replace("/account", { query: { status: route } });
        break
    }
  }

  const getCourses = () => {
    setLoading(true)
    fetch(`${API}/course/getAll`)
    .then((response) => response.json())
    .then((response) => {
      if (response?.data) {

        const data = response.data?.filter((item) => item?.subscriptions?.length >= 1)
        setTimeout(() => {
          setPromo(data)
          setCourses(response?.data?.slice(0,6))
          getCategories(response?.data)
          setLoading(false)
        }, 1000);
      }
    })
  }

  const getCategories = (data) => {
    let obj = {}
    for (let item of data) {
      let key = item.category
      obj[key] = ""
    }
    setCategories(Object.keys(obj))
  }

  const renderList = () => {
    return (
      <>
        { !loading && <p className={styles.subtitle}>Categorías</p>}
        <ul>
          { loading && <MenuSkeleton></MenuSkeleton> }
          { !loading && categories?.map((category, index) => <li className={styles.text_secondary} key={index}> {category} </li>) }
        </ul>
      </>
    )
  }
  const renderCourses = (data) => {
    return (
      <>
        {
          data?.map((item, index) => {
            return (
              <div className={styles.box} key={index}>
                <Card data={item} showContent={true}></Card>
              </div>
            )
          })
        }
      </>
    )
  }
  useEffect(() => {
    getCourses()
  }, [])

  return (
    <>
      <Head>
        <title>UBC | Universidad Bolivariana de las Comunas</title>
        <meta name="description" content="Online courses" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent onPress={(data) => navigate(data)} isAuth={isAuth}></HeaderComponent>
      <div className="container">
        <main className={styles.layout}>
          <div className={styles.heading}>
            <div>
              <h1 className={styles.title}>Únase a la comunidad de estudiantes. </h1>
              <p className={styles.text}>Desarrolle las habilidades para dar forma al mundo.</p>
              <p className='mt-4'>Dondequiera que se encuentre en su carrera y en su vida, puede obtener acceso a profesores y colegas expertos, y obtener conocimientos de siguiente nivel para lograr sus objetivos.</p>
              <div className={styles.join}>
                <Link type="button" className="btn btn-light" href="/account?login=false">Acceder</Link>
              </div>
            </div>
            <div className={styles.videoIntro}>
              <video className={styles.video} src='/intro.mp4' autoPlay></video>
            </div>
          </div>
          <div className={styles.block}>
            <h2 className='text-center subtitle'>Categorías Populares</h2>
            <div className={styles.grid}>
              { categories?.map((item, index) => <div className={styles.box} key={index}>
                    <div className='card p-0'>
                      { item.includes('Turismo') && <img className="card-img-top" height={200} src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2021/04/turismo.jpg" alt="Card image cap"/>}
                      { item.includes('Informática') && <img className="card-img-top" height={200} src="https://concepto.de/wp-content/uploads/2015/08/informatica-1-e1590711788135.jpg" alt="Card image cap"/>}
                      { item.includes('Básico') && <img className="card-img-top" height={200} src="https://palt.es/wp-content/uploads/2021/07/matematicas.jpg" alt="Card image cap"/>}
                      
                      <div className='card-body'>
                        <div className='card-title text-center'>{item}</div>
                      </div>
                    </div>
                </div>
                )
              }
            </div>
          </div>
          <div className={styles.block}>
            <h2 className='text-center subtitle'>Cursos Profesionales</h2>
            <div className={styles.grid}>
              { renderCourses(courses) }
            </div>
          </div>
        </main>
      </div>

      <Footer></Footer>
    </>
  )
}
