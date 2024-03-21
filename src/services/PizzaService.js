import { useHttp } from "../hooks/http.hooks" 


const  usePizzaService = () => {
    
    const {loading,request,setLoading} = useHttp()


    const _apiBase = `${location.protocol}//${location.host}/pizzas/sorted`
    
    
    const getPizzaBySort = async (sort,filter) => {
        const res = await request(`${_apiBase}?sortBy=${sort}&filterByCategory=${filter}`)
        return res
    }
    
    return  {loading,setLoading,getPizzaBySort}
}



export default usePizzaService