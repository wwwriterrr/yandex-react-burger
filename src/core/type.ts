
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
    bun: TApiIngredient[],
    main: TApiIngredient[],
    sauce: TApiIngredient[],
    // (k: 'bun' | 'main' | 'sauce'): TApiIngredient[],
}

export type TIconProps = {
    size?: number,
    fill?: string,
    classes?: string,
}

export type TUserData = {
    name: string,
    email: string,
}

export type TLoginData = {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: TUserData
}

export interface IDropResult {
    name: string,
    pos: 'top' | 'bottom',
}

export type TOrderItem = {
    ingredients: string[],
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string,
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}
