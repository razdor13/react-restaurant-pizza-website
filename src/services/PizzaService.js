import { useHttp } from "../hooks/http.hooks" 


const  usePizzaService = () => {
    
    const {loading,request} = useHttp()


    const _apiBase = `${location.protocol}//${location.host}/stat`
    
    
    const getHelloWorld = async () => {
        const res = await request(_apiBase)
        return res
    }
    
    return  {loading,getHelloWorld}
}



export default usePizzaService