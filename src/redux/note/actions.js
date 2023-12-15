import fetchAPI from '../../util/fetchAPI'

export const getNote = (noteId) => async (dispatch) => {
    try {
        dispatch({ type: 'NOTE/LOADING' })
        const note = await fetchAPI.get(`/notes/${noteId}`)
        dispatch({ type: 'NOTE/SET', payload: note })
    } catch (err) {
        dispatch({ type: 'NOTE/ERROR', payload: err.toString() })
    }
}

export const delNoteFromNotePage = (noteId) => async (dispatch) => {
    try {
        dispatch({ type: 'NOTE/LOADING' })
        await fetchAPI.delete(`/notes/${noteId}`)
        dispatch({ type: 'NOTE/DELETE', payload: noteId })
    } catch (err) {
        dispatch({ type: 'NOTE/ERROR', payload: err.toString() })
    }
}

export const updateNote = (noteId, updatedNote) => async (dispatch) => {
    try {
        dispatch({ type: 'NOTE/LOADING' })
        const note = await fetchAPI.put(`/notes/${noteId}`, updatedNote)
        dispatch({ type: 'NOTE/SET', payload: note })
    } catch (err) {
        dispatch({ type: 'NOTE/ERROR', payload: err.toString() })
    }
}
