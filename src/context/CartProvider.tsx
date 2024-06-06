import { ReactElement, createContext, useMemo, useReducer } from "react"

export type CartItemType = {
    pId: string,
    pName: string,
    pPrice: number,
    qty: number,
}

type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUMBIT: "SUBMIT",
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType,
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('Action Payload missing in ADD action');
            }

            const { pId, pName, pPrice } = action.payload;

            const filteredCart: CartItemType[] = state.cart.filter(item => item.pId !== pId);

            const itemExists: CartItemType | undefined = state.cart.find(item => item.pId === pId);

            const qty: number = itemExists ? itemExists.qty + 1 : 1

            return { ...state, cart: [...filteredCart, { pId, pName, pPrice, qty }] }
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('Action Payload missing in REMOVE action');
            }

            const { pId } = action.payload;

            const filteredCart: CartItemType[] = state.cart.filter(item => item.pId !== pId);

            return { ...state, cart: [...filteredCart] }
        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error('Action Payload missing in QUANTITY action');
            }

            const { pId, qty } = action.payload;

            const itemExists: CartItemType | undefined = state.cart.find(item => item.pId === pId);

            if (!itemExists) throw new Error('Item must exist in order to update the quantity');

            const updatedItem: CartItemType = { ...itemExists, qty }

            const filteredCart: CartItemType[] = state.cart.filter(item => item.pId !== pId);

            return { ...state, cart: [...filteredCart, updatedItem] }
        }
        case REDUCER_ACTION_TYPE.SUMBIT: {
            return { ...state, cart: [] }
        }
        default:
            throw new Error('Unindentified reducer action type');
    }
}

const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, []);

    const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.qty
    }, 0)

    const totalPrice: string = new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + (cartItem.qty * cartItem.pPrice)
        }, 0)
    )

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.pId.slice(-3));
        const itemB = Number(b.pId.slice(-3));
        return itemA - itemB;
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: [],
}

export const CartContext = createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;