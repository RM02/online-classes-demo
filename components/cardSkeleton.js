import Skeleton from 'react-loading-skeleton'

export default function CardSkeleton ({n = 6}) {

    return (
        <>
            { Array(n).fill().map(item => {
                return (
                            
                        <div className='col-sm'>
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