export default function Card ({ data, onEvent, showContent=false }) {

    return (
        <>
            <div className="card">
                <img className="card-img-top" src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg" alt="Card image cap"/>
                <div className="card-body">
                    <div className="card-title mb-2">{data.subject}</div>
                        { showContent && <>
                                            <div className="card-subtitle text-muted mt-2 mb-2">Código | {data.id}</div>
                                            <div className="card-subtitle text-muted mb-2">Descripción | {data.description}</div>
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