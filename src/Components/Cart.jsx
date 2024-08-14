import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { minus, plus, remove, saveAll } from "../Redux/Slice";

const Cart = ({ data }) => {
  const ini = useSelector((state) => state.store);
  const dispatch = useDispatch();

  //send all values to slice as initial value
  useEffect(() => {
    dispatch(saveAll(data));
  }, []);

  //Selector

  //using useSelecetor calculating the value for total quantity and total price
  const totalPrice = useSelector((state) =>
    state.store.reduce(
      (total, data) => total + data.price * (data.quantity || 0),
      0
    )
  );

  const totalQuantity = useSelector((state) =>
    state.store.reduce((total, data) => total + (data.quantity || 0), 0)
  );

  // Sending the id to perform add,sub and remove in dispatch method
  const add = (id) => {
    dispatch(plus({ id }));
  };
  const sub = (id, quantity) => {
    if (quantity > 0) {
      dispatch(minus({ id }));
    }
  };

  const Delete = (id) => {
    dispatch(remove({ id }));
  };
  return (
    <div>
      <h2>Cart</h2>
      <h3>Total Price : {totalPrice}</h3>
      <h3>Total Quantity : {totalQuantity}</h3>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {ini.map((element, index) => {
            return (
              <div key={index}>
                <div className="col">
                  <div className="card h-100 ">
                    <div className="card-header">{element.title}</div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div id={index} className="carousel slide">
                            <div className="carousel-inner">
                              <div className="carousel-item active">
                                <img
                                  src={element.thumbnail}
                                  className="d-block w-100"
                                  alt="..."
                                />
                              </div>
                              {element.images.map((photo, i) => {
                                return (
                                  <div className="carousel-item" key={i}>
                                    <img
                                      src={photo}
                                      className="d-block w-100"
                                      alt="..."
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <button
                              className="carousel-control-prev"
                              type="button"
                              data-bs-target={`#${index}`}
                              data-bs-slide="prev"
                            >
                              <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                              />
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                              className="carousel-control-next"
                              type="button"
                              data-bs-target={`#${index}`}
                              data-bs-slide="next"
                            >
                              <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                              />
                              <span className="visually-hidden">Next</span>
                            </button>
                          </div>
                        </div>
                        <div className="col-6">{element.description}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-6">
                          <div className="card-text">
                            Price : {element.price}
                          </div>
                          <div className="card-text">
                            Brand : {element.brand}
                          </div>
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control"
                            value={element.price * (element.quantity || 0)}
                            readOnly
                          />
                          <br />
                          <div className="btn-group " role="group">
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                add(element.id, element.quantity || 0)
                              }
                            >
                              +
                            </button>
                            <button className="btn disabled ">
                              {element.quantity || 0}
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                sub(element.id, element.quantity || 0)
                              }
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                          className="btn btn-danger"
                          onClick={() => Delete(element.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;