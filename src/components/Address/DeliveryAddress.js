import React from "react";
import SmallMenu from "../Profile/SmallMenu";
import './css/Address.css'
import GetDeliveryAddress from "./GetDeliveryAddress";
function DeliveryAddress() {


    return (
        <div className='address-background'>
            <div className='container address'>
                <div className='row'>
                    <div className='col-md-2 '>
                        <SmallMenu></SmallMenu>
                    </div>
                    <div className='col-md-8 address-col-backgound'>
                        <GetDeliveryAddress />
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div >
        </div >
    )
}
export default DeliveryAddress;