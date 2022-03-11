import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import { Table, Card, Button } from "react-bootstrap";

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token

    const [total, setTotal] = useState(0)

    // Calculer somme du panier

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()

    }, [cart])

    // add cart

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }

    //increment product

    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)

    }

    // decrement product

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                //pour la qauantite soit fixe a 0
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)

    }


    const removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)

        }
    }

    // order
    const tranSuccess = async (payment) => {
        //console.log(payment)
        const { paymentID, address } = payment

        await axios.post('/api/payment', { cart, paymentID, address }, {
            headers: { Authorization: token }
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")


    }

    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    return (
        <div>
            {

                cart.map(product => (
                    <div key={product._id}>

                        <div className="history-page">
                            <Table striped bordered hover>

                                <div className="delete"
                                    onClick={() => removeProduct(product._id)}>
                                    X
                                </div>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>Image</th>
                                        <th style={{ textAlign: "center" }}>Title</th>

                                        <th style={{ textAlign: "center" }}>TOTAL</th>
                                        <th style={{ textAlign: "center" }}>qauantite</th>
                                        <th style={{ textAlign: "center" }}>description</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td> <img src={product.images.url} alt="" /></td>
                                        <td>{product.title}</td>
                                        <td>{product.price * product.quantity} $</td>
                                        <td> <button onClick={() => decrement(product._id)}> - </button>
                                            <span>{product.quantity}</span>
                                            <button onClick={() => increment(product._id)}> + </button></td>
                                        <td>{product.description}</td>
                                    </tr>
                                </tbody>
                            </Table>




                        </div>




                    </div>

                ))

            }

            <div className='total'>
                <h3>Total: $ {total}</h3>
                <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess}


                />

            </div>
        </div >

    )

}

export default Cart
