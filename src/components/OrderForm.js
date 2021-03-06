import React, {Component} from 'react';
import OrderDetails from './OrderDetails';
import Checkout from './Checkout';
import Confirm from './Confirm';
import Success from './Success';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ActionSettingsApplications } from 'material-ui/svg-icons';
class OrderForm extends Component{
    constructor(props){
        super(props)
        this.state={
            clientName:'',
            clientCompany:'Smith Law LLC',
            res:3432,
            step:1,
            rep:'',
            repId:'',
            replist:[],
            rowSeat:[],
            suite:[],
            selected_suite:[],
            event:'a',
            eventdate:'',
            clientAccount:969402314,
            clientPhone:6173242332,
            clientEmail:'jsmith@gmail.com',
            creditcard_number:324242,
            csc:316,
            exp_date:'03/23',
            billing_address:'1212 Flower St',
            billing_city:'Los Angeles',
            billing_state:'CA',
            billing_zipcode:'90024',
            cardNumber:'2412 5311 0531 2166',
            expiry:'03/22',
            cvc:613,
            ccname:'John Smith',
            GA:null,
            SRO:null,
            hyde:null,
            ra:null,
            delivery_method:null,
            price_ga:"150",
            price_sro:"175",
            subtotal:0,
            total:0,
            discountList:[],
            discount:0,
            discount_comment:null,
            showDiscount:false,
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
    
      // API CALL FOR SENDGRID
    

      // callBackendAPI=async() =>{
      //   fetch('/findRep/b')
      //   .then(res=>res.json())
      //   .then(rep=> this.setState({replist:rep.recordset},()=>console.log(rep)))
      // }
        // .then(customers => console.log(customers))}
      
        callRepBackendAPI = (inputValue, callback) => {
          if (!inputValue) {
            callback([]);

          } else {
              fetch('/findRep?char='+inputValue)
              .then(resp=>{
                return resp?resp.json():{}

              }).then((data) =>{
                  const tempArray=data.recordset.map(dat=>({label:`${dat.rep_last_name}, ${dat.rep_first_name}`,value:dat.rep_id}))
                  callback(tempArray)   

              }).catch((error) => {
                console.log(error, "catch the hoop")

              });

          }};
  
          callClientBackendAPI = (inputValue, callback) => {
            if (!inputValue) {
              callback([]);
  
            } else {
                fetch('/findClient?char='+inputValue)
                .then(resp=>{
                  return resp?resp.json():{}
  
                }).then((data) =>{
                    const tempArray=data.recordset.map(dat=>({label:`${dat.last_name}, ${dat.first_name}`,value:dat}))
                    callback(tempArray)   
  
                }).catch((error) => {
                  console.log(error, "catch the hoop")
  
                });
  
            }};      

      handleClient = input => ({value,label}) =>{
        this.setState({clientName:label})
        this.setState({clientEmail:value.email})
        this.setState({clientCompany:value.company_name})
        this.setState({clientAccount:value.account_number})
        const phonenum=value.phone1!=='N/A' ?value.phone1.slice(0,-7) + '-' + value.phone1.slice(-7,-4) + '-' + value.phone1.slice(-4):'N/A'
        this.setState({clientPhone:phonenum})        

      }     

      componentDidMount(){
        // this.callBackendAPI()
          // .then(res=>this.setState({data:res.express}))
          // .catch(err=>console.log(err));
      //   fetch('/express_backend')
      //   .then(res=>res.json())
      //   .then(customers => console.log(customers))}
      }

      handleSubmitMail = () => {
        // event.preventDefault();

        // console.log(event.target);

        // this.setState({
        //     disabled: true
        // });
// http://localhost:5000/
        Axios.post('/api/email', this.state)
            .then(res => {
                if(res.data.success) {
                    // this.setState({
                    //     disabled: false,
                    //     emailSent: true
                    // });
                    console.log('sent!')
                } else {
                    // this.setState({
                    //     disabled: false,
                    //     emailSent: false
                    // });
                    console.log('failed')
                }
            })
            .catch(err => {
                console.log(err);

                // this.setState({
                //     disabled: false,
                //     emailSent: false
                // });
            })

    }

      //Proceed to next step
      nextStep = () => {
        const {step}=this.state;
        this.setState({step:step+1})
      }
      
      handleTotal=()=>{
        const deliveryfee=this.state.delivery_method==='Print' ? 25 :0

        const totalSRO=this.state.rowSeat.length>0 ? this.state.rowSeat.map(order=>parseFloat(order.SRO)).reduce((sum,current)=>sum+current)*this.state.price_sro:0
        const totalGA=this.state.rowSeat.length>0 ? this.state.rowSeat.map(order=>parseFloat(order.GA)).reduce((sum,current)=>sum+current)*this.state.price_ga:0

        const sumdisc=this.state.discountList!==false && this.state.suite.length>0? this.state.discountList.map(disc=>disc.discount):null
        
        const subtotal=parseFloat(totalGA)+parseFloat(totalSRO)+10 +parseFloat(deliveryfee)   
        const total=subtotal-sumdisc.reduce((a, b) => a + b, 0)
        
        
        this.setState({subtotal:subtotal})
        this.setState({total:total})
      }

      prevStep = () => {
        const {step}=this.state;
        this.setState({step:step-1})
      }
      
      resetForm = () =>{
        this.setState(this.baseState)
      }


      confirmDiscounts=(e)=>{
        // this.setState({showDiscount:true})
        e.preventDefault()
  
        this.setState({discountList:[...this.state.discountList,{key:uuidv4(),discount:this.state.discount,comment:this.state.discount_comment}]}, 
          ()=>{
        
              this.setState({discount:0})
        
            this.setState({discount_comment:''})
          })
        this.setState({showDiscount:true})
        // this.setState({total:this.state.total-this.state.discount})
      }

      removeDiscount=(e)=>{
        const newList=this.state.discountList.filter(disc=> disc.key!==e.key)
        this.setState({discountList:newList})
        this.setState({total:this.state.total-e.discount})
      }
      handleRep = input => ({value,label}) =>{
        // this.setState({rep:e.target.getAttribute('data-value')});
        this.setState({rep:label})
        this.setState({repId:value})
      }

 
      handleChange = input => e =>{
        if (input==='discount'){
          this.setState({showDiscount:false})
          this.setState({[input]:parseInt(e.target.value)});
        }else{
        this.setState({[input]:e.target.value});
        }
        // if (input==='SRO'){

          // // const current_rowseat=
          // // console.log(current_rowseat)
          // if (this.state.rowSeat.map(rowseat=>rowseat.location).includes(e.target.value.slice(-4))){
          //   console.log('sup')
          //   // const new_rowseat=
          //   this.setState({rowSeat:this.state.rowSeat.filter(rowseat=>rowseat.location!=e.target.value.slice(-4))})
          // }else{
          // let temp={'location':e.target.value.slice(-4),'sro':e.target.value.slice(0,-4)}
          // this.setState({rowSeat:[...this.state.rowSeat,temp]})
        
      // }
      }
      handleEvent = input => e =>{
        this.setState({[input]:e.target.value});
        this.setState({eventdate:e.target.value.slice(-8,)})}

      handleSROandRow=input=>e=>{
        // this.handleSRO(e)
     
        this.setState({[input]:e[0].target.value});
  
          // let temp=[2,e.target.value]
          let temp={'loc':e[1],'sro':e[0].target.value}
          this.setState({rowSeat:[...this.state.rowSeat,temp]})
        

      }
      handleSuite=input=>e=>{
        if(this.state.suite.includes(e.target.value)){
            const suite_without=this.state.suite.filter(suite=>suite!==e.target.value)
            if(suite_without.length===0){
              this.setState({showDiscount:false})
            }
            this.setState({suite:suite_without})
            this.setState({rowSeat:this.state.rowSeat.filter(obj=>obj.name!==e.target.value)})
            // this.setState({rowSeat:[...this.state.rowSeat,{'name':e.target.value,'GA':e.target.getAttribute('gan'),'SRO':'0'}]})
          }else{
          this.setState({suite:[...this.state.suite,e.target.value]})
          this.setState({rowSeat:[...this.state.rowSeat,{'name':e.target.value,'GA':e.target.getAttribute('gan'),'SRO':'0'}]})
          }
    
      }
      handleGAandChange=input=>e=>{
          // this.handleGA(e)
          // if(this.state.suite.includes(e.target.value)){
          //   const suite_without=this.state.suite.filter(suite=>suite!==e.target.value)
          //   this.setState({suite:suite_without})
          // }else{
          // this.setState({suite:[...this.state.suite,e.target.value]})
          // }
  
          if(this.state.suite.includes(e.target.getAttribute('suitename'))){
            // const newrowSeat=this.state.rowSeat.filter(obj=>obj.name!==e.target.suitename)
            // this.setState({rowSeat:newrowSeat})
            this.setState({rowSeat:[...this.state.rowSeat.filter(obj=>obj.name!==e.target.getAttribute('suitename')),{'name':e.target.getAttribute('suitename'),'GA':e.target.getAttribute('gan'),'SRO':e.target.value}]})
          }else{
            this.setState({rowSeat:[...this.state.rowSeat,{'name':e.target.getAttribute('suitename'),'GA':e.target.getAttribute('gan'),'SRO':e.target.value}]})
        }
      }
      handleSubtotal=(e)=>{
        this.setState({subtotal:e})
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

          // {console.log(this.state.suite)}
        const {step}=this.state

        const {clientName,clientCompany,subtotal,total,res,rep,repId,rowSeat,replist,selected_suite,clientAccount,eventdate,clientPhone,clientEmail,creditcard_number,
                  csc,exp_date,billing_address,billing_state,billing_city,billing_zipcode,suite,event,cardNumber,expiry,cvc,ccname,GA,SRO,hyde,ra,delivery_method,price_ga,price_sro,
                 discount_comment,discount,discountList,showDiscount,comments}=this.state

        const values={clientName,clientCompany,res,rep,repId,total,subtotal,replist,rowSeat,selected_suite,eventdate,clientAccount,clientPhone,clientEmail,creditcard_number,
            csc,exp_date,billing_address,billing_city,billing_state,billing_zipcode,suite,event,cardNumber,expiry,cvc,ccname,GA,SRO,hyde,ra,delivery_method,
            discount_comment,discount,showDiscount,discountList,price_ga,price_sro,comments}


        switch(step){
          case 1:
            return(
              <OrderDetails 
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                values={values}
                handleGAandChange={this.handleGAandChange}
                handleSROandRow={this.handleSROandRow}
                confirmDiscounts={this.confirmDiscounts}
                handleSuite={this.handleSuite}
                callRepBackendAPI={this.callRepBackendAPI}
                handleEvent={this.handleEvent}
                handleSubtotal={this.handleSubtotal}
                handleTotal={this.handleTotal}
                handleRep={this.handleRep}
                handleClient={this.handleClient}
                callClientBackendAPI={this.callClientBackendAPI}
                removeDiscount={this.removeDiscount}
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
                callBackendAPI={this.callBackendAPI}
                handleSubmitMail={this.handleSubmitMail}
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