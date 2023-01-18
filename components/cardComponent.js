export default function Card ({ data, onEvent, showContent=false }) {

    return (
        <>
            <div className="card p-0">
                <img className="card-img-top" src={data.imgUrl ? data.imgUrl : "https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg"} alt="Card image cap"/>
                <div className="card-body">
                    <div className="d-flex justify-content-end text-muted">{ data.published ? "Disponible": "No Disponible" } | {data.category}</div>
                    <div className="card-title mt-4">{data.subject}</div>
                        { showContent && <>
                                            <div className="card-subtitle text-muted mt-2 mb-2">Código | {data.id}</div>
                                            <div className="card-subtitle text-muted mb-2">{data.published}</div>
                                            <div className="card-subtitle text-muted mt-2 mb-4">{data.description}</div>                                        
                                            <hr></hr>
                                            <div className="d-flex justify-content-end">
                                                <button type="button" className="card-link btn btn-light" onClick={() => onEvent('join')}>Unirse</button>
                                            </div>
                                        </>
                        }
                    </div>
            </div>
        </>
    )
}