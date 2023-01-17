import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import HeaderComponent from "../../components/header"
import useAppContext from '../../contexts/context';
import DynamicForm from '../../components/dynamicForm';
import { getToken } from 'next-auth/jwt';
import { useSession, signIn } from "next-auth/react"

export default function Account () {
    
    const router = useRouter()
    const [isLogIn, setIsLogin] = useState();
    const [isBadRequest, setIsBadRequest] = useState(false);

    const { isAuth, setIsAuth, setUser } = useAppContext();

    const { data: session, status } = useSession()

    const API = process.env.NEXT_PUBLIC_API_URL;

    const dynamicFormHandler = (data) => {
        
        const event = data.event;
        
        switch (event) {
            case "Ingresar":
                login(data.data)
                break
            case "Registrar":
                register(data.data)
                break
            default:
                break
        }
    }
    const login = async (data) => {
        const response = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })
        if (response.ok) {
            router.push("/courses")
        }
    }
    const register = async (data) => {
        fetch(`${API}/user/create`, {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.ok) {
                login(data)
            }
        })
    }

    useEffect(() => {
        const login = router.query.login?.includes('true') ? true : false
        setIsLogin(login)
    },[router])

    return (
        <>
            <HeaderComponent isAuth={isAuth}></HeaderComponent>
            <div className="container">
                <div className="layout layout-account">
                    <DynamicForm isLogIn={isLogIn} getData={dynamicFormHandler}/>
                </div>
            </div>
        </>
    )
}