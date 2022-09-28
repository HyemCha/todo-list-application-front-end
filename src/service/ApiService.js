import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

//백엔드로 요청을 보낼 때 사용할 유틸리티 함수
export function call(api, method, request){
    let headers = new Headers({
        "Content-Type" : "application/json",
    });
    // 로컬 스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken);
    }
    let options = {
        headers : headers,
        url : API_BASE_URL + api,
        method : method,
    };

    if(request){
        //GET method
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then(res=> {
        if(res.status == 200){
            return res.json();
        } else if(res.status == 403){
            window.location.href = "/login"; // redirect
        } else {
            new Error(res);
        }
    }).catch(err => {
        console.log("http error")
        console.log(err);
    });
}

export function signin(userDTO){
    return call("/auth/signin", "POST", userDTO)
    .then(res => {
        if(res.token){
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem(ACCESS_TOKEN, res.token);
            // token이 존재하는 경우 Todo 화면으로 리디렉트
            window.location.href = "/";
        }
    })
}

export function signout(){
    localStorage.setItem(ACCESS_TOKEN, null);
    window.location.href = "/login";
}

export function signup(userDTO){
    return call("/auth/signup", "POST", userDTO);
}