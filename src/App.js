import React,{Component} from '../node_modules/react';
import './App.css';
import OrderForm from './components/OrderForm.js'
import Header from './components/Header.js'
class App extends Component {

  // state={
  //   price_code:null,
  //   res:[],
  //   step:1
  // };

  
  //Proceed to next step
  // nextStep = () => {
  //   const {step}=this.state;
  //   this.setState({step:step+1})
  // }

  // prevStep = () => {
  //   const {step}=this.state;
  //   this.setState({step:step-1})
  // }
  
  // handleChange = input => e =>{
  //   this.setState({[input]:e.target.value});
  // }

  // componentDidMount(){
  //   // this.callBackendAPI()
  //   //   .then(res=>this.setState({data:res.express}))
  //   //   .catch(err=>console.log(err));
  //   fetch('/express_backend')
  //   .then(res=>res.json())
  //   .then(customers => this.setState({date:customers}))

  // }

  // callBackendAPI=async() =>{
  //   const response=await fetch('/api/'+this.state.price_code);
  //   const body= await response.json();

  //   if (response.status!==200){
  //     throw(Error(body.message))
  //   }
  //   return((body))
  // }


  // handleChange(e){
    
  // this.setState({price_code: e.target.value});
  // }

  // handleSubmit(e){
  //   e.preventDefault()
  //   fetch('/api/'+this.state.price_code)
  //   .then(res=>res.json())
  //   .then(dat=>this.setState({res:dat},()=>console.log(dat)))
    

  //call the api here with current state value (this.state.username)
  // fetch('/express_backend')
  // .then(res=>res.json())
  // .then(customers => this.setState({data:customers}))
  // }

 
  render(){
    // const custarray=this.state.date.map(dat=>{
    //   return <li key={dat.id}>name={dat.firstName}</li>
    // })
    // console.log(this.state.data)

    return(
      <div className="App">
        <Header/>
        <OrderForm/>
      </div>
    )
  }
}

export default App;
