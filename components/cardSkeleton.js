import Skeleton from 'react-loading-skeleton'

export default function CardSkeleton ({n = 6}) {

    return (
        <>
            { Array(n).fill().map((item, index) => {
                return (
                            
                        <div className='col-sm' key={index}>
                            <div>
                                <Skeleton duration={1} height={200}></Skeleton>
                            </div>
                            <div>
                                <div>
                                    <Skeleton count={2} height={15}></Skeleton>
                                </div>
                            </div>
                            <div>
                                <Skeleton count={1} height={15}></Skeleton>
                            </div>                
                        </div>
                    )
                })
            }
        </>
            
    )
}