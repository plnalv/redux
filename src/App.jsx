import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './routes/Layout'
import Login from './routes/Login'
import Home from './routes/Home'
import SignUp from './routes/SignUp'
import Notes from './routes/Notes'
import Note from './routes/Note'
import CreateNote from './routes/CreateNote'
import RequireAuth from './components/RequireAuth'
import Error404 from './routes/Error404'
import EditNote from './routes/EditNote'

import { Provider } from 'react-redux'
import store, { persistor } from './redux'
import { PersistGate } from 'redux-persist/integration/react'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/home',
                element: (
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                ),
            },
            {
                path: '/notes',
                element: (
                    <RequireAuth>
                        <Notes />
                    </RequireAuth>
                ),
            },
            {
                path: '/notes/:id',
                element: (
                    <RequireAuth>
                        <Note />
                    </RequireAuth>
                ),
            },
            {
                path: '/notes/newNote',
                element: (
                    <RequireAuth>
                        <CreateNote />
                    </RequireAuth>
                ),
            },
            {
                path: '/notes/:id/edit',
                element: (
                    <RequireAuth>
                        <EditNote />
                    </RequireAuth>
                ),
            },
            {
                path: '/*',
                element: <Error404 />,
            },
        ],
    },
])

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    )
}
