const getPizzaBySort = async (sort,filterByCatgr,filterBySearch,numberPage) => {
    const _apiBase = `${location.protocol}//${location.host}/pizzas/sorted`
    const limitItemOnPage = 8
    const pathOfPagination = `&numberPage=${numberPage}&limitItemOnPage=${limitItemOnPage}`
    const path=`${_apiBase}?sortBy=${sort}&filterByCategory=${filterByCatgr}&filterBySearch=${filterBySearch}${pathOfPagination}`
    const res = await fetch(path)
    return res
}


export default getPizzaBySort