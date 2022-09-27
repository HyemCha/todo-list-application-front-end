import { API_BASE_URL } from "../app-config";

//백엔드로 요청을 보낼 때 사용할 유틸리티 함수
export function call(api, method, request){
    let options = {
        headers : new Headers({
            "Content-Type" : "application/json",
        }),
        url : API_BASE_URL + api,
        method : method,
    };
    if(request){
        //GET method
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options)
    .then(res=>
        res.json()
            .then(json=>{
                if(!res.ok){
                    //response.ok가 true이면 정상적인 응답을 받은 것이고 아니면 에러 응답을 받은 것임
                    return Promise.reject(json);
                }
                // console.log("res.ok", options.url, options.method, json.data);
                return json;
            })
        )
    .catch(err => {
        //추가된 부분
        console.log(err.status);
        if(err.status === 403){
            window.location.href = "/login"; // redirect
        }
        return Promise.reject(err);
    });
}

export function signin(userDTO){
    return call("/auth/signin", "POST", userDTO)
    .then(res => {
        if(res.token){
            // token이 존재하는 경우 Todo 화면으로 리디렉트
            window.location.href = "/";
        }
    })
}