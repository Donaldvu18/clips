import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FilteredMultiSelect from 'react-filtered-multiselect'
import Bar from './Bar';
import Suites from './Suites.js';
import Suites_test from './Suites_test';
import Discount from './Discount';
import AsyncSelect from 'react-select/async'
import './OrderDetails.css'

class OrderDetails extends Component{
    continue = e =>{
        e.preventDefault();
        this.props.nextStep();
        this.props.handleTotal();
    }
    state={showInfo:false}
    suite_options=['C-16','C-17','C-18','C-19','C-20','C-21','C-22','C-46','C-47','C-48','C-49',
                    'C-50','C-51','C-52','C-53','C-54','B-29','E Suite Lounge','SBE VIP Room']
          
    single_game=['Clippers vs Pelicans - Sun Nov 14, 2019']
    multi_game=['Clippers vs Rockets - Thurs Dec 19, 2019 *MULTI GAME PACKAGE ONLY*',
                'Clippers vs Warriors - Fri Jan 10, 2020 *MULTI GAME PACKAGE ONLY*',
                'Clippers vs Nuggets - Fri Feb 28, 2020 *MULTI GAME PACKAGE ONLY*']
                    
    render(){
        const {values,handleChange,handleGAandChange,handleSuite,confirmDiscounts,callRepBackendAPI,handleEvent,handleTotal,handleRep,callClientBackendAPI,handleClient,removeDiscount}=this.props
        let imgurl='../../img/staples_map.jpg'
        const new_multi_game=this.multi_game.filter(selected=>selected!==values.event)
        const deliveryfee=values.delivery_method==='Print' ? 25 :0
        const gatotal=parseFloat(values.GA)*parseFloat(values.price_ga)
        const totalSRO=values.rowSeat.length>0 ? values.rowSeat.map(order=>parseFloat(order.SRO)).reduce((sum,current)=>sum+current)*values.price_sro:0
        const totalGA=values.rowSeat.length>0 ? values.rowSeat.map(order=>parseFloat(order.GA)).reduce((sum,current)=>sum+current)*values.price_ga:0

        const disc=values.showDiscount===true && values.suite.length>0? parseFloat(values.discount):0
        const subtotal=parseFloat(totalGA)+parseFloat(totalSRO)+parseFloat(deliveryfee)+10
        const price_prediscount=parseFloat(totalGA)+parseFloat(totalSRO)+parseFloat(deliveryfee)
        const graybutton=values.discount==='' || values.discount==="0" || values.discount===null || parseFloat(values.discount)>price_prediscount? "disabled":null
        
        const pricemap=values.rowSeat.map(order=>{return(<React.Fragment>
                                                            <p id='price_summary'>({order.name}) GA : ${values.price_ga} x {order.GA} = ${parseFloat(values.price_ga)*parseFloat(order.GA)}</p>            
                                                            <p id='price_summary'>({order.name}) SRO : ${values.price_sro} x {order.SRO} = ${parseFloat(values.price_sro)*parseFloat(order.SRO)}</p>
                                                            
                                                            </React.Fragment>)})

      
        const summary=values.rowSeat.map(order=>{return(<p>Suite: {order.name} / GA: 1-{order.GA} / SRO: {order.SRO>0?'1-':null}{order.SRO}</p>)})
        // const replist=values.replist.map(rep=>{return(<option value={rep.rep_name}>{rep.rep_name}</option>)})
        // const repvector=values.replist.map(rep=>(rep.rep_name.split(" ")[1]+', ' + rep.rep_name.split(" ")[0],rep.rep_id)).sort()
        const sortedreps=values.replist.sort((a, b) => (a.rep_last_name >b.rep_last_name) ? 1 : -1)        
        const replist=sortedreps.map(rep=>{return(<option data-value={rep.rep_id}>{rep.rep_last_name + ', ' + rep.rep_first_name}</option>)})
        const distlist=values.discountList!==false ?values.discountList.map(disc=>disc.comment):''

        const sumdisc=values.discountList!==false? values.discountList.map(disc=>disc.discount):null
        const total=subtotal-sumdisc.reduce((a, b) => a + b, 0)
        // const replist=repvector.map(rep=>{return(<option data-value={rep[1]}>{rep[0]}</option>)})
        return(
            <MuiThemeProvider>
            <div className='container p-0'>
                <Bar id='bar' page='Order Details'/>

                {/* First four fields */}
                <div id='top' className='m-0 row'>
                    <div id='topleft' className=''>
                        {/* Sales Rep */}
                        <div>
                            {/* {console.log(values.replist)} */}
                            <h2>Sales Representative</h2>
                            <br/>
                            {/* <label id='eventbox'>
                            <input className='pl-1 mt-2' list="salesrep" type='text' name='salesrep' onChange={handleRep('rep')}/>
                                <datalist id="salesrep">
                                    <option selected='selected' value={null}>-</option>
                                    {replist}
                                </datalist>                                
                                {/* <select value={values.rep} onChange={handleChange('rep')}> */}
                                    {/* <option selected='selected' value={null}>-</option> */}
                                    {/* <option value='Ryan Bleier'>Ryan Bleier</option>
                                    <option value='Alexander Smith'>Alexander Smith John</option>
                                    <option value='Donny Johnson'>Donny Johnson</option>
                                    <option value='Kalvin Garcia'>Kalvin Garcia</option>
                                    <option value='Connor Jackson'>Connor Jackson</option>
                                    <option value='Dray Green'>Dray Green</option> */}

                                    {/* {replist} */}
                                {/* </select> */}
                            {/* </label> */}
                
                
                       <AsyncSelect
                        id='salesbox'
                            value={{label: values.rep, value: values.rep} }
                            loadOptions={callRepBackendAPI}
                            placeholder="Select Rep..."
                            onChange={handleRep()}
                            defaultOptions={false}
                        />
                        <br/>
                        </div>

                        {/* TESTT******************** */}
                        {/* <div>
                            {console.log(values.clientAccount)}
                      
                        <br/>
                        </div> */}

                       {/* CLIENT INFOOOOOOO*************************************************** */}
                        <h2>Client Information</h2>
                        <br/>
                        <h6><b>Search Client Name:</b></h6>
                        <AsyncSelect
                        id='clientbox'
                            value={{label: values.clientName, value: values.clientName} }
                            loadOptions={callClientBackendAPI}
                            placeholder="Select Client..."
                            onChange={handleClient()}
                            defaultOptions={false}
                        />
                      
                       
{/* 
                        <TextField
                            hintText='Enter Client Name'
                            floatingLabelText='Client Name'
                            onChange={handleChange('name')}
                            defaultValue={values.name}
                            /> */}
                        <br/>
                      
                        <div>
                        <h6 id='client_info'><b> Client:  </b> {values.clientName!=='' ? values.clientName:null}</h6>
                        <h6 id='client_info'><b> Company:  </b> {values.clientName!=='' ? values.clientCompany:null}</h6>
                        <h6 id='client_info'><b> Email:  </b> {values.clientName!=='' ? values.clientEmail:null}</h6>
                        <h6 id='client_info'><b> Phone Number:  </b> {values.clientName!=='' ? values.clientPhone:null}</h6>
                        <h6 id='client_info'><b> Account Number:  </b> {values.clientName!=='' ? values.clientAccount:null}</h6>
                            {/* {values.clientName!=='' ? <p id='client_info'>{values.clientCompany}</p>:<p id='space'></p>}
                        <h6><b>Client Email:</b></h6>
                            {values.clientName!=='' ? <p id='client_info'>{values.clientEmail}</p>:<p id='space'></p>}
                        <h6><b>Client Phone Number:</b></h6>
                            {values.clientName!=='' ? <p id='client_info'>{values.clientPhone}</p>:<p id='space'></p>}
                        <h6><b>Client Account Number:</b></h6>
                            {values.clientName!=='' ? <p id='client_info'>{values.clientAccount}</p>:<p id='space'></p>} */}
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

               {/* {console.log(values.event.slice(-8,))} */}
                <div id='eventselect'>
                    <h2>Event</h2>
                    <br/>
                    <label id='eventbox'>
                        <select value={values.event} onChange={handleEvent('event')}>
                            <option selected='selected' value={''}>-</option>
                            <option value='C191114 Clippers vs Pelicans 11/14/19'>Clippers vs Pelicans - Sun Nov 14, 2019 </option>
                            <option value='C191219 Clippers vs Rockets 12/19/19'>Clippers vs Rockets - Thurs Dec 19, 2019 *MULTI GAME PACKAGE ONLY*</option>
                            <option value='C200110 Clippers vs Warriors 1/10/20'>Clippers vs Warriors - Fri Jan 10, 2020 *MULTI GAME PACKAGE ONLY*</option>
                            <option value='C200228 Clippers vs Nuggets 2/28/20'>Clippers vs Nuggets - Fri Feb 28, 2020 *MULTI GAME PACKAGE ONLY*</option>
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
                    <p><span id='summarylabels'>Rep Name: </span>{values.rep}</p>
                    <p><span id='summarylabels'>Client Name: </span>{values.clientName}</p>
                    <p><span id='summarylabels'>Client Acount Number: </span>{values.clientAccount}</p>
                    <p><span id='summarylabels'>Client Phone Number: </span>{values.clientPhone}</p>
                    <p><span id='summarylabels'>Client Email: </span>{values.clientEmail}</p>
                    <p><span id='summarylabels'>Event: </span>{values.event}</p>
                    <p><span id='summarylabels'>Date: </span>{values.eventdate}</p>
                    <p><span id='summarylabels'>Purchases: </span>{summary}</p>
                    {/* <p><span id='summarylabels'>GA: </span>{values.GA}</p>
                    <p><span id='summarylabels'>SRO's Purchased: </span>{values.SRO}</p> */}
                    <p><span id='summarylabels'>Price Breakdown: </span></p>
                       <div id='price_container'>
                        {values.rowSeat.length>0 ? <React.Fragment>{pricemap}</React.Fragment>:null}
                    {values.delivery_method==='Print' ? <p id='price_summary'>Standard Mail Fee = $25</p>:null}
                    {subtotal>10 ? <p id='price_summary'>Web Processing Fee = $10</p>:null}
                    {/* {values.showDiscount===true ? <p id='discount'>Discount = -${parseFloat(values.discount)}</p>:null} */}
                    {values.rowSeat.length>0? <hr/>:null} 
                    {values.rowSeat.length>0?<p id='summarylabels'>Subtotal: ${subtotal}</p>:null} 
                    {values.discountList.map(disc=>{return <Discount disc={disc} removeDiscount={removeDiscount}/>})}
                    {values.rowSeat.length>0? <hr/>:null} 
                    {values.rowSeat.length>0 ? <p id='summarylabels'>Total: ${total.toString()}</p>:null}
                        </div>
                </div>
                <br/>
                <br/>
                     
                {/* DISCOUNT BOX */}
                  <div id='commentsbox'>
                    <h2>Discounts:</h2>
                    <br/>
                    <form onSubmit={confirmDiscounts}>
                        <div>
                    <label for="quantity">Amount:</label><br/>
                    $ {subtotal>0 && values.suite.length>0? <input value={values.discount} defaultValue={values.discount} min="0" type="number" id="quantity" name="discount" className='mb-2' onChange={handleChange('discount')}></input>:
                    <input  values={values.discount} disabled min="0" type="number" id="quantity" name="discount" className='mb-2' onChange={handleChange('discount')}></input>}
                    <br/>
                    <label>Discount description:</label><br/>
                    
                    {graybutton==='disabled'?<textarea value={values.discount_comment} disabled id='textbox_discount' className='mb-2' name='discount_comment' onChange={handleChange('discount_comment')}/>:
                    <textarea value={values.discount_comment} id='textbox_discount' className='mb-2' name='discount_comment' onChange={handleChange('discount_comment')}/>}
                    <br/>
                    {graybutton==='disabled'? <button className='' disabled onClick={confirmDiscounts} type="button">Apply</button> :
                     <button className=''   type="submit">Apply</button>}


                     {parseFloat(values.discount)>price_prediscount && values.suite.length>0? <p id='disc_error' className='mt-2'>Discount cannot exceed total price.</p>:null}
                    {values.showDiscount===true ? <p className='mt-2'>Discount has been applied.</p>:null}
                    </div>
                    </form>
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