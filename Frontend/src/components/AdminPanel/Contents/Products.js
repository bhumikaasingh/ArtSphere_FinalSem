import React, { useState, useEffect } from "react";
import ProductService from "../../../services/productService";
import "./Product.css";

function SeeProducts() {
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    ProductService.getAll().then((res) => {
      setProducts(res.data.data);
    });
  }, []);

  const deleteProduct = async (productId) => {
    await ProductService.deleteProduct(productId);
    setProducts(products.filter((product) => product._id !== productId));
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setShowEditModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await ProductService.editProduct(selectedProduct._id, selectedProduct);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === selectedProduct._id ? selectedProduct : product
      )
    );
    closeEditModal();
  };

  return (
    <div className="products-container">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={"http://localhost:5500" + product.image}
                  alt={product.name}
                  className="product-image"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td className="product-actions">
                <i
                  className="fas fa-edit"
                  onClick={() => openEditModal(product)}
                ></i>
                <i
                  className="fas fa-trash-alt"
                  onClick={() => deleteProduct(product._id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <span className="close-button" onClick={closeEditModal}>
              &times;
            </span>
            <form onSubmit={handleEditSubmit}>
              <h2>Edit Product</h2>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={selectedProduct.name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={selectedProduct.description}
                  onChange={handleEditChange}
                  required
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={selectedProduct.price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      image: e.target.files[0],
                    })
                  }
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={closeEditModal}>
                  Cancel
                </button>
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeeProducts;