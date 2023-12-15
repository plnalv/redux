const DEFAULT_STATE = {
    data: null,
    loading: false,
    error: null,
}

export function userReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case 'USER/SET/LOADING':
            return {
                ...state,
                loading: true,
                error: null,
            }
        case 'USER/SET':
            return {
                data: action.payload,
                loading: false,
                error: null,
            }
        case 'USER/LOG_OUT':
            return {
                ...DEFAULT_STATE,
            }
        case 'USER/SET/ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
