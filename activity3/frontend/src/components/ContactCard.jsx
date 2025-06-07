import React from "react";

function ContactCard(){
    return(
        <>
            <div className="d-flex justify-content-center align-items-center contact-card">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Contact Us</h3>
                        <p className="card-text"><strong>Address: </strong> 123 React Street, UI City, CA 90210</p>
                        <p className="card-text"><strong>Email: </strong> hello@productmanage.com</p>
                        <p className="card-text"><strong>Phone: </strong> +1 (555) 123-4567</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ContactCard;