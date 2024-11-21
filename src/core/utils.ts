export const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const translateGroup = (title: string) => {
    switch(title){
        case 'bun':
            return 'Булки';
        case 'main':
            return 'Наполнение';
        case 'sauce':
            return 'Соусы';
        default:
            return title
    }
}

export const checkResponse = async (response: Response) => {
    if(!response.ok){
        /* try{
            const data = await response.json();
            return Promise.reject(data.message || 'Error with fetch');
        }catch (err){
            return Promise.reject((err as Error).message || 'Error with fetch');
        } */
        return Promise.reject(`Error with fetch. Status ${response.status}`);
    }
}
