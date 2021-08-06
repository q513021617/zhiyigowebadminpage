import httpmethods from '@/tools/http'

export function queryAllRole (){
    
    return httpmethods.axios.get("/blogapi/admin/role/",{})
}

export function queryRoleById(id){

    return httpmethods.axios.get("/blogapi/admin/role/"+id,{})
}