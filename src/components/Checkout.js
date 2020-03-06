import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Bar from './Bar'
// import PaymentForm from './PaymentForm'
import CreditCardInput from 'react-credit-card-input';
import './Checkout.css'
class Checkout extends Component{
    continue = e =>{
        e.preventDefault();
        this.props.nextStep();
    }
    
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render(){
        const {values,handleChange}=this.props
        console.log(values.cardNumber)
        console.log(values.expiry)
        console.log(values.cvc)
        return(
            <MuiThemeProvider>
                <div className='container'>
                    <Bar page='Checkout'/>
                    <div id='top' className='m-0 row'>
                        <div id='topleft'>
                            <h5>Credit Card Information:</h5>
                            <TextField
                                hintText='Enter Name on Credit Card'
                                floatingLabelText='Name on Credit Card'
                                onChange={handleChange('ccname')}
                                defaultValue={values.ccname}
                                />
                                <br/>
                                <br/>
                            <CreditCardInput
                                cardNumberInputProps={{ value: values.cardNumber, onChange:handleChange('cardNumber') }}
                                cardExpiryInputProps={{ value: values.expiry, onChange: handleChange('expiry') }}
                                cardCVCInputProps={{ value: values.cvc, onChange:handleChange('cvc') }}
                                fieldClassName="input"
                                />
                                <br/>
                                <br/>
                                <br/>
                    
                        </div>
                        <div id='pricebox'>
                            <p>Suite Price : $125 x 24 =<span id='pr'> $3,000.00</span></p>
                            <p>SRO Price : $100 x 20 =<span id='pr'>$2,000.00</span></p>
                            {values.delivery_method==='Print' ? <p>Delivery Fee : <span id='pr'>$20.00</span></p>:null}
                            {/* <p>F & B : <span id='pr'>$1,000.00</span></p> */}
                            <p>Subtotal : <span id='pr'>$6,000.00</span></p>
                            <p>Web Processing Fee : <span id='pr'>$10.00</span></p>
                            <hr/>
                            <p>Total Price : <span id='pr'>$6,360.00</span></p>
                        </div>
                    </div>
                    <div id='billingbox'>
                    <h5>Billing Information:</h5>
                                <TextField
                                hintText='Enter Billing Name'
                                floatingLabelText='Billing Name'
                                // onChange={handleChange('billing_address')}
                                defaultValue="John Smith"
                                />
                                <br/>
                            <TextField
                                hintText='Enter Billing Address'
                                floatingLabelText='Billing Address'
                                onChange={handleChange('billing_address')}
                                defaultValue={values.billing_address}
                                />
                                
                                <br/>
                            <TextField
                                hintText='Enter Billing City'
                                floatingLabelText='Billing City'
                                onChange={handleChange('billing_city')}
                                defaultValue={values.billing_city}
                                 />
                            <br/>
                            <TextField
                                hintText='Enter Billing Zipcode'
                                floatingLabelText='Billing Zipcode'
                                onChange={handleChange('billing_zip_code')}
                                defaultValue={values.billing_zipcode}
                                />
                    </div>

                    <div id='button_checkout'>
                        <RaisedButton
                            label='Continue to Confirmation Page'
                            primary={true}
                            style={styles.button}
                            onClick={this.continue}
                        />
                        <RaisedButton
                            label='Back'
                            primary={false}
                            style={styles.button}
                            onClick={this.back}
                        />
                    </div>
                {/* <div id='top' className='row'> */}
                {/* <div id='topleft' className=''> */}
                    {/* <TextField
                        hintText='Enter Credit Card Number'
                        floatingLabelText='Credit Card Number'
                        onChange={handleChange('creditcard_number')}
                        defaultValue={values.creditcard_number}
                        />
                    <br/>
                    <TextField
                        hintText='Enter CSC'
                        floatingLabelText='CSC'
                        onChange={handleChange('csc')}
                        defaultValue={values.csc}
                        />
                    <br/>
                    <TextField
                        hintText='Enter Exp. Date'
                        floatingLabelText='Exp. Date'
                        onChange={handleChange('exp_date')}
                        defaultValue={values.exp_date}
                        />
                    <br/>
                  
                    <form>
                    {/* <input onChange={this.handleChange.bind(this)} type="text" name="username" placeholder="Enter name here" />
                    <button onClick={this.handleSubmit.bind(this)}>Submit</button> */}
                    {/* </form> */} 
                {/* </div> */}
                {/* </div> */}


            </div >
        </MuiThemeProvider>

        )

    }
}
const styles ={
    button:{
        margin:15,
        height:60
    }
}


export default Checkout