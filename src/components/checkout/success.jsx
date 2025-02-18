import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withLocation from '../../helpers/withLocation';

class orderSuccess extends Component {
  componentDidMount() {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage.setItem('firstLoad', true);
        window.location.reload();
      } else {
        localStorage.removeItem('firstLoad');
      }
    }
  }

  render() {
    const { payment, items, symbol, orderTotal, details } = this.props.location.state === undefined ? {} : this.props.location.state;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var current = new Date();
    var next5days = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    let CheckDate = current.toLocaleDateString("en-US", options).toString()
    let deliveryDate = next5days.toLocaleDateString("en-US", options).toString()

    return (
      (payment) ?
        <div>
          <section className="section-b-space light-layout">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="success-text">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                    <h2>thank you</h2>
                    <p>Payment Is Has Been Received Order Placed Successfully</p>
                    <p>Transaction ID: {(payment.paymentID) ? payment.paymentID : payment.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="product-order">
                    <h3>your order details</h3>
                    {items.map((item, index) => {
                      return <div className="row product-order-detail" key={index}>
                        <div className="col-3">
                          <img src={item.variants ? item.variants[0].images : item.pictures[0]}
                            alt="" className="img-fluid" />
                        </div>
                        <div className="col-3 order_detail">
                          <div>
                            <h4>product name</h4>
                            <h5>{item.name}</h5>
                          </div>
                        </div>
                        <div className="col-3 order_detail">
                          <div>
                            <h4>quantity</h4>
                            <h5>{item.qty}</h5>
                          </div>
                        </div>
                        <div className="col-3 order_detail">
                          <div>
                            <h4>price</h4>
                            <h5>{symbol}{item.sum}</h5>
                          </div>
                        </div>
                      </div>
                    })}
                    <div className="total-sec">
                      <ul>
                        <li>subtotal <span>{symbol}{orderTotal}</span></li>
                        <li>shipping <span>₹40</span></li>
                        <li>tax(GST) <span>0</span></li>
                      </ul>
                    </div>
                    <div className="final-total">
                      <h3>total <span>{symbol}{orderTotal + 40}</span></h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row order-success-sec">
                    <div className="col-sm-6">
                      <h4>summery</h4>
                      <ul className="order-detail">
                        {(payment.paymentID) ?
                          <div>
                            <li>payer ID: {payment.payerID}</li>
                            <li>payment ID: {payment.paymentID}</li>
                            <li>payment Token: {payment.paymentToken}</li></div>
                          :
                          <li>Order ID: {payment.id}</li>}

                        <li>Order Date: {CheckDate}</li>
                        <li>Order Total: {symbol}{orderTotal}</li>
                      </ul>
                    </div>
                    <div className="col-sm-6">
                      <h4>shipping address</h4>
                      <ul className="order-detail">
                        <li>{details.address}</li>
                        <li>{details.postalcode}</li>
                        <li>{details.town}</li>
                        <li>{details.state}</li>
                        <li>{details.country}</li>
                      </ul>
                    </div>

                    <div className="col-sm-12 payment-mode">
                      <h4>payment method</h4>
                      <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net
                        banking acceptance subject to device availability.</p>
                    </div>
                    <div className="col-md-12">
                      <div className="delivery-sec">
                        <h3>expected date of delivery</h3>
                        <h2>{deliveryDate}</h2>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
        :
        <section className="p-0">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="error-section">
                  <h1>404</h1>
                  <h2>page not found</h2>
                  <Link className="btn btn-solid" to={`${process.env.PUBLIC_URL}/home`} >back to home</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
  }
}

export default withLocation(orderSuccess);
