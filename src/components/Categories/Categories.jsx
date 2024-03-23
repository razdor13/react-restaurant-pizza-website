import { useState } from "react"
import "../Categories/Categories.scss"




const Categories = () => {
    const [activeIndex ,setActiveIndex] = useState(0)

    const categories = ['Всі',`М'ясні`,  'Овочеві' ,'Гриль' ,'Гострі']

    const onClickCategory = (index) => {
        setActiveIndex(index)
    }
     return (
                <div className="categories">
                    <ul>
                        {
                            categories.map((categ,i) => 
                            (<li onClick={() => onClickCategory(i)} key={i} className={activeIndex === i ? 'active' : ''}>{categ}</li>)
                            )
                        }
                    </ul>
                </div>
        
    )
}

export default Categories