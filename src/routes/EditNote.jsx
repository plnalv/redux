import { useEffect } from 'react'
import Header from '../components/Header'
import { useParams, Link, useNavigate } from 'react-router-dom'
import UpdatedNote from '../components/UpdatedNote'
import { selectNote } from '../redux/note/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserEmail } from '../redux/user/selectors'
import { getNote, updateNote } from '../redux/note/actions'
import Error404 from './Error404'

export default function EditNote() {
    const userEmail = useSelector(selectUserEmail)
    const note = useSelector(selectNote)
    const loading = useSelector((state) => state.note.loading)
    const error = useSelector((state) => state.note.error)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getNote(id))
    }, [id, dispatch])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <Error404 />
    }

    const updateNoteAction = async ({ title, text }) => {
        const trimmedTitle = title.trim()
        const trimmedText = text.trim()

        const updatedNote = {
            title: trimmedTitle,
            text: trimmedText,
            createdAt: note.createdAt,
            authorId: note.authorId,
        }

        dispatch(updateNote(id, updatedNote))
        .then(() => navigate(`/notes/${note.id}`))
    }

    return (
        <div className="flex flex-col gap-5">
            <Header userEmail={userEmail} />
            <div className="flex flex-row justify-between">
                <Link to="/notes">
                    <button
                        type="button"
                        className="bg-[#d1d1d1] p-2 rounded-lg font-medium hover:bg-[#949494] hover:text-white"
                    >
                        Back
                    </button>
                </Link>
                <p className="text-[2em] font-medium pb-20">Edit Note</p>
            </div>
            <div>
                <UpdatedNote
                    title={note.title}
                    text={note.text}
                    updateNoteAction={updateNoteAction}
                />
            </div>
        </div>
    )
}
