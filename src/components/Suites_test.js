import React, {Component} from 'react';
import './Suites_test.css'
import SROcomp from './SRO';

const Suites_test = ({selected_suite,suite,rowSeat,handleChange,GA,SRO,hyde,handleGAandChange,handleSuite}) =>{
    const GA24_SRO20=['C-16','C-17','C-21','C-22','C-47','C-48','C-52','C-53']
    const GA20_SRO14=['C-18','C-19','C-20','C-49','C-50','C-51']
    const GA12_SRO8=['C-46','C-54','B-29']
    const GAOther_2020=['E Suite Lounge','SBE VIP Room']
    const sold_suites=['C-17','C-49','C-54']
    const sro20=[...Array(21).keys()].map(num=>{
        return(<option value={num.toString()}>{num}</option>)
    })
    const sro14=[...Array(15).keys()].map(num=>{
        return(<option value={num.toString()}>{num}</option>)
    })
    const sro8=[...Array(9).keys()].map(num=>{
        return(<option value={num.toString()}>{num}</option>)
    })
    

    return(
      
        <div className='radiobuttons'>
            <div id='suite_row'>

                {sold_suites.includes(suite)?
                    <div><input type="checkbox" disabled onChange={handleSuite('suite')} value={suite} name="suite"/> <span id='sold_label'>{suite}<span id='space'> </span>
                        {GA24_SRO20.includes(suite) ? 'General Admission: 24 ($130/per) /  Standing Room Capacity: 20 ($120/per) (Sold)' :null}
                        {GA20_SRO14.includes(suite) ? 'General Admission: 20 ($125/per) /  Standing Room Capacity: 14 ($110/per) (Sold)' :null}
                        {GA12_SRO8.includes(suite) ?  'General Admission: 12 ($100/per) /  Standing Room Capacity: 8 ($90/per) (Sold)' :null}
                        {GAOther_2020.includes(suite) ?'General Admission: 20 ($120/per) / Standing Room Capacity: 20 ($120/per) (Sold)' :null}</span></div>
                    :
                    <div><input type="checkbox" onChange={handleSuite('suite')} gan='24' value={suite} name="suite"/> {suite}<span id='space'> </span>
                        {GA24_SRO20.includes(suite) ? 'General Admission: 24 ($130/per) /  Standing Room Capacity: 20 ($120/per)' :null}
                        {GA20_SRO14.includes(suite) ? 'General Admission: 20 ($125/per) /  Standing Room Capacity: 14 ($110/per)' :null}
                        {GA12_SRO8.includes(suite) ?  'General Admission: 12 ($100/per) /  Standing Room Capacity: 8 ($90/per)' :null}
                        {GAOther_2020.includes(suite) ?'General Admission: 20 ($120/per) / Standing Room Capacity: 20 ($120/per)' :null}</div>
                }
             {selected_suite.includes(suite) ?
                <SROcomp suite={suite} SRO={SRO} handleGAandChange={handleGAandChange} rowSeat={rowSeat}/>:
                null}
            </div>
               
            {/* <div>
               {selected_suite.includes(suite) ?
               <label id='buySRO'>
                    # of Standing Room to Purchase? &nbsp;&nbsp;
                    <select value={SRO} onChange={handleChange('SRO')}>
                    {GA24_SRO20.includes(suite) ? sro20 :null}
                    {GA20_SRO14.includes(suite) ? sro14 :null}
                    {GA12_SRO8.includes(suite) ? sro8 :null}
                    {GAOther_2020.includes(suite) ? sro20 :null}
                    </select>
                </label> :null           
                }
            
            </div> */}

            {/* <div>

            {GAOther_2020.includes(suite) &selected_suite===suite ?
                <label id='hyde'>
                    Hyde Member? &nbsp;&nbsp;
                    <select value={hyde} onChange={handleChange('hyde')}>
                        <option selected='selected' value={null}>-</option>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                        
                    </select>
                </label>:null
                } 
            </div> */}
        </div>

     
    )
}
export default Suites_test;