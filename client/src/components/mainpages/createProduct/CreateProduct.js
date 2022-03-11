import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Form } from "react-bootstrap";

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}

function CreateProduct() {

    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    //edit

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            products.forEach(product => {
                if (product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }

    }, [param.id, products])

    //upluad file

    const handleUpload = async e => {
        e.preventDefault()
        try {

            if (!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]

            if (!file) return alert("File not exist.")

            if (file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)



            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)
            setImages(res.data)
        } catch (err) {
            alert(err.response.data.msg)

        }
    }

    // delete picture

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("You're not an admin")
            //load picture
            setLoading(true)
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    //input

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    // formulaire

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You're not an admin")
            if (!images) return alert("No Image Upload")

            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images }, {
                    //product ctrl
                    headers: { Authorization: token }

                })
            } else {
                await axios.post('/api/products', { ...product, images }, {
                    //product ctrl
                    headers: { Authorization: token }
                })
            }
            setCallback(!callback)
            history.push("/")

        } catch (err) {
            alert(err.response.data.msg)

        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />

                {/*Upluoad file */}
                {
                    loading ? <div id="file_img"><Loading /></div>

                        : <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt="" />
                            {/*delete file */}
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }

            </div>

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control type="text" name="product_id" id="product_id" required
                        value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" id="title" required
                        value={product.title} onChange={handleChangeInput} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" id="price" required
                        value={product.price} onChange={handleChangeInput} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <textarea type="text" name="description" id="description" required
                        value={product.description} rows="5" onChange={handleChangeInput} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Content</Form.Label>
                    <textarea type="text" name="content" id="content" required
                        value={product.content} rows="7" onChange={handleChangeInput} />

                </Form.Group>





                {/*category mil model category relation mabinathom product et category */}
                <div className="row">
                    <label htmlFor="categories">Categories</label>
                    <select class="form-select" name="category" value={product.category} onChange={handleChangeInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }


                    </select>
                </div>

                <Button type="submit" variant="primary">{onEdit ? "Update" : "Create"}</Button>

            </Form>
        </div >
    )
}

export default CreateProduct
