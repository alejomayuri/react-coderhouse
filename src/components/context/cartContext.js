import { useState, createContext, useContext } from "react";

const cartContext = createContext([])

export const useCartContext = () => useContext(cartContext)

const CartContextProvider = ({children}) => {
    const [cartList, setCartList] = useState([])

    const [orderId, setOrderId] = useState('')

    const xd = (a) => {
        setOrderId(a)
    }

    const existeEnCarrito = (id) => cartList.find(item => item.item.id === id)

    const addToCart = (item) => {

        const nuevoCartList = [...cartList];

        const verificarProducto = existeEnCarrito(item.item.id)

        if(verificarProducto) {
            nuevoCartList[nuevoCartList.findIndex(item => item.item.id === verificarProducto.item.id)].cantidad = nuevoCartList[nuevoCartList.findIndex(item => item.item.id === verificarProducto.item.id)].cantidad + item.cantidad
            setCartList(nuevoCartList)

            return;
        }

        setCartList([...nuevoCartList, item])
        
    }

    const borrarProducto = (item) => {
        const nuevoCartList = [...cartList];

        const verificarProducto = existeEnCarrito((item.item.id))
        
        const productosRestantes = nuevoCartList.filter(item => item.item.id !== verificarProducto.item.id)

        setCartList(productosRestantes)
    }

    const borrarCarrito = () => setCartList([])

    return (
        <cartContext.Provider value={{
            cartList,
            xd,
            orderId,
            addToCart,
            borrarProducto,
            borrarCarrito
        }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartContextProvider;
