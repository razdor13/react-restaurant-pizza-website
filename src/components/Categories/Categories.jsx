
import "../Categories/Categories.scss"
import { useSelector, useDispatch } from 'react-redux'
import {selectIndex,chengeIndex} from "../../redux/slices/filterSlice"
import { setCurrentPage } from "../../redux/slices/pizzaSliceAsync"


const Categories = () => {
    const dispatch = useDispatch()
    const presentIndex = useSelector(selectIndex)
    
    const categories = ['Всі',`М'ясні`,  'Овочеві' ,'Гриль' ,'Гострі']

    const onClickCategory = (index) => {
        console.log(presentIndex)
        dispatch(chengeIndex(index))
        dispatch(setCurrentPage(0))
    }
     return (
                <div className="categories">
                    <ul>
                        {
                            categories.map((categ,i) => 
                            (<li onClick={() => onClickCategory(i)} key={i} className={presentIndex === i ? 'active' : ''}>{categ}</li>)
                            )
                        }
                    </ul>
                </div>
        
    )
}

export default Categories