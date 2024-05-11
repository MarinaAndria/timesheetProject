import router from '../router'
export function authGuard (){
    let token = this.$cookies.get('jwt');
    console.log(token)
    if(token){
        return true
    }
    router.push('/admin')
}