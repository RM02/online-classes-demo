import Skeleton from 'react-loading-skeleton'
export default function BodySkeleton (n=3) {
    return (
        <>
            {
                Array(3).fill().map((item) => {
                    return (
                        <>
                            <div>
                                <div>
                                    <Skeleton duration={1} height={200} width={250}></Skeleton>
                                </div>
                                <div>
                                    <div>
                                        <Skeleton count={2} height={15} width={250}></Skeleton>
                                    </div>
                                </div>
                                <div>
                                    <Skeleton count={1} height={15} width={250}></Skeleton>
                                </div>                
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}