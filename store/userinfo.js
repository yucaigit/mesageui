export default{
  namespaced:true,
  state:()=>({
    user:JSON.parse(uni.getStorageSync('user') || '')
  }),
  mutations:{
    userLogin(state,userinfo){
      // const result = state.users.find((x)=>x.id==userinfo.id);
      // if(!result){
      //   state.users.push(userinfo)
      // }
      
      state.user = userinfo
      this.commit('m_user/saveToStorage')
      
    },
    
    saveToStorage(state){
      uni.setStorageSync('user',JSON.stringify(state.user))
    },
    removeUser(state){
      state.user=null
      
      this.commit('m_user/saveToStorage') 
    }
  }
}