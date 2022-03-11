import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import { Table } from "react-bootstrap";

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history])

    console.log(orderDetails)

    if (orderDetails.length === 0) return null;


    return (
        <div className="history-page">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Address</th>
                        <th style={{ textAlign: "center" }}>Postal Code</th>
                        <th style={{ textAlign: "center" }}>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.address.recipient_name}</td>
                        <td>{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                        <td>{orderDetails.address.postal_code}</td>
                        <td>{orderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </Table>

            <Table striped bordered hover style={{ margin: "30px 0px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th style={{ textAlign: "center" }}>Products</th>
                        <th style={{ textAlign: "center" }}>Quantity</th>
                        <th style={{ textAlign: "center" }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.images.url} alt="" /></td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>$ {item.price * item.quantity}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default OrderDetails
