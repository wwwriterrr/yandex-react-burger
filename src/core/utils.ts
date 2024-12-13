export function groupBy<T>(xs: T[], key: keyof T): Record<string, T[]> {
    return xs.reduce((result, item) => {
        const value = item[key] as unknown as string;
        if (!result[value]) {
            result[value] = [];
        }
        result[value].push(item);
        return result;
    }, {} as Record<string, T[]>);
}

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
        return Promise.reject(`Error with fetch. Status ${response.status}`);
    }
}
