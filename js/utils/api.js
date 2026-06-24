
export const fetchReviews = async () => { 
    const response = await fetch('https://randomuser.me/api/?results=5&nat=us,gb,fr');
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    const data = await response.json();
    return data.results;
    
}
