import httpmethods from '@/tools/http'

export function getOneSeoInfo (){
    
    return httpmethods.axios.get("/blogapi/admin/seoInfo/getOne",{})
}

export function updateSeoInfo (data){
    
    return httpmethods.axios.put("/blogapi/admin/seoInfo/",data)
}