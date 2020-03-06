import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Bar from './Bar'

class Success extends Component{
    reset = e => {
        e.preventDefault();
        this.props.resetForm();
    }
    render(){
        return(
          <MuiThemeProvider>
              <div className=''>
                <br/>
                <br/>
                <h1>Thank you for your order!</h1>
                <br/>
                <h5>An email with your order details has been sent to admin@staplescenter.com</h5>
                <br/>
                <RaisedButton
                    label='New Order'
                    primary={true}
                    style={styles.button}
                    onClick={this.reset}
                />          
              
              </div>



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

export default Success