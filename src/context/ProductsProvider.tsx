import { ReactElement, createContext, useState } from "react"

export type ProductType = {
    pId: string,
    pName: string,
    pPrice: number,
}

const initState: ProductType[] = [
    {
        "pId": "i001",
        "pName": "Smart Watch",
        "pPrice": 4000
    },
    {
        "pId": "i002",
        "pName": "Smart TV",
        "pPrice": 41000
    },
    {
        "pId": "i003",
        "pName": "Smart Phone",
        "pPrice": 21000
    }
]

export type UseProductContextType = { products: ProductType[] }

const initContextState: UseProductContextType = { products: [] }

const ProductsContext = createContext<UseProductContextType>(initContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState)

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;