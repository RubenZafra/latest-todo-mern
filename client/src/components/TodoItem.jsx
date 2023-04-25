import { useContext, useEffect, useState, useCallback } from 'react';
import { useQueryClient , useMutation} from 'react-query'
import updateTodoRequest from '../api/updateTodoRequest';
import deleteTodoRequest from '../api/deleteTodoRequest';
import { debounce } from 'lodash'
import { TokenContext } from '../App';

export const TodoItem = ({todo} ) => {

    const [text, setText] = useState(todo.text);
    const [token] = useContext(TokenContext)

    // console.log(token)


    const queryClient = useQueryClient();

    
    const {mutate: updateTodo} = useMutation(
        (updatedTodo) =>  updateTodoRequest(updatedTodo, token), 
        {
        onSettled: () => {
            queryClient.invalidateQueries('todos')
        }
    })

    
    
    const {mutate: deleteTodo} = useMutation(
        (updatedTodo) =>  deleteTodoRequest(updatedTodo, token), 
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos')
            }
        })
        
    const debouncedUpdateTodo = useCallback(debounce(updateTodo, 1000), [updateTodo])
    
    useEffect(() => {
      if (text !== todo.text) {
        debouncedUpdateTodo({
           ...todo, 
            text
        })
      }
      
    }, [text])
    
 

  return (
    <div>
        <input 
            checked={todo.completed} 
            type="checkbox" 
            onChange={() => updateTodo({...todo, completed: !todo.completed})}
        />
        <input  
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)} 
        />
        <button
            onClick={() =>deleteTodo(todo)}
        >Delete</button>
     </div>
  )
}
