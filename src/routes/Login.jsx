import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/user/actions'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    function handleLogin() {
        dispatch(getUser({ email, password })).then(
            () => navigate('/home'),
            (err) => setError(err?.toString())
        )
    }

    return (
        <div className="prose flex flex-col gap-5">
            <h1>Login</h1>
            <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <Link to="/signup">Sign Up</Link>

            {error && <div className="text-red-600">{error}</div>}
        </div>
    )
}
