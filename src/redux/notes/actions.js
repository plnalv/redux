import fetchAPI from '../../util/fetchAPI'

export const getNotes = (authorId) => async (dispatch) => {
    try {
        dispatch({ type: 'NOTES/LOADING' })
        const params = new URLSearchParams({ authorId }).toString()
        const notes = await fetchAPI.get(`/notes?${params}`)
        dispatch({ type: 'NOTES/SET', payload: notes })
    } catch (err) {
        dispatch({ type: 'NOTES/ERROR', payload: err.toString() })
    }
}

export const deleteNote = (noteId) => (dispatch) => {
    fetchAPI
        .delete(`/notes/${noteId}`)
        .then(() => {
            dispatch({ type: 'NOTES/DELETE', payload: noteId })
        })
        .catch((err) => console.error('Error deleting note:', err))
}
