import React, {Component} from 'react';
import CreditCardInput from 'react-credit-card-input';

class PaymentForm extends Component {
 render(){
   return(
    <CreditCardInput
    cardNumberInputProps={{ value: cardNumber, onChange: this.handleCardNumberChange }}
    cardExpiryInputProps={{ value: expiry, onChange: this.handleCardExpiryChange }}
    cardCVCInputProps={{ value: cvc, onChange: this.handleCardCVCChange }}
    fieldClassName="input"
  />
   )
 }
}
export default PaymentForm;