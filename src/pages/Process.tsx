import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProcessSection from '../components/sections/ProcessSection';

const Process: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Our Workflow | Aesthetix Studio — Agile Design-to-Code Website Development</title>
                <meta name="description" content="Ranked for educational intent: Web Design Workflow, UI/UX Discovery Phase, and Agile Design-to-Code Workflow. Attracting high-ticket clients with efficient processes." />
                <meta name="keywords" content="Web Design Workflow, UI/UX Discovery Phase, Full-stack Development Process, Collaborative Design Exploration, Scalable Web Architecture, Agile Design-to-Code Workflow" />
            </Helmet>
            <ProcessSection isFullPage={true} />
        </>
    );
};

export default Process;
