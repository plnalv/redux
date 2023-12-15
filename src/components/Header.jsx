import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { selectUserEmail } from '../redux/user/selectors'
import { logOutUser } from '../redux/user/actions'

export default function Header() {
    const location = useLocation()
    const userEmail = useSelector(selectUserEmail)

    const dispatch = useDispatch()

    function handleLogOut(){
        dispatch(logOutUser())
    }

    return (
        <div className="flex flex-row justify-between">
            <h1>Hello, {userEmail}</h1>
            <header className="flex flex-row gap-10">
                <Link
                    to="/home"
                    className={`font-medium ${
                        location.pathname === '/home'
                            ? 'text-[#000000]'
                            : 'text-[#a1a1a1] hover:text-[#000000]'
                    }`}
                >
                    Home
                </Link>
                <Link
                    to="/notes"
                    className={`font-medium ${
                        location.pathname === '/notes'
                            ? 'text-[#000000]'
                            : 'text-[#a1a1a1] hover:text-[#000000]'
                    }`}
                >
                    Notes
                </Link>
                <Link
                    to="/"
                    className={`font-medium ${
                        location.pathname === '/'
                            ? 'text-[#000000]'
                            : 'text-[#a1a1a1] hover:text-[#000000]'
                    }`}
                    onClick={handleLogOut}
                >
                    Log out
                </Link>
            </header>
        </div>
    )
}
