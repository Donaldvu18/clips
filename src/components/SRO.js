import React, {Component} from 'react';

const SROcomp = ({suite,SRO,GA,rowSeat,handleGAandChange}) =>{
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
        <div>
            
        <label id='buySRO'>
            # of Standing Room to Purchase? &nbsp;&nbsp;
            <select value={SRO} onChange={handleGAandChange('SRO')} gan={GA} suitename={suite}>
            {GA24_SRO20.includes(suite) ? sro20 :null}
            {GA20_SRO14.includes(suite) ? sro14 :null}
            {GA12_SRO8.includes(suite) ? sro8 :null}
            {GAOther_2020.includes(suite) ? sro20 :null}
            </select>
        </label>    
        

        </div>
    )
}

export default SROcomp;