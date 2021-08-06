import httpmethods from '@/tools/http'

export function queryMenuList (){
    
    return httpmethods.axios.get("/blogapi/admin/permission/",{})
}

export function queryMenuById(id){

    return httpmethods.axios.get("/blogapi/admin/permission/"+id,{})
}