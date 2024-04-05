const getTotalCountById = (cartList, id) => {
    const total = cartList.reduce((total, pizza) => {
        // Перевіряємо, чи id об'єкта співпадає з переданим id
        if (pizza.id === id) {
          // Додаємо count до загального лічильника
          return total + pizza.count;
        }
        // Якщо id не співпадає, просто повертаємо поточне значення total
        return total;
      }, 0)
    // Використовуємо метод reduce для зведення всіх count з об'єктів,
    // де id співпадає з переданим аргументом
    
    return {total,id}; // Початкове значення лічильника - 0
  };

export default getTotalCountById