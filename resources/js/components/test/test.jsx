import React, {useState, useEffect, useRef, useMemo, useReducer} from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
// Switch



function Header(props)
{
    return <header>
        <h1>
            <Link onClick={(e)=>{
                props.onChangeMode();
            }}>{props.title}</Link>
        </h1>
    </header>;
}

function Nav(props)
{

    // 메뉴 루프로 입력
    let res = [];
    for (const p of props.topics) {
        res.push(<li key={p.id}>
            <Link key={p.id} id={p.id} href={`/read/${p.id}`} onClick={(e)=>{
                
                props.onChangeMode(Number(e.target.id));
            }}>
                {p.title}
            </Link>
        </li>);
    }

    return <nav>
        <ol>
            {res}
        </ol>
    </nav>
}

/**
 * 게시글
 */
function Article(props)
{
    return <article>
        <h2>{props.title}</h2>
        {props.body}
        
        <CheckInput></CheckInput>
    </article>
}

/**
 * 생성폼
 */
function Create(props)
{
    return <article>
        <h2>Create</h2>
        <form onSubmit={e=>{
            
            let title = e.target.title.value;
            let body = e.target.body.value;
            props.onCreate(title, body);
        }}>
            <p><input type="text" name="title" placeholder='title' /></p>
            <p><textarea name="body" placeholder='body'></textarea></p>
            <p><button>Create</button></p>
        </form>
    </article>

}

/**
 * 수정폼
 */
function Update(props){

    let [title, setTitle] = useState(props.title);
    let [body, setBody] = useState(props.body);

    return <article>
        <h2>Update</h2>
        <form onSubmit={e=>{
            
            let title = e.target.title.value;
            let body = e.target.body.value;
            props.onUpdate(title, body);
        }}>
            <p><input type="text" name="title" placeholder='title' value={title} onChange={e=>{
                setTitle(e.target.value);
            }} /></p>
            <p><textarea name="body" placeholder='body' value={body} onChange={e=>{
                setBody(e.target.value);
            }}></textarea></p>
            <p><button>Update</button></p>
        </form>
    </article>
}

function CheckInput()
{
    let nameInput = useRef();
    let click = e=>{
        
        nameInput.current.focus();
    };


    let now;

    let memo = useMemo(()=>{
        console.log('memo')
        return now;
    },[now]);


    return <div>
        <div style={{ display: 'block' }} data-toggle="show">
            <input ref={nameInput} />
            <button onClick={click}>클릭</button>
        </div>
        <div>
            <button onClick={e=>{
                

                let target = document.querySelector('[data-toggle=show]');
                let display = target.style.display;

                let toggle = ['block','none'];
                let i = toggle.indexOf(display);
                now = toggle[i+1] ?? toggle[0];

                target.style.display = now;

            }}>토글 {memo} </button>
        </div>
    </div>
}


function myreducer(state, action)
{
    console.log(state,action);
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }

}


function Counter()
{
    let [n, dispatch] = useReducer(myreducer, 0);
    let onIncrease = ()=>{
        dispatch({type: 'INCREMENT'});
    };
    let onDecrement = ()=>{
        dispatch({type: 'DECREMENT'});
    };

    return <div>
        <h1>{n}</h1>
        <button type="button" onClick={onIncrease}>+</button>
        <button type="button" onClick={onDecrement}>-</button>
        <button onClick={()=>{ dispatch({type: '+'}) } }>*</button>
    </div>
}


function App ()
{

    console.log('app')
    // state 사용해서 Article 적용
    let [ mode, setMode ] = useState('WELCOME');
    let [ id, setId ] = useState(null);

    useEffect(()=>{
        console.log('effect',id)

        return ()=>{
            console.log('clean up',id);
        }
    },[id]);


    let [topics, setTopics] = useState([
        {id:1, title:'html', body: 'html is ...'},
        {id:2, title:'css', body: 'css is ...'},
        {id:3, title:'javascript', body: 'js is ...'}
    ]);

    let [nextId, setNextId] = useState(4);

    let nextRef = useRef({id:4});
    console.log(nextRef);

    // 내용, 수정 선언
    let content, contextControl;
    if ( mode === 'WELCOME' )
    {
        content = <Article title="Welcome" body="Hello, WEB"></Article>
    }
    else if( mode === 'READ')
    {
        let title, body;
        for (const t of topics) {
            if ( t.id === id )
            {
                title = t.title;
                body = t.body;
            }
        }
        content = <Article title={title} body={body}></Article>
        contextControl = <li><a href={'update'+id} onClick={e=>{
            
            setMode('UPDATE');
        }}>Update</a></li>
    }
    else if( mode === 'CREATE')
    {
        // 생성
        content = <Create onCreate={(_title, _body)=>{
            let newTopic = {id: nextId, title:_title, body: _body};
            let newTopics = [... topics];
            newTopics.push(newTopic);

            // 전체토픽 통으로 세팅하네
            setTopics(newTopics);
            setMode('READ');
            setId(nextId);
            setNextId(nextId+1);
        }}></Create>
    }
    else if( mode === 'UPDATE'){
        let title, body;
        for (let t of topics) {
            if ( t.id == id )
            {
                title = t.title;
                body = t.body;
            }
        }

        content = <Update title={title} body={body} onUpdate={(title, body)=>{
            let newTopics = [...topics];
            let updatedTopic = {id: id, title: title, body: body};

            for (let i = 0; i < newTopics.length; i++) {
                let t = newTopics[i];
                if ( t.id === id )
                {
                    t = updatedTopic;
                    break;
                }
                
            }

            setTopics(newTopics);
            setMode('READ');
        }}></Update>
    }

    return(
        <div>
            <Header title="WEB" onChangeMode={()=>{
                setMode('WELCOME');
            }}></Header>
            <Nav topics={topics} onChangeMode={(_id)=>{
                setMode('READ');
                setId(_id);
            }}></Nav>
            {content}
            <a href="/create" onClick={e=>{
                
                setMode('CREATE');
            }}>Create</a>
            {contextControl}


            <Counter></Counter>
            
        </div>
    );

}


export default App;

let target = document.querySelector('#root');
if ( target )
{
    ReactDOM.createRoot(target).render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )
}

