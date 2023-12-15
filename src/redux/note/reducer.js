const DEFAULT_STATE = {
    data: [],
    loading: false,
    error: null,
}

export const noteReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'NOTE/LOADING':
            return {
                loading: true,
                error: null,
                data: [],
            }
        case 'NOTE/SET':
            return {
                loading: false,
                error: null,
                data: action.payload,
            }
        case 'NOTE/DELETE':
            return {
                ...state,
                data: state.data.filter((note) => note.id !== action.payload),
            }
        case 'NOTE/ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
