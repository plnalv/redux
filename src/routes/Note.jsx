import Header from '../components/Header'
import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Error404 from './Error404'
import { selectUserEmail } from '../redux/user/selectors'
import { getNote, delNoteFromNotePage } from '../redux/note/actions'
import { selectNote } from '../redux/note/selectors'
import { connect } from 'react-redux'

const Note = ({
    note,
    loading,
    error,
    userEmail,
    getNote,
    delNoteFromNotePage,
}) => {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getNote(id)
    }, [id, getNote])

    if (error) {
        return <Error404 />
    }

    if (loading) {
        return <div>Loading...</div>
    }

    function handleDeleteNote(noteId) {
        delNoteFromNotePage(noteId)
            .then(() => {
                navigate(`/notes`)
            })
            .catch((err) => console.error('Error deleting note:', err))
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
                <p className="text-[2em] font-medium pb-20">{note?.title}</p>
                <div>
                    <Link to={`/notes/${note?.id}/edit`}>
                        <button
                            type="button"
                            className="bg-[#d1d1d1] p-2 mr-2 rounded-lg hover:bg-[#949494]"
                        >
                            ✍️
                        </button>
                    </Link>
                    <button
                        type="button"
                        className="bg-[#d1d1d1] p-2 rounded-lg hover:bg-[#949494]"
                        onClick={() => handleDeleteNote(note?.id)}
                    >
                        🗑️
                    </button>
                </div>
            </div>
            <pre className="bg-[#d1d1d1] p-3 min-h-[20vh] break-words">
                {note?.text}
            </pre>
        </div>
    )
}

const mapStateToProps = (state) => ({
    note: selectNote(state),
    loading: state.note.loading,
    error: state.note.error,
    userEmail: selectUserEmail(state),
})

const mapDispatchToProps = (dispatch) => ({
    getNote: (noteId) => dispatch(getNote(noteId)),
    delNoteFromNotePage: (noteId) => dispatch(delNoteFromNotePage(noteId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Note)
