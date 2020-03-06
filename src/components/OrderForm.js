import React, {Component} from 'react';
import OrderDetails from './OrderDetails';
import Checkout from './Checkout';
import Confirm from './Confirm';
import Success from './Success';
import { ActionSettingsApplications } from 'material-ui/svg-icons';
class OrderForm extends Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            res:3432,
            step:1,
            rep:'',
            showInfo:false,
            suite:[],
            event:'a',
            account_number:969402314,
            phone_number:6173242332,
            email:'jsmith@gmail.com',
            creditcard_number:324242,
            csc:316,
            exp_date:'03/2020',
            billing_address:'1212 Flower St',
            billing_city:'Los Angeles',
            billing_zipcode:'90024',
            cardNumber:'2412 5311 0531 2166',
            expiry:null,
            cvc:613,
            ccname:'John Smith',
            GA:null,
            SRO:null,
            hyde:null,
            ra:null,
            delivery_method:null,
            price_ga:"150",
            price_sro:"175",
            comments:''
        };
        this.baseState=this.state
    }

    // setGA= () =>{
    //     const GA24_SRO20=['C-16','C-17','C-21','C-22','C-47','C-48','C-52','C-53']
    //     const GA20_SRO14=['C-18','C-19','C-20','C-49','C-50','C-51']
    //     const GA12_SRO8=['C-46','C-54','B-29']
    //     const GAOther_2020=['E Suite Lounge','SBE VIP Room']
    //     new_ga=null
    //     if(GA24_SRO20.includes(this.state.suite)){
    //         new_ga="24"
    //     } else if(GA20_SRO14.includes(this.state.suite) || GAOther_2020.includes(this.state.suite) ){
    //         new_ga='20'
    //     }else{
    //         new_ga='12'
    //     }
    //     this.setState({GA:new_ga})
    
      //Proceed to next step
      nextStep = () => {
        const {step}=this.state;
        this.setState({step:step+1})
      }
    
      prevStep = () => {
        const {step}=this.state;
        this.setState({step:step-1})
      }
      
      resetForm = () =>{
        this.setState(this.baseState)
      }

      confirmClient = () =>{
        this.setState({showInfo:true})
      }

      handleChange = input => e =>{
        this.setState({[input]:e.target.value});
      }
      handleGAandChange=input=>e=>{
          this.handleGA(e)
          if(this.state.suite.includes(e.target.value)){
            const suite_without=this.state.suite.filter(suite=>suite!==e.target.value)
            this.setState({suite:suite_without})
          }else{
          this.setState({suite:[...this.state.suite,e.target.value]})
          }
      }
      
      handleGA=(e)=>{
        const GA24_SRO20=['C-16','C-17','C-21','C-22','C-47','C-48','C-52','C-53']
        const GA20_SRO14=['C-18','C-19','C-20','C-49','C-50','C-51']
        const GA12_SRO8=['C-46','C-54','B-29']
        const GAOther_2020=['E Suite Lounge','SBE VIP Room']
        if(GA24_SRO20.includes(e.target.value)){
            this.setState({GA:"24"})
        } else if(GA20_SRO14.includes(e.target.value) || GAOther_2020.includes(e.target.value) ){
            this.setState({GA:"20"})
        }else{
            this.setState({GA:"12"})
        }
      }
      render(){
          {console.log(this.state.suite)}
        const {step}=this.state
        const {name,res,rep,showInfo,account_number,phone_number,email,creditcard_number,
        csc,exp_date,billing_address,billing_city,billing_zipcode,suite,event,cardNumber,expiry,cvc,ccname,GA,SRO,hyde,ra,delivery_method,price_ga,price_sro,comments}=this.state
        const values={name,res,rep,showInfo,account_number,phone_number,email,creditcard_number,
            csc,exp_date,billing_address,billing_city,billing_zipcode,suite,event,cardNumber,expiry,cvc,ccname,GA,SRO,hyde,ra,delivery_method,price_ga,price_sro,comments}


        switch(step){
          case 1:
            return(
              <OrderDetails 
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                values={values}
                handleGAandChange={this.handleGAandChange}
                confirmClient={this.confirmClient}
                />
                
            )
          case 2:
            return(
                <Checkout
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
                />
            )
          case 3:
            return(
                <Confirm
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                values={values}   
                
                />
            )
          case 4:
            return(
            <Success
            resetForm={this.resetForm}
            />)
        }
      }
}

export default OrderForm