
import "../Categories/Categories.scss"
import { useSelector, useDispatch } from 'react-redux'
import { chengeIndex , selectIndex} from "../../redux/slices/filterSlice"


const Categories = () => {
    const dispatch = useDispatch()
    const presentIndex = useSelector(selectIndex)
    const categories = ['Всі',`М'ясні`,  'Овочеві' ,'Гриль' ,'Гострі']

    const onClickCategory = (index) => {
        dispatch(chengeIndex(index))
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