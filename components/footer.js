import styles from '../styles/Home.module.css'

export default function Footer () {
    const now = () => {
        return new Date().getFullYear()
    }
    return (
        <>
            <div className={styles.footer}>
                <p>Copyright © { now() } Enerü Tecnology. Todos los derechos reservados.</p>
            </div>
        </>
    )
}