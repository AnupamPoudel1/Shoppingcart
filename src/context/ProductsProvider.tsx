import { ReactElement, createContext, useEffect, useState } from "react"

export type ProductType = {
    pId: string,
    pName: string,
    pPrice: number,
}

// we can do this for this project but for fetching data we do another step
// const initState: ProductType[] = [
//     {
//         "pId": "i001",
//         "pName": "Smart Watch",
//         "pPrice": 4000
//     },
//     {
//         "pId": "i002",
//         "pName": "Smart TV",
//         "pPrice": 41000
//     },
//     {
//         "pId": "i003",
//         "pName": "Smart Phone",
//         "pPrice": 21000
//     }
// ]

// for fetching data
const initState: ProductType[] = []

export type UseProductContextType = { products: ProductType[] }

const initContextState: UseProductContextType = { products: [] }

const ProductsContext = createContext<UseProductContextType>(initContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState)

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = await fetch('http://localhost:3500/products').then(res => {
                return res.json()
            }).catch(err => {
                if (err instanceof Error) console.log(err.message);
            })
            return data;
        }

        fetchProducts().then(products => setProducts(products));

    }, []);

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;