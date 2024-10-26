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
