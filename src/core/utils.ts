/* export function groupBy<T>(xs: T[], key: keyof T): Record<string, T[]> {
    return xs.reduce((result, item) => {
        const value = item[key] as unknown as string;
        if (!result[value]) {
            result[value] = [];
        }
        result[value].push(item);
        return result;
    }, {} as Record<string, T[]>);
} */

import type { TApiIngredient, TApiIngredientGroup } from './type';

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

export function getGroupedIngredients(ingredients: TApiIngredient[]): TApiIngredientGroup {
    const grouped = groupBy(ingredients, 'type');
    return {
        bun: grouped['bun'] || [],
        main: grouped['main'] || [],
        sauce: grouped['sauce'] || [],
    };
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
