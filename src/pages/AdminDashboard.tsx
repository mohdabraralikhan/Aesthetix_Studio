import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import '@aws-amplify/ui-react/styles.css';

const AdminDashboard: React.FC = () => {
    // Do not generate client at module render — create it inside async ops so missing Amplify config doesn't throw.
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            let clientInstance: any;
            try {
                clientInstance = generateClient<Schema>({ authMode: 'userPool' });
            } catch (err) {
                console.error('Could not generate Amplify client:', err);
                setMessages([]);
                return;
            }

            let InquiryModel: any;
            try {
                InquiryModel = clientInstance.models.Inquiry;
            } catch (err) {
                console.error('Inquiry model not available:', err);
                setMessages([]);
                return;
            }

            const result = await InquiryModel.list({});
            // Some clients return { data } shape, others return array directly — normalize:
            const items = result?.data ?? result ?? [];
            setMessages(items);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            let clientInstance: any;
            try {
                clientInstance = generateClient<Schema>({ authMode: 'userPool' });
            } catch (err) {
                console.error('Could not generate Amplify client:', err);
                return;
            }

            let InquiryModel: any;
            try {
                InquiryModel = clientInstance.models.Inquiry;
            } catch (err) {
                console.error('Inquiry model not available:', err);
                return;
            }

            await InquiryModel.delete({ id });
            setMessages(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div className="min-h-screen bg-studio-base">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="font-display text-4xl font-medium mb-2">Admin Messages</h1>
                    <p className="text-gray-500 font-light">Managing client inquiries and messages.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin h-8 w-8 border-b-2 border-gray-700 rounded-full"></div>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {messages.length === 0 ? (
                            <div className="text-center py-20 bg-white border border-gray-100">
                                <p className="text-gray-400">No inquiries found.</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg.id} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2 block">
                                                {msg.projectType || 'General Inquiry'}
                                            </span>
                                            <h3 className="text-xl font-medium">{msg.name}</h3>
                                            <p className="text-gray-400 text-sm">{msg.email}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteMessage(msg.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors text-xs uppercase tracking-widest font-mono"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-50">
                                        <p className="text-gray-600 font-light leading-relaxed whitespace-pre-wrap">
                                            {msg.message}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <span className="text-[10px] text-gray-300 font-mono">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
