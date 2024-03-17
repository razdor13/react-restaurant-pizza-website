import { useHttp } from "../hooks/http.hooks" 


const  usePizzaService = () => {
    
    const {loading,request,setLoading} = useHttp()


    const _apiBase = `${location.protocol}//${location.host}/stat`
    
    
    const getHelloWorld = async () => {
        const res = await request(_apiBase)
        return res
    }
    
    return  {loading,setLoading,getHelloWorld}
}



export default usePizzaService