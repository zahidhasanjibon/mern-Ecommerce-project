/* eslint-disable react/no-array-index-key */
import { Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import React from 'react';
import './CheckoutSteps.css';

function CheckoutSteps({ activeStep }) {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ];

    const stepStyles = {
        boxSizing: 'border-box',
    };

    return (
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
            {steps.map((item, index) => (
                <Step key={index} active={activeStep === index} completed={activeStep >= index}>
                    <StepLabel
                        style={{
                            color: activeStep >= index ? 'tomato' : 'rgba(0, 0, 0, 0.649)',
                        }}
                        icon={item.icon}
                    >
                        {item.label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}

export default CheckoutSteps;
