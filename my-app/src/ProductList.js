import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import products from "./Products";

const ProductList = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split("-").map(Number);
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
    }

    return true;
  });

  return (
    <Container>
      <h1 className="my-4 text-center">Everything on the Under Budget</h1>

      <Form>
        <Row className="justify-content-between">
          <Col md={4}>
            <Form.Group controlId="categoryFilter">
              <Form.Label><strong>Category</strong></Form.Label>
              <Form.Control
                as="select"
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
              >
                <option value="">All</option>
                <option value="Headphone">Headphones</option>
                <option value="Watch">Watch</option>
                <option value="Mobile">Mobile</option>
                <option value="Wallets">Wallets</option>
                <option value="clothing">Clothing</option>
                <option value="shoes">Shoes</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4} offset>
            <Form.Group controlId="priceFilter">
              <Form.Label><strong>Price</strong></Form.Label>
              <Form.Control
                as="select"
                value={priceFilter}
                onChange={handlePriceFilterChange}
              >
                <option value="">All</option>
                <option value="0-1000">Rs0 - Rs1000</option>
                <option value="1000-5000">Rs1000 - Rs5000</option>
                <option value="5000-15000">Rs5000 - Rs15000</option>
                <option value="15000-50000">Rs15000 - Rs50000</option>


              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <ListGroup className="mt-3">
        <Row>
          {filteredProducts.map((product) => (
            <Col md={3} key={product.id}>
              <ListGroup.Item className="mt-3 "style={{height:"400px",borderRadius:'10px'}}>
                <Row>
                  <Col>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid"
                      style={{ height: "200px", width: "500px" }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={9} className="d-flex flex-column">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Rs{product.price}</p>
                    <div className="flex-fill"></div>
                  </Col>
                </Row>
              </ListGroup.Item>
            </Col>
          ))}
        </Row>
      </ListGroup>
    </Container>
  );
};

export default ProductList;