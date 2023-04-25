import { useContext, useState } from "react"
import loginRequest from "../api/loginRequest"
import { useNavigate } from "react-router-dom"
import { TokenContext } from "../App"

export const LoginPage = () => {

    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useContext(TokenContext)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        loginRequest(password)
        .then(({token}) => {
            setToken(token)
            navigate('/')
        }).catch(err => {
            setError(err.message)
        })
    }
  return (
    <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <span>{error}</span>
        <input  type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button>Login</button>
    </form>
  )
}
