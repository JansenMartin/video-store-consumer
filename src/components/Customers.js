import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios  from 'axios'
import Customer from './Customer';
import Message from './Message.js'
import './Customers.css'

class Customers extends Component {
    constructor(props) {
        super();

        this.state = {
            customers: [],
            error: null
        }

        props.reportStatusCallback(null);

    }

    reportStatus = (text) => {
        this.props.reportStatusCallback(text);
      }

    componentDidMount() {

        const getURL = "http://localhost:3002/customers"
    
        axios.get(getURL)
          .then((response) => {
            console.log(response.data);

            const customers = response.data.map((customer) => {
                const customerEntry = {
                    id: customer.id,
                    name: customer.name,
                    address: customer.address,
                    city: customer.city,
                    state: customer.state,
                    postalCode: customer.postal_code,
                    phone: customer.postal_code,
                    accountCredit: customer.account_credit
                }

                return customerEntry;
            })

            this.setState({ customers });
          })
          .catch((error) => {
            this.reportStatus(`Uh-oh!  There was a problem: ${error.message}`)
          });
    }

    selectCustomer = (name, id) => {
        this.props.selectCustomerCallback(name, id);
    }

    render() {

        const customerComponents = this.state.customers.map((customer, index) => {
            return (
                <li className='customer-card' key={index}>
                   <Customer 
                     name={customer.name} 
                     id={customer.id} 
                     address={customer.address}
                     city={customer.city}
                     state={customer.state}
                     postalCode={customer.postal_code}
                     phone={customer.phone}
                     accountCredit={customer.account_credit}
                     selectCustomerCallback={this.selectCustomer} />
                </li>
            )
        })
        return (
              <div>
                { customerComponents }
              </div>
        );
    }
}

export default Customers

Customers.propTypes = {
    selectCustomerCallback: PropTypes.func,
    reportStatusCallback: PropTypes.func,
}