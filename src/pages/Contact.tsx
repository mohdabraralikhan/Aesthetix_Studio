import React from 'react';
import { Helmet } from 'react-helmet-async';
import ContactSection from '../components/sections/ContactSection';

const Contact: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Contact | Aesthetix Studio — Hire Web Designer Hyderabad</title>
                <meta name="description" content="Contact Aesthetix Studio in Falaknuma, Hyderabad for project inquiries. Professional web developers near you for affordable startup design and consultations." />
                <meta name="keywords" content="Website developers near me, Hire Web Designer Hyderabad, Project Inquiry Aesthetix Studio, Affordable Web Design for Startups, Web Design Consultation, Contact Falaknuma Web Studio" />
            </Helmet>
            <ContactSection isFullPage={true} />
        </>
    );
};

export default Contact;
