import { useState } from "react";

export default function DynamicForm ({ isLogIn, getData }) {

    const [name, setName] = useState()
    const [last_name, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPasswrod] = useState()

    const dynamicToolbar = (isLogIn) => {
        const dynamicLabel = isLogIn ? "Ingresar" : "Registrar"
        return (
            <div>
                <div className="mb-3 form-check">
                    <label className="form-check-label" htmlFor="exampleCheck1">Recordar</label>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                </div>
                <button type="submit" className="btn btn-light" onClick={() => sendData(dynamicLabel)}>{ dynamicLabel }</button>
                <button className="btn btn-danger mx-3" onClick={() => router.push('/')}>Cancelar</button>
            </div>
        )
    }
    const dynamicInput = (isLogIn) => {
        return (
                <form>
                    { isLogIn ?
                        <>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Correo electronico</label>
                                <input onInput={({ target }) => setEmail(target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">No compartiremos tus datos con alguien más.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input onInput={({ target }) => setPasswrod(target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                        </> :
                        <>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
                                <input onInput={({ target }) => setName(target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Apellido</label>
                                <input onInput={({ target }) => setLastName(target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Correo electronico</label>
                                <input onInput={({ target }) => setEmail(target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">No compartiremos tus datos con alguien más.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input onInput={({ target }) => setPasswrod(target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                        </>
                    }
                </form>
        )
    }
    const sendData = (event) => {
        getData({ 
            event: event,
            data: {name, last_name, password, email} 
        })
    }
    return (
        <>  
            { dynamicInput(isLogIn) }
            { dynamicToolbar(isLogIn) }
        </>
    )
} 