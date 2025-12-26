import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Star, ArrowRight } from '../Icons';

interface ContactSectionProps {
    isFullPage?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ isFullPage = false }) => {
    const client = generateClient<Schema>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'Website Design & Dev',
        budget: '₹1k - ₹5k',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Check if backend is configured (models will be missing if sandbox hasn't run)
            if (!client.models || !client.models.Inquiry) {
                throw new Error("Form submission is currently unavailable. Please ensure the backend is synced (npx ampx sandbox).");
            }

            await client.models.Inquiry.create({
                name: formData.name,
                email: formData.email,
                projectType: formData.projectType,
                message: formData.message,
                status: ['NEW']
            });

            alert('Thank you! Your message has been sent successfully.');
            setFormData({
                name: '',
                email: '',
                projectType: 'Website Design & Dev',
                budget: '₹1k - ₹5k',
                message: ''
            });
        } catch (error: any) {
            console.error('Submission Error:', error);
            const message = error.message || 'An error occurred. Please try again later.';
            alert(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className={`py-24 lg:py-32 px-6 lg:px-20 bg-white ${isFullPage ? 'min-h-screen' : ''}`}>
            <div className="max-w-4xl mx-auto">
                {/* Centered Header */}
                <div className="text-center mb-20">
                    <span className="block font-mono text-studio-blue text-xs mb-4 uppercase tracking-widest">06 — Contact</span>
                    <h2 className="font-display text-5xl lg:text-7xl font-medium mb-6">Let's Talk.</h2>
                    <p className="text-gray-500 text-lg font-light">
                        Ready to transform your vision into an aesthetic reality? We're currently accepting new projects.
                    </p>
                </div>

                {/* Simplified Centered Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-20" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 group">
                        <label className="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-colors bg-transparent placeholder-gray-300"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2 group">
                        <label className="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-colors bg-transparent placeholder-gray-300"
                            placeholder="email@address.com"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2 group">
                        <label className="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Project Type</label>
                        <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-colors bg-transparent text-gray-700"
                        >
                            <option>Website Design & Dev</option>
                            <option>UI/UX Design</option>
                            <option>Brand Identity</option>
                            <option>Maintenance</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 group">
                        <label className="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Budget</label>
                        <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-colors bg-transparent text-gray-700"
                        >
                            <option>₹1k - ₹5k</option>
                            <option>₹5k - ₹10k</option>
                            <option>₹10k+</option>
                        </select>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2 group">
                        <label className="text-xs font-mono uppercase tracking-widest text-gray-400 group-focus-within:text-studio-blue transition-colors">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border-b border-gray-200 py-3 text-lg focus:outline-none focus:border-studio-blue transition-colors bg-transparent placeholder-gray-300 resize-none"
                            placeholder="Tell us about your goals..."
                            required
                        ></textarea>
                    </div>

                    <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center mt-8 gap-6">
                        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
                            <Star className="w-4 h-4 text-studio-yellow" />
                            <span>Response within 24–48 hours</span>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto bg-studio-dark text-white px-12 py-5 uppercase tracking-widest text-xs font-medium hover:bg-studio-blue transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                        </button>
                    </div>
                </form>

                {!isFullPage && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => navigate('/contact')}
                            className="inline-flex items-center gap-4 px-10 py-4 border border-studio-dark hover:bg-studio-dark hover:text-white transition-all duration-300 group"
                        >
                            <span className="uppercase tracking-widest text-xs font-medium">View Full Contact Details</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}

                {/* Expanded Info for Full Page Mode Only */}
                {isFullPage && (
                    <div className="mt-32 pt-20 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Inquiries</h4>
                            <p className="font-display text-xl">hello@aesthetixstudio.com</p>
                            <p className="font-display text-lg mt-2 text-gray-500 font-light">+91 (Placeholder) Phone Number</p>
                        </div>
                        <div>
                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Studio Address</h4>
                            <p className="font-display text-xl leading-snug">
                                Aesthetix Studio <br />
                                Falaknuma, Hyderabad <br />
                                Telangana, India — 500053
                            </p>
                            <p className="text-xs font-sans text-gray-400 mt-2 italic font-light">Available for global consultations.</p>
                        </div>
                        <div>
                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Social Channels</h4>
                            <div className="flex flex-col gap-4 font-display text-lg">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-studio-blue transition-colors self-start border-b border-transparent hover:border-studio-blue">LinkedIn Profile</a>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-studio-blue transition-colors self-start border-b border-transparent hover:border-studio-blue">GitHub Repository</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ContactSection;
