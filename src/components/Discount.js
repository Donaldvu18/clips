import React, {Component} from 'react';
import './Discount.css'

const Discount = ({disc,removeDiscount}) =>{

    return(
        <div id='discbox'>
            <div className='row discrow'>
                <div className='col-1'>
            <button onClick={()=>removeDiscount(disc)} type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span> 
            </button>
            </div>

            <div className='col-8'>
            {disc.comment}
            </div>

            <div id='disc' className='col-3 discbox'>
          {/* <p id='disc'>  */}
          -${disc.discount}
            </div>
 
          </div>
        </div>
    )
    }

export default Discount;    