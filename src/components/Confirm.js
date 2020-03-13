import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List,ListItem} from 'material-ui/List';
import Bar from './Bar'
import './Confirm.css'
class Confirm extends Component{
    continue = e =>{
        e.preventDefault();
        //process form
        this.props.handleSubmitMail();
        this.props.nextStep();
    }
    
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render(){
        const {values}=this.props
        return(
            <MuiThemeProvider>
            <div className='container'>
                <Bar page='Confirmation'/>
                
                <List id='confirm'>
                    <ListItem
                    primaryText='Sales Representative Name'
                    secondaryText={values.rep}
                    />                    
                    <ListItem
                    primaryText='Client Name'
                    secondaryText={values.clientName}
                    />
                    <ListItem
                    primaryText='Client Company'
                    secondaryText={values.clientCompany}
                    />                    
                    <ListItem
                    primaryText='Client Account Number'
                    secondaryText={values.account_number}
                    />
                    <ListItem
                    primaryText='Client Phone Number'
                    secondaryText={values.phone_number}
                    />
                    <ListItem
                    primaryText='Client Email'
                    secondaryText={values.email}
                    />
                    <ListItem
                    primaryText='Credit Card Number'
                    secondaryText={values.creditcard_number}
                    />
                    <ListItem
                    primaryText='Billing Address'
                    secondaryText={values.billing_address}
                    />
                    <ListItem
                    primaryText='Billing State'
                    secondaryText={values.billing_state}
                    />                    
                    <ListItem
                    primaryText='Billing Zipcode'
                    secondaryText={values.billing_zipcode}
                    />              
                    <ListItem
                    primaryText='Billing City'
                    secondaryText={values.billing_city}
                    />          
                    <ListItem
                    primaryText='Event'
                    secondaryText={values.event}
                    />   
                    <ListItem
                    primaryText='Location'
                    secondaryText={values.suite}
                    />                                             
                    <ListItem
                    primaryText='Row/Seat'
                    secondaryText={values.GA}
                    />            
                    <ListItem
                    primaryText='SRO Purchased'
                    secondaryText={values.SRO}
                    />            
                    <ListItem
                    primaryText='Delivery Method'
                    secondaryText={values.delivery_method}
                    />            
                    <ListItem
                    primaryText='RA'
                    secondaryText={values.RA}
                    />            
                    <ListItem
                    primaryText='Hyde'
                    secondaryText={values.hyde}
                    />            
                    <ListItem
                    primaryText='Comments'
                    secondaryText={values.comments}
                    />                                                                                                                                                                                                                                                                                                   
                </List>

                <RaisedButton
                    label='Confirm & Submit'
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
                <form>
                  {/* <input onChange={this.handleChange.bind(this)} type="text" name="username" placeholder="Enter name here" />
                  <button onClick={this.handleSubmit.bind(this)}>Submit</button> */}
                </form>
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


export default Confirm;