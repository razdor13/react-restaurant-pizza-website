import { useHttp } from "../hooks/http.hooks" 


const  usePizzaService = () => {
    
    const {loading,request,setLoading} = useHttp()


    const _apiBase = `${location.protocol}//${location.host}/pizzas/sorted`
    
    
    const getPizzaBySort = async (sort,filterByCatgr,filterBySearch,numberPage) => {
        const limitItemOnPage = 8
        const pathOfPagination = `&numberPage=${numberPage}&limitItemOnPage=${limitItemOnPage}`
        const path=`${_apiBase}?sortBy=${sort}&filterByCategory=${filterByCatgr}&filterBySearch=${filterBySearch}${pathOfPagination}`
        const res = await request(path)
        return res
    }
    
    return  {loading,setLoading,getPizzaBySort}
}



export default usePizzaService