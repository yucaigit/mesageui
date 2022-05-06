 const baseUrl = 'http://localhost:8080';
 const request =(url='',data={},type='GET',header={})=>{
   return new Promise((resolve,reject)=>{
     uni.request({
       url:baseUrl+url,
       method:type,
       data:data,
       dataType:'json',
     }).then((response)=>{
       setTimeout(function(){
         uni.hideLoading();
       },300);
       let [err,res] = response;
       resolve(res.data);
     }).catch(error=>{
       let [err,res] = error;
       reject(err.data);
     })
   });
 }
 
 export default request
 
 