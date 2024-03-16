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
                        {/* <li onClick={() => onClickCategory(0)} className={activeIndex === 0 ? 'active' : ''}>Всі</li>
                        <li onClick={() => onClickCategory(1)} className={activeIndex === 1 ? 'active' : ''}>М'ясні</li>
                        <li onClick={() => onClickCategory(2)} className={activeIndex === 2 ? 'active' : ''}>Овочеві</li>
                        <li onClick={() => onClickCategory(3)} className={activeIndex === 3 ? 'active' : ''}>Гриль</li>
                        <li onClick={() => onClickCategory(4)} className={activeIndex === 4 ? 'active' : ''}> </li> */}
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