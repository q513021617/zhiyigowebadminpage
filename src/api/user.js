import httpmethods from '@/tools/http'

export function queryUserDetail (id){
    
    return httpmethods.axios.get("/blogapi/api/user/"+id,{})
}

export function delUserById (id){
    
    return httpmethods.axios.delete("/blogapi/api/user/"+id,{})
}
export function getUserNum(num){

    return httpmethods.axios.get("/blogapi/getUserNum/"+num,{})
}

export function saveUser(data){

    return httpmethods.axios.post("/blogapi/admin/webUser/",data)
}