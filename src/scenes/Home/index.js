import React, {Component} from 'react';
import {editInvoice, getInvoices} from "../../data/invoices";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: []
        }

    }
    _fetchData(){
        getInvoices().then(response => {
            if (response.length > this.state.invoices.length) {
                this.setState({invoices: response})
            }

        });
    }
    componentDidMount() {
        this._fetchData();
        setInterval(() => {
            this._fetchData();
        },1000);

    }


    _approveInvoice(index,idInvoice){
        let invoices = this.state.invoices;
        invoices[index].status = "approved";
        this.setState({invoices})
        editInvoice({status:'approved'}, idInvoice);
    }

    _listInvoices(){
        let invoices = this.state.invoices.filter(invoice => invoice.status === 'pending')
        return invoices.map((invoice, index) => {
                return(
                    <tr key={index}>
                        <td>{invoice.invoice_number}</td>
                        <td>{invoice.vendor_name}</td>
                        <td>{invoice.remittance_address}</td>
                        <td>{invoice.total}</td>
                        <td>{invoice.invoice_date}</td>
                        <td>{invoice.due_date}</td>
                        <td><button onClick={() => this._approveInvoice(index, invoice.id)}>APPROVE</button></td>
                    </tr>
                )
            }

        )
    }

    render(){
        return (
            <div className="App">
                <table>
                    <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Vendor Name</th>
                        <th>Vendor Address</th>
                        <th>Invoice Total</th>
                        <th>Invoice Date</th>
                        <th>Due Date</th>
                        <th>Approve</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this._listInvoices()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Home;