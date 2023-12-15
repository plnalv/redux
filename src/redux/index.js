import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userReducer } from './user/reducer'
import { notesReducer } from './notes/reducer'
import { thunk } from 'redux-thunk'
import { noteReducer } from './note/reducer'


const rootReducer = combineReducers({
    user: userReducer,
    notes: notesReducer,
    note: noteReducer,
})

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage,
        whitelist: ['user']
    }, 
    rootReducer
)

const store = createStore(
    persistedReducer,
    window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.(applyMiddleware(thunk))
)

export default store
export const persistor = persistStore(store)