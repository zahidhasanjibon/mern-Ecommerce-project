import { Avatar, Button, Typography } from '@material-ui/core';
import FaceBookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React from 'react';
import './About.css';

function About() {
    const visitFacebook = () => {
        window.location = 'https://webcreatorzahid.netlify.app/';
    };
    return (
        <div className="aboutSection">
            <div />
            <div className="aboutSectionGradient" />
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
                            src="https://scontent.fird1-1.fna.fbcdn.net/v/t1.6435-9/49482176_2200816590159297_7681301081908838400_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFChdB8fQlBnz9XxPTKsp2jddrjM0xoLTR12uMzTGgtNKb31Jka0nwoNkeHb9HfdDnoFgV2kYfUHAXniaRcJqqc&_nc_ohc=AXjf_TlXXDEAX8fTQdR&_nc_ht=scontent.fird1-1.fna&oh=00_AT_ilBJ8dnbF8U09EwGWAUY6t4AVpxxhsb8WOay2meWwgw&oe=62ADA806"
                            alt="Founder"
                        />
                        <Typography>Zahid hasan jibon</Typography>
                        <Button onClick={visitFacebook} color="primary">
                            Visit Portfolio
                        </Button>
                        <span>This is a sample wesbite made by @zahid hasan.</span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a href="https://webcreatorzahid.netlify.app/" target="blank">
                            <YouTubeIcon className="youtubeSvgIcon" />
                        </a>

                        <a href="https://www.facebook.com/jahid.hasanjibon.37/" target="blank">
                            <FaceBookIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
