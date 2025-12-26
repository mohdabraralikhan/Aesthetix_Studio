import React from 'react';
import { Helmet } from 'react-helmet-async';
import AboutSection from '../components/sections/AboutSection';

const About: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>About | Aesthetix Studio Founder & Web Designer Hyderabad</title>
                <meta name="description" content="Aesthetix Studio Founder and professional Web Designer in Falaknuma, Hyderabad. Specializing in React, Next.js, and Modern UI Frameworks with 3+ years of experience." />
                <meta name="keywords" content="Aesthetix Studio Founder, Web Designer in Falaknuma, Full-stack Designer Hyderabad, Minimalist Design Philosophy, Professional Web Studio India, 3+ Years Experience" />
            </Helmet>
            <AboutSection isFullPage={true} />
        </>
    );
};

export default About;
