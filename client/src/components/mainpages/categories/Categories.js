import React, { useState, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import { Button, Table } from "react-bootstrap";

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    // create Category

    const createCategory = async e => {
        e.preventDefault()
        try {
            //lorsque on clique sur le button edit a gauche le buton create transorme en edit
            if (onEdit) {
                const res = await axios.put(`/api/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
            } else {
                const res = await axios.post('/api/category', { name: category }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = async (id, name) => {
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: { Authorization: token }
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required
                    onChange={e => setCategory(e.target.value)} />

                <Button type="submit" variant="primary">{onEdit ? "Update" : "Create"}</Button>
            </form>




            <div>
                {
                    categories.map(category => (
                        <div key={category._id}>


                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>

                                        <th> Name</th>
                                        <th>Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{category.name}</td>
                                        <td> <Button variant="success" onClick={() => editCategory(category._id, category.name)}>Edit</Button></td>
                                        <td>  <Button onClick={() => deleteCategory(category._id)} variant="danger">Delete</Button></td>

                                    </tr>


                                </tbody>
                            </Table>

                        </div>
                    ))
                }
            </div>

        </div >
    )
}

export default Categories
