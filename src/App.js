import React, { Component } from 'react';
import { Table, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faThumbs, faImage, faMoneyCheckAlt, faSearchDollar} from '@fortawesome/free-solid-svg-icons'
class App extends Component {
    state = {
        isLoading: true,
        invoices: [
            /*{
                "id": "100",
                "Vendor": "Bini",
                "Amount": "$12,000",
                "Invoice": "1526",
                "Date": "09/09/2021"
            },
            {
                "id": "200",
                "Vendor": "Bini",
                "Amount": "$12,000",
                "Invoice": "1526",
                "Date": "09/09/2021"
            },
            {
                "id": "400",
                "Vendor": "Bini",
                "Amount": "$12,000",
                "Invoice": "1526",
                "Date": "09/09/2021"
            },
            {
                "id": "500",
                "Vendor": "Bini",
                "Amount": "$12,000",
                "Invoice": "1526",
                "Date": "09/09/2021"
            },*/
        ]
    }

   

    async componentDidMount(){
        const apiurl = process.env.REACT_APP_INVOICE_API_URL;
        console.log(apiurl);
        const response = await fetch(apiurl);
        const body = await response.json();
        this.setState({invoices: body, isLoading: false})
        console.log(this.state.invoices)
    }

    remove(id){
        let updatedInvoices = [...this.state.invoices].filter (i => i.Id !== id)
        this.setState({invoices: updatedInvoices});
    }

    render() {
        const isLoading = this.state.isLoading;
        const allinvoices = this.state.invoices;
        
        if (isLoading)
            return (<div>Loading...</div>)

        let invoices = allinvoices.map( invoice => 
            <tr key={invoice.Id}>
                <td>{invoice.Vendor}</td>
                <td>{invoice.Amount}</td>
                <td>{invoice.Invoice}</td>
                <td>{invoice.Date}</td>
                <td><Button className="btn btn-lg btn-success" onClick={() => this.remove(invoice.Id)}> <FontAwesomeIcon icon={faThumbsUp}/>OK</Button></td>
                <td><Button className="btn btn-lg btn-danger" onClick={() => this.remove(invoice.Id)} ><FontAwesomeIcon icon={faThumbsDown}/>NOK</Button></td>
                <td><Button className="btn btn-lg btn-info" onClick={() => this.remove(invoice.Id)} ><FontAwesomeIcon icon={faMoneyCheckAlt}/>50%</Button></td>
                <td><Button className="btn btn-lg btn-warning" onClick={() => this.remove(invoice.Id)} ><FontAwesomeIcon icon={faSearchDollar}/>??</Button></td>
                <td><Button className="btn btn-lg btn-info" onClick={() => this.remove(invoice.Id)} ><FontAwesomeIcon icon={faImage}/>Image</Button></td>
                
                
            </tr>

        );
        return (
            <div className="container border border-secondary rouded center">
                <div className="row">
                    <div className="col-12">
                        <h4>Pending Invoices - The test company</h4>
                    </div>
                </div>

                <div className="row">
                    <div className=".col-xs-12 center text-center">
                        <Table dark  responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>vendor</th>
                                    <th>Amount</th>
                                    <th>Invoice #</th>
                                    <th>Date</th>
                                    <th colSpan="4">Actions</th>
                                    <th>Image</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.invoices.length === 0 ? <tr ><td colSpan="9">All Caught up!</td></tr> : invoices}
                            </tbody>
                        </Table>
                    </div>
                </div>
                
            </div>
        );
    }
}


export default App;
