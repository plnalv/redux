import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../util/validation'
import { signUpUser } from '../redux/user/actions'
import { useDispatch } from 'react-redux'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const navigate = useNavigate()
    const [passwordError, setPasswordError] = useState('')
    const [errors, setErrors] = useState(null)

    const dispatch = useDispatch()
    function handleSignUp() {
        if (password !== repeatPassword) {
            setPasswordError("Passwords don't match")
            return
        }
        setPasswordError('')

        try {
            const newUser = User.parse({
                email,
                password,
            })

            newUser.createdAt = Date.now()

            dispatch(signUpUser(newUser))
                .then(() => {
                    navigate('/')
                })
                .catch((err) => {
                    console.error('Error:', err)
                })
        } catch (error) {
            setErrors(error.formErrors.fieldErrors)
        }
    }

    return (
        <div className="prose flex flex-col gap-5">
            <h1>Sign Up</h1>
            <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email && (
                <div className="text-red-600">{errors?.email[0]}</div>
            )}
            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors?.password && (
                <div className="text-red-600">{errors?.password[0]}</div>
            )}
            <input
                placeholder="Repeat password"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {passwordError && (
                <div className="text-red-600">{passwordError}</div>
            )}
            <button onClick={handleSignUp}>Sign Up</button>
            <Link to="/">Login</Link>
        </div>
    )
}
