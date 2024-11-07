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

export const checkResponse = (response: Response) => {
    if(!response.ok){
        return response.json().then((text) => {
            return Promise.reject(text.reason || 'Error with fetch');
        });
    }
}
