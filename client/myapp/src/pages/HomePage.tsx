import {useEffect, useMemo, useState} from 'react'
import './App.css'

interface Todo {
    text: string;
    done: number;
}

let id = 1
let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer 777`,
}

function HomePage() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [filterType, setFilterType] = useState<number>(0);

    useEffect(()=>{
        onGetTodoList()
    },[])

    const onGetTodoList= async ()=>{
        await fetch("http://localhost:3000/api/getTodoList")
            .then(response=>response.json())
            .then(data=>{
                setTodos(data)
            })
            .catch(err=>{
                console.log(err,'err')
            })
    }


    const handleDeleteTodo = (id: number): void => {
        const filteredTodos = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodos);

        const params={
            id: id
        }

        fetch('http://localhost:3000/api/deleteTodo', {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(params)
        })
            .then( (response) => response.json())
            .then( (json) => console.log(json));

    };

    const handleTodoStatus = async (id: number, done: number)=> {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, done: done === 0 ? 1 : 0 } : todo
        );
        setTodos(updatedTodos);

        const params ={
            id: id,
            done:  done === 0 ? 1 : 0
        }


        fetch('http://localhost:3000/api/toggleTodo', {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(params)
        })
            .then( (response) => response.json())
            .then( (json) => console.log(json));
    };

    
    const handleFilter=(type: number)=>{
        setFilterType(type)
    }

    const submit=async ()=>{

        const params={
            text: inputText
        }

        fetch('http://localhost:3000/api/addTodo', {
            method: "POST",
            headers: headers,
            body: JSON.stringify(params)
        })
            .then( (response) => response.json())
            .then( (json) => console.log(json));

        if (inputText.trim() !== '') {
            const newTodo: Todo = {
                text: inputText,
                done: 0,
            };
            setTodos([...todos, newTodo]);
            setInputText('');
        }
    }

    const filteredData = useMemo(() => {
        let updatedTodos: Todo[] = [];
        if (filterType === 0) {
            updatedTodos = todos;
        } else if (filterType === 1) {
            updatedTodos = todos.filter(todo => todo.done === 1);
        } else if (filterType === 2) {
            updatedTodos = todos.filter(todo => todo.done === 0);
        }
        return updatedTodos
    }, [filterType, todos]);


    return (
        <div className="border py-4 px-8 flex flex-col justify-between" style={{width: 500, height: 400, borderRadius: '3%'}}>
            <div className="flex mb-2">
                <input className="border rounded-3xl border-amber-200 flex-1 mr-6"
                       value={inputText}
                       onChange={(e)=>setInputText(e.target.value)}
                />
                <button className="btn form__submit-btn" type="submit"  onClick={submit}>Add</button>
            </div>
            <div style={{overflow: "scroll", overflowX: 'hidden', flex: 1, marginBottom: 8, position: 'relative'}}>
                {
                    filteredData.map((item)=>{
                        console.log(item,'www');
                        
                        return (
                            <div key={item.id} className={"item flex justify-between items-center py-2" + " " +(item.done === 1 && " lineThrough")}>
                                <button onClick={()=>handleTodoStatus(item.id, item.done)}>
                                    {item.done === 1 ? 'V':'O'}
                                </button>
                                <div className="content">{item.text}</div>
                                <button onClick={()=>handleDeleteTodo(item.id)}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-between">
                <button
                    className="btn filters__btn filters__btn--all"
                    onClick={()=>handleFilter(0)}
                >
                    All
                </button>
                <button
                    className="btn filters__btn filters__btn--complete"
                    onClick={()=>handleFilter(1)}
                >
                    Complete
                </button>
                <button
                    className="btn filters__btn filters__btn--incomplete"
                    onClick={()=>handleFilter(2)}
                >
                    Incomplete
                </button>
            </div>
        </div>
    )
}

export default HomePage
