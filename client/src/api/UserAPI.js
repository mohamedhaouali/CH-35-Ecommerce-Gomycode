import { useState, useEffect } from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])


    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    // appel axios
                    const res = await axios.get('/user/infor', {
                        //l'utilisateur doit identifier
                        headers: { Authorization: token }
                    })
                    setIsLogged(true)
                    //logged as Admin
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    //console.log(res)

                    //pour fixer la quantite du cart
                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)

                }
            }

            getUser()
        }


    }, [token])



    //add Cart
    const addCart = async (product) => {
        if (!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])
            //  appel axios userRouter
            await axios.patch('/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })


        } else {
            alert("this product has been added to cart")

        }


    }


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],

    }
}

export default UserAPI