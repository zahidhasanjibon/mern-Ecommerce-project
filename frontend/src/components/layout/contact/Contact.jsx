import { Button } from '@material-ui/core';
import React from 'react';
import './Contact.css';

function Contact() {
    return (
        <div className="contactContainer">
            <a className="mailBtn" href="mailto:zahidhasanjibon90@gmail.com">
                <Button>Contact: zahidhasanjibon90@gmail.com</Button>
            </a>
        </div>
    );
}

export default Contact;
