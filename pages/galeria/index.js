import styles from "../../styles/Home.module.css"
import HeaderComponent from "../../components/header"
import Footer from "../../components/footer"

export default function Galeria () {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <div className="container">

                <div className={styles.layout}>
                    <div className={styles.galeria}>
                        <div className={styles.galeryCard}>
                            <img className={styles.galeryCard} src="https://www.comunas.gob.ve/wp-content/uploads/2022/07/IMG_20220727_220707_920.jpg" />
                            <div className={styles.cardDetail}>Entrega de titulos | Promoción 2022</div>
                        </div>
                        <div className={styles.galeryCard}>
                            <img className={styles.galeryCard} src="https://www.vtv.gob.ve/wp-content/uploads/2021/01/Cortesia-@CTrompiz2-1-800x445.jpg"></img>
                            <div className={styles.cardDetail}>Sala de prensa</div>
                        </div>
                        <div className={styles.galeryCard}>
                            <img className={styles.galeryCard} src="https://www.comunas.gob.ve/wp-content/uploads/2022/11/delgadovicerichard.jpeg"></img>
                            <div className={styles.cardDetail}>Reunión de reactores</div>
                        </div>
                        <div className={styles.galeryCard}>
                            <img className={styles.galeryCard} src="https://www.comunas.gob.ve/wp-content/uploads/2022/07/IMG_20220722_173607_565.jpg"></img>
                            <div className={styles.cardDetail}>Reunión de profesores</div>
                        </div>
                        <div className={styles.galeryCard}>
                            <img className={styles.galeryCard} src="https://pbs.twimg.com/media/FmCwGGcXEAAS79A?format=jpg&name=900x900"></img>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}