import React, { useContext, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Table } from "react-bootstrap";

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                // s 'il admin il voit history du tous les utilisateurs
                if (isAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: { Authorization: token }
                    })

                    setHistory(res.data)

                } else {
                    // un utilisateur voit just son history
                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    })

                    setHistory(res.data)

                }

            }
            getHistory()
        }

    },
        [token, isAdmin, setHistory])

    return <div className="history-page">

        <h2>History</h2>

        <h4>You have {history.length} ordered</h4>


        <Table striped bordered hover>
            <thead>
                <tr>
                    <th style={{ textAlign: "center" }}>Payment ID</th>
                    <th style={{ textAlign: "center" }}>Date of Purchased</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {

                    history.map(items => (
                        <tr key={items._id}>
                            <td >{items.paymentID}</td>
                            <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                            <td><Link to={`/history/${items._id}`}>View</Link></td>
                        </tr>
                    ))
                }
            </tbody>

        </Table>
    </div >


}

export default OrderHistory