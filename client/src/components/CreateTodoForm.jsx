import { useMutation, useQueryClient } from "react-query"
import createTodoRequest from "../api/createTodoRequest"
import { useContext, useState } from "react"
import { TokenContext } from "../App"

const CreateTodoForm = () => {

    const [text, setText] = useState('')
    const [token] = useContext(TokenContext)


    const queryClient = useQueryClient()

    const {mutate: createTodo} = useMutation(
        (newTodo) =>  createTodoRequest(newTodo, token), 
        {
        onSettled: () => {
            queryClient.invalidateQueries('todos')
        }
    })
  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        if(!text) return;
        createTodo({
            text
        })
        setText('')
    
    }}>
        <input onChange={e => setText(e.target.value)} value={text} type="text" placeholder='Add Todo'/>
        <button>Add</button>
    </form>
  )
}

export default CreateTodoForm