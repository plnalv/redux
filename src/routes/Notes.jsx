import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserEmail, selectUserId } from '../redux/user/selectors'
import {
    selectNotes,
    selectNotesError,
    selectNotesLoading,
} from '../redux/notes/selectors'
import { deleteNote, getNotes } from '../redux/notes/actions'

export default function Notes() {
    const authorId = useSelector(selectUserId)
    const userEmail = useSelector(selectUserEmail)
    const notes = useSelector(selectNotes)
    const loading = useSelector(selectNotesLoading)
    const error = useSelector(selectNotesError)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNotes(authorId))
    }, [authorId, dispatch])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    function handleDeleteNote(noteId) {
        dispatch(deleteNote(noteId))
    }

    return (
        <div className="flex flex-col gap-5">
            <Header userEmail={userEmail} />
            <div className="text-center pb-10">
                <p className="text-[2em] font-medium pb-10">Notes</p>
                <Link to="/notes/newNote">
                    <button
                        type="button"
                        className="bg-[#d1d1d1] p-2 w-[15em] rounded-lg font-medium hover:bg-[#949494] hover:text-white"
                    >
                        Add new note
                    </button>
                </Link>
            </div>
            <ul className="flex flex-col gap-5">
                {notes?.map((note) => (
                    <li
                        key={note.id}
                        className="relative bg-[#d1d1d1] p-2 overflow-hidden"
                    >
                        <Link to={`/notes/${note.id}`}>
                            <p className="font-medium line-clamp-1">
                                {note.title}
                            </p>
                            <p>
                                {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                        </Link>
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                            <Link to={`/notes/${note.id}/edit`}>
                                <button
                                    type="button"
                                    className="bg-[#d1d1d1] p-2 rounded-lg hover:bg-[#949494]"
                                >
                                    ✍️
                                </button>
                            </Link>
                            <button
                                type="button"
                                className="bg-[#d1d1d1] p-2 rounded-lg hover:bg-[#949494]"
                                onClick={() => handleDeleteNote(note.id)}
                            >
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
