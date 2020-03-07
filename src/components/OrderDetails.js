import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FilteredMultiSelect from 'react-filtered-multiselect'
import Bar from './Bar';
import Suites from './Suites.js';
import Suites_test from './Suites_test';
import './OrderDetails.css'

class OrderDetails extends Component{
    continue = e =>{
        e.preventDefault();
        this.props.nextStep();
    }
    state={showInfo:false}
    suite_options=['C-16','C-17','C-18','C-19','C-20','C-21','C-22','C-46','C-47','C-48','C-49',
                    'C-50','C-51','C-52','C-53','C-54','B-29','E Suite Lounge','SBE VIP Room']
          
    single_game=['Clippers vs Pelicans - Sun Nov 14, 2019']
    multi_game=['Clippers vs Rockets - Thurs Dec 19, 2019 *MULTI GAME PACKAGE ONLY*',
                'Clippers vs Warriors - Fri Jan 10, 2020 *MULTI GAME PACKAGE ONLY*',
                'Clippers vs Nuggets - Fri Feb 28, 2020 *MULTI GAME PACKAGE ONLY*']
                    
    render(){
        const {values,handleChange,handleGAandChange,confirmClient,handleSuite,confirmDiscounts}=this.props
        let imgurl='../../img/staples_map.jpg'
        const new_multi_game=this.multi_game.filter(selected=>selected!==values.event)
        const deliveryfee=values.delivery_method==='Print' ? 25 :0
        const gatotal=parseFloat(values.GA)*parseFloat(values.price_ga)
        const totalSRO=values.rowSeat.length>0 ? values.rowSeat.map(order=>parseFloat(order.SRO)).reduce((sum,current)=>sum+current)*values.price_sro:0
        const totalGA=values.rowSeat.length>0 ? values.rowSeat.map(order=>parseFloat(order.GA)).reduce((sum,current)=>sum+current)*values.price_ga:0

        const disc=values.showDiscount===true && values.suite.length>0? parseFloat(values.discount):0
        const subtotal=parseFloat(totalGA)+parseFloat(totalSRO)+parseFloat(deliveryfee)-disc+10
        const price_prediscount=parseFloat(totalGA)+parseFloat(totalSRO)+parseFloat(deliveryfee)
        const graybutton=values.discount==='' || values.discount==="0" || values.discount===null || parseFloat(values.discount)>price_prediscount? "disabled":null
        
        const pricemap=values.rowSeat.map(order=>{return(<React.Fragment>
                                                            <p id='price_summary'>({order.name}) GA : ${values.price_ga} x {order.GA} = ${parseFloat(values.price_ga)*parseFloat(order.GA)}</p>            
                                                            <p id='price_summary'>({order.name}) SRO : ${values.price_sro} x {order.SRO} = ${parseFloat(values.price_sro)*parseFloat(order.SRO)}</p>
                                                            
                                                            </React.Fragment>)})

        const summary=values.rowSeat.map(order=>{return(<p>Suite: {order.name} / GA: 1-{order.GA} / SRO: {order.SRO>0?'1-':null}{order.SRO}</p>)})
        console.log(totalSRO)
        return(
            <MuiThemeProvider>
            <div className='container p-0'>
                <Bar page='Order Details'/>
    
                {/* First four fields */}
                <div id='top' className='m-0 row'>
                    <div id='topleft' className=''>
                        {/* Sales Rep */}
                        <div>
                            <h2>Sales Representative</h2>
                            <br/>
                            <label id='eventbox'>
                                <select value={values.rep} onChange={handleChange('rep')}>
                                    <option selected='selected' value={null}>-</option>
                                    <option value='Ryan Bleier'>Ryan Bleier</option>
                                    <option value='Alexander Smith'>Alexander Smith John</option>
                                    
                                </select>
                            </label>
                        </div>
                       <br/>
                        <h2>Client Information</h2>
                        <br/>
                        <h6>Client Name:</h6>
                        <input className='pl-1 mt-2' list="data" type='text' name='data' onChange={handleChange('name')}/>
                        <datalist id="data">
                            <option value="John Smith">John Smith</option>
                            <option value="Mary Ballmer">Mary Ballmer</option>
                            <option value="Adam Williams">Adam Williams</option>
                            <option value="Johnathan Leonard">Johnathan Leonard</option>
                            <option value="Ashley George">Ashley George</option>
                            <option value="Jorvis Harrell">Jorvis Harrell</option>
                        </datalist>
                        <button className='' onClick={confirmClient} type="button">Confirm</button>
                        <br/>
                       
{/* 
                        <TextField
                            hintText='Enter Client Name'
                            floatingLabelText='Client Name'
                            onChange={handleChange('name')}
                            defaultValue={values.name}
                            /> */}
                        <br/>
                      
                        <div>
                        <h6>Client Email:</h6>
                            {values.name!=='' && values.showInfo===true ? <p id='client_info'>jsmith@aol.com</p>:<p id='space'></p>}
                        <h6>Client Phone Number:</h6>
                            {values.name!=='' && values.showInfo===true ? <p id='client_info'>(613)-148-3131</p>:<p id='space'></p>}
                        <h6>Client Account Number:</h6>
                            {values.name!=='' && values.showInfo===true ? <p id='client_info'>9032901282</p>:<p id='space'></p>}
                        </div>
                      
    
                        {/* <TextField
                            hintText='Enter Client Email'
                            floatingLabelText='Client Email'
                            onChange={handleChange('email')}
                            defaultValue={values.email}
                            />
                        <br/>
                        <TextField
                            hintText='Enter Client Phone Number'
                            floatingLabelText='Client Phone Number'
                            onChange={handleChange('phone_number')}
                            defaultValue={values.phone_number}
                            />
                        <br/>
                        <TextField
                            hintText='Enter Client AXS Account Number'
                            floatingLabelText='Client AXS Account Number'
                            onChange={handleChange('account_number')}
                            defaultValue={values.account_number}
                            />
                        <br/> */}



                    <form>
                    {/* <input onChange={this.handleChange.bind(this)} type="text" name="username" placeholder="Enter name here" />
                    <button onClick={this.handleSubmit.bind(this)}>Submit</button> */}
                    </form>
                </div>
                {/* MAP */}

                <div id='topright' className=''>
                    <a href={imgurl} target='_blank' rel="noopener noreferrer"><img src={imgurl} alt='Staples Center Map' id='map'/></a>
                    Click map to enlarge
                </div>
                 {/* Suite selection radio buttons */}
                 

                </div>
                <br/>
                 {/* EVENT SELECT  */}
               
                <div id='eventselect'>
                    <h2>Event</h2>
                    <br/>
                    <label id='eventbox'>
                        <select value={values.event} onChange={handleChange('event')}>
                            <option selected='selected' value={''}>-</option>
                            <option value='Clippers vs Pelicans - Sun Nov 14, 2019'>Clippers vs Pelicans - Sun Nov 14, 2019 </option>
                            <option value='Clippers vs Rockets - Thurs Dec 19, 2019 *MULTI GAME PACKAGE ONLY*'>Clippers vs Rockets - Thurs Dec 19, 2019 *MULTI GAME PACKAGE ONLY*</option>
                            <option value='Clippers vs Warriors - Fri Jan 10, 2020 *MULTI GAME PACKAGE ONLY*'>Clippers vs Warriors - Fri Jan 10, 2020 *MULTI GAME PACKAGE ONLY*</option>
                            <option value='Clippers vs Nuggets - Fri Feb 28, 2020 *MULTI GAME PACKAGE ONLY*'>Clippers vs Nuggets - Fri Feb 28, 2020 *MULTI GAME PACKAGE ONLY*</option>
                        </select>
                    </label>
                </div>

                {/* SELECT 2 OTHER GAMES  
                {this.multi_game.includes(values.event)?
                <div id='addbox' >
                    <br/>
                    <h5>Select 2 Additional Games for Package Deal:</h5>
                    <div class="wrapper" >
                        <select size="5" name="" id="" class="form-control">
                            {new_multi_game.map(game=>{
                                return(<option value={game}>{game}</option>)
                            })}
                        </select></div>
                </div>:null}
                <br/> */}
                {/* SUITE SELECTION */}
                {values.event!==''?<div>
                <div id='suite_selection' className=''>
                        <br/>
                        <h2>Suite:</h2>
                        <br/>
                        {this.suite_options.map(suite=>{
                        return <Suites_test rowSeat={values.rowSeat} handleSuite={handleSuite} handleGAandChange={handleGAandChange} suite={suite} selected_suite={values.suite} GA={values.GA} SRO={values.SRO} hyde={values.hyde} handleChange={handleChange}/>
                        })}
                </div>

                {/* RA */}
                
                <div id='ra'>
                    <h2>Rental Agreement</h2>
                  
                    <label id='rabox'>
                        <select value={values.ra} onChange={handleChange('ra')}>
                            <option selected='selected' value={null}>-</option>
                            <option value='on file'>On file</option>
                            <option value='pending'>Pending</option>
                        </select>
                    </label>
                </div>    
                
                {/* Method of Delivery  */}

                <div id='delivery'>
                    <h2>Method of Delivery</h2>
               
                    <label id='deliverybox'>
                        <select value={values.delivery_method} onChange={handleChange('delivery_method')}>
                            <option selected='selected' value={null}>-</option>
                            <option value='AXS'>AXS Mobile Ticket (Free)</option>
                            <option value='Print'>Print/Standard Mail ($25)</option>
                            
                        </select>
                    </label>
                </div>    
                

                {/* Mailing Address if applicable  */}
                {values.delivery_method==='Print' ?
                <div id='delivery'>
                    <h4>Mailing Address:</h4>
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
                </div>:null}
               
    

                {/* Order Summary  */}
                <div id='order_summary'>
                    <h2 className='mb-3'>Order Summary</h2>
                    <p><span id='summarylabels'>Client Name: </span>{values.name}</p>
                    <p><span id='summarylabels'>Client Acount Number: </span>{values.account_number}</p>
                    <p><span id='summarylabels'>Client Phone Number: </span>{values.phone_number}</p>
                    <p><span id='summarylabels'>Client Email: </span>{values.email}</p>
                    <p><span id='summarylabels'>Event: </span>{values.event}</p>
                    <p><span id='summarylabels'>Purchases: </span>{summary}</p>
                    {/* <p><span id='summarylabels'>GA: </span>{values.GA}</p>
                    <p><span id='summarylabels'>SRO's Purchased: </span>{values.SRO}</p> */}
                    <p><span id='summarylabels'>Price Breakdown: </span></p>
                       <div id='price_container'>
                        {values.rowSeat.length>0 ? <React.Fragment>{pricemap}</React.Fragment>:null}
                    {values.delivery_method==='Print' ? <p id='price_summary'>Standard Mail Fee = $25</p>:null}
                    {subtotal>10 ? <p id='price_summary'>Web Processing Fee = $10</p>:null}
                    {values.showDiscount===true ? <p id='discount'>Discount = -${parseFloat(values.discount)}</p>:null}
                    {values.rowSeat.length>0? <hr/>:null} 
                    {values.rowSeat.length>0?<p id='summarylabels'>Subtotal: ${subtotal}</p>:null} 
                        </div>
                </div>
                <br/>
                <br/>

                {/* DISCOUNT BOX */}
                  <div id='commentsbox'>
                    <h2>Discounts:</h2>
                    <br/>
                    <label for="quantity">Amount:</label><br/>
                    $ {subtotal>0 && values.suite.length>0? <input defaultValue={values.discount} min="0" type="number" id="quantity" name="discount" className='mb-2' max='99' onChange={handleChange('discount')}></input>:
                    <input defaultValue={values.discount} disabled min="0" type="number" id="quantity" name="discount" className='mb-2' max='99' onChange={handleChange('discount')}></input>}
                    <br/>
                    <label>Discount description:</label><br/>
                    
                    {graybutton==='disabled'?<textarea defaultValue={values.discount_comment} disabled id='textbox_discount' className='mb-2' name='discount_comment' onChange={handleChange('discount_comment')}/>:
                    <textarea defaultValue={values.discount_comment} id='textbox_discount' className='mb-2' name='discount_comment' onChange={handleChange('discount_comment')}/>}
                    <br/>
                    {graybutton==='disabled'? <button className='' disabled onClick={confirmDiscounts} type="button">Apply</button> :
                     <button className=''  onClick={confirmDiscounts} type="button">Apply</button>}


                     {parseFloat(values.discount)>price_prediscount && values.suite.length>0? <p id='disc_error' className='mt-2'>Discount cannot exceed total price.</p>:null}
                    {values.showDiscount===true ? <p className='mt-2'>Discount has been applied.</p>:null}
                </div>
                <br/>      
                <br/>
                {/* COMMENT BOX */}
                <div id='commentsbox'>
                    <h2>Comments:</h2>
                    <br/>
                    <textarea id='textbox' value={values.comments} onChange={handleChange('comments')}/>
                </div>


            {/* Continue button */}
            <div id='button'>
              <br/>
              <RaisedButton
                        label='Continue to Checkout page'
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                    />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
              </div>

            
          </div>:<p id='spacebottom'></p>}
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

export default OrderDetails