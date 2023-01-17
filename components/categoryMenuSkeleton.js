import Skeleton from 'react-loading-skeleton'
import styles from '../styles/Home.module.css'

export default function MenuSkeleton () {
    return (
        <>
            { Array(5).fill().map((item) => <div className='mb-4'> <Skeleton height={15} width="60%"></Skeleton> </div>) }
        </>
    )
}