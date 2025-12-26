import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServicesSection from '../components/sections/ServicesSection';

const Services: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Services | Aesthetix Studio — Custom Web Design Hyderabad</title>
                <meta name="description" content="Commercial-intent web services: Custom WordPress development Hyderabad, SaaS Dashboard Design, and UI Design Systems. Performance-optimized for Core Web Vitals." />
                <meta name="keywords" content="Custom WordPress development Hyderabad, SaaS Dashboard Design, UI Design Systems, Website Redesign Services, Mobile-Responsive Web Design, Visual Identity Enhancement" />
            </Helmet>
            <ServicesSection isFullPage={true} />
        </>
    );
};

export default Services;
