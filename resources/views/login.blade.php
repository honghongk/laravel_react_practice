<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>로그인</title>


    </head>
    <body>

        
        <form action="">
            <fieldset>
                <legend>로그인</legend>
                <p>
                    <label >
                        아이디
                        <input type="text" name="id">
                    </label>
                </p>
                <p>
                    <label>
                        비밀번호
                        <input type="password" name="pwd">
                    </label>
                </p>
            </fieldset>
        </form>
        
    </body>
</html>
