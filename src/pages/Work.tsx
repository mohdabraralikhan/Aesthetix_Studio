import React from 'react';
import { Helmet } from 'react-helmet-async';
import WorkSection from '../components/sections/WorkSection';

const Work: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Work Portfolio | Aesthetix Studio — Best SaaS UI Designs 2025</title>
                <meta name="description" content="Explore our high-end portfolio: Web Design Portfolio 2025, Best SaaS UI Designs, and eCommerce Case Studies. High-performance, pixel-perfect frontend development." />
                <meta name="keywords" content="Web Design Portfolio 2025, Best SaaS UI Designs, eCommerce Website Case Studies, Pixel-perfect Frontend Development, Minimalist Web Design Examples, Motion UI Implementation" />
            </Helmet>
            <WorkSection showViewAll={false} isFullPage={true} />
        </>
    );
};

export default Work;
