
export type TIngredient = {
    title: string,
    price: number,
    image: string,
    params: number[],
}

export type TApiResponse = {
    success: boolean,
    data: TApiIngredient[],
}

export type TApiData = {
    status: 'success' | 'error',
    error?: string,
    data?: TApiIngredient[],
}

export type TApiIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
}

export type TApiIngredientGroup = {
    // bun?: TApiIngredient[],
    // main?: TApiIngredient[],
    // sauce?: TApiIngredient[],
    (k: 'bun' | 'main' | 'sauce'): TApiIngredient[],
}

export type TIconProps = {
    size?: number,
    fill?: string,
    classes?: string,
}
