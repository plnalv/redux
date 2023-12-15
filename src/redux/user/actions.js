import fetchAPI from '../../util/fetchAPI'

export const getUser =
    ({ email, password }) =>
    async (dispatch) => {
        const query = new URLSearchParams({
            email,
            password,
        }).toString()

        try {
            const users = await fetchAPI.get(`/users?${query}`)
            const user = users[0]
            if (user) {
                dispatch({ type: 'USER/SET', payload: user })
            } else {
                throw new Error('Invalid user')
            }
        } catch (error) {
            dispatch({ type: 'USER/SET/ERROR', payload: error.toString() })
        }
    }

export const signUpUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: 'USER/SET/LOADING' })

        const newUser = await fetchAPI.post('/users', user)
        dispatch({ type: 'USER/SET', payload: newUser })
    } catch (error) {
        dispatch({ type: 'USER/SET/ERROR', payload: error.toString() })
    }
}

export const logOutUser = () => (dispatch) => {
    dispatch({ type: 'USER/LOG_OUT' })
}
