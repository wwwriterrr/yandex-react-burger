export type TIngredient = {
    title: string,
    price: number,
    image: string,
    params: number[],
}

export type TIngredientGroup = {
    title: string,
    items: TIngredient[],
}