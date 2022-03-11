import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import { Button } from "react-bootstrap";

function BtnRender({ product, deleteProduct }) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart


    return (
        <div className="row_btn">
            {
                isAdmin ?
                    <>
                        <Link id="btn_view" to={`/edit_product/${product._id}`}>
                            <Button variant="success">Edit</Button>
                        </Link>
                        <Link id="btn_buy" to="#!"
                            onClick={() => deleteProduct(product._id, product.images.public_id)}>
                            <Button variant="danger">Delete</Button>
                        </Link>

                    </>
                    : <>
                        <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                            <Button variant="primary">Add to cart</Button>
                        </Link>
                        <Link id="btn_view" to={`/detail/${product._id}`}>
                            <Button variant="success">Détail product</Button>
                        </Link>
                    </>
            }

        </div>
    )
}

export default BtnRender