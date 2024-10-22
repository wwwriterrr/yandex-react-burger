export type TIngredient = {
    title: string,
    price: number,
    image: string,
}

export type TIngredientGroup = {
    title: string,
    items: TIngredient[],
}
