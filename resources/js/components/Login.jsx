import React, {useState, useEffect, useRef, useMemo, useReducer} from 'react';




function Login(pr){
    let row = {
        
    };

    return <form action="">
        <fieldset>
            <legend>로그인</legend>
            <p>
                <label>
                    아이디
                    <input type="text" name="id" />
                </label>
            </p>
            <p>
                <label>
                    비밀번호
                    <input type="password" name="pwd" />
                </label>
            </p>
            <p>
                <button>로그인</button>
            </p>
        </fieldset>
    </form>
}

export default Login;