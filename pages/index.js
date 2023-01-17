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
    fetch(`${API}/courses/getAll`)
    .then((response) => response.json())
    .then((response) => {
      if (response?.data) {

        const data = response.data?.filter((item) => item?.subscriptions?.length >= 1)
        setTimeout(() => {
          setPromo(data)
          setCourses(response?.data)
          getCategories(response?.data)
          setLoading(false)
        }, 2000);
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
          { !loading && categories?.map((category) => <li className={styles.text_secondary}> {category} </li>) }
        </ul>
      </>
    )
  }
  const renderContentByCategory = (category, data) => {
    return (
      <>
        {
          data?.map((item) => {
            if (item.category == category) {
              return (
                <Card data={item} showContent={false}></Card>
              )
            }
          })
        }
      </>
    )
  }

  const renderCoursesByCategory = () => {
    return (
      <>
        { categories?.map((category) => {
            return (
              <>
                <div>
                  <div className={styles.subtitle}>{category}</div>
                  <div className={styles.grid}>
                    { renderContentByCategory(category, courses) }
                  </div>
                </div>
                <div></div>
              </>
            )
          })
        }
        { loading && 
          Array(3).fill().map((item) => <>
              <div>
                <div className={styles.subtitle}>
                </div>
                <div className={styles.grid}>
                  <BodySkeleton></BodySkeleton>
                </div>
              </div>
              <div></div>
          </>
          )
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
              <h1 className={styles.title}>Universidad Bolivariana de las Comunas</h1>
              <p className={styles.text}>Adquiere un programa, curso y/o licenciatura en alguna de las carreras que ofrecemos. Registrarte en nuestra plataforma y accede a toda la información que tenemos para ti.</p>
              <div className={styles.join}>
                <a type="button" className="btn btn-warning" href="/account?login=false">Acceder</a>
              </div>
            </div>
            <div className={styles.videoIntro}>
              <video className={styles.video} src='/intro.mp4' autoPlay></video>
            </div>
          </div>
          <div className={styles.content}>
            <div>
              { renderList() }
            </div>
            { renderCoursesByCategory() }
          </div>
          <div className={styles.block}>
            <h1 className={styles.subtitle}>Cursos más populares</h1>
            <div className={styles.grid}>
              { promo?.map((item) => {
                return (

                      <div className="card">
                          <img className="card-img-top" src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg" alt="Card image cap"/>
                          <div className="card-body">
                              <div className="card-title mb-2">{item.subject}</div>
                              <div className="card-subtitle text-muted mb-2">Descripción | {item.description}</div>
                          </div>
                      </div>
                  )
                })
              }
            </div>
          </div>
        </main>
      </div>

      <Footer></Footer>
    </>
  )
}
