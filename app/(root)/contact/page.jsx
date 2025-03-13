'use client';

import { useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        name: '',
        phoneNumber: '',
        userEmail: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/send/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
    
            alert('Message sent successfully!');
            setFormData({ subject: '', message: '', name: '', phoneNumber: '', userEmail: '' });
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <main className="px-4 pb-8 lg:px-16">
        <section>
            <div className='w-[480px] mx-auto my-10'>
            <h2 className="text-center text-3xl font-semibold mb-4">Our Address</h2>
            <p className="text-center mb-6 mt-10 text-gray-600">Visit our store to explore the latest collections.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4 border-r pr-32">
                <MapPin className="text-5xl text-[#FA9090]" />
                <div>
                <h3 className="font-semibold">Location</h3>
                <p className='text-gray-600'>123 Main Street, New York, NY</p>
                </div>
            </div>
            <div className="flex items-start space-x-4 border-r pr-32">
                <Phone className="text-5xl text-[#FA9090]" />
                <div>
                <h3 className="font-semibold text-xl">Support</h3>
                <p className='text-gray-600'>Mobile: (123) 456-7890</p>
                <p className='text-gray-600'>Support: support@example.com</p>
                </div>
            </div>
            <div className="flex items-start space-x-4">
                <Clock className="text-5xl text-[#FA9090]" />
                <div>
                <h3 className="font-semibold">Opening Hours</h3>
                <p className='text-gray-600'>Monday - Friday: 9AM - 6PM</p>
                <p className='text-gray-600'>Saturday - Sunday: Closed</p>
                </div>
            </div>
            </div>
        </section>
        <section className="mt-16">
            <div className='w-full md:w-[520px] mx-auto mb-16'>
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Ready to Get Started?</h2>
            <p className="text-center mb-8 text-gray-500">Simply complete the form below, and we'll get back to you within 3 business days.</p>
            </div>
            <form className="max-w-xl mx-auto space-y-6" onSubmit={handleSubmit}>
                <input id="userEmail" type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="Your Email *" className="border border-gray-300 p-4 rounded-full w-full" required />
                <input id="subject" type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Your Subject *" className="border border-gray-300 p-4 rounded-full w-full" required />
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your Message *" rows="5" className="border border-gray-300 p-4 rounded-3xl w-full" required></textarea>
                <button type="submit" className="bg-black hover:bg-[#FA9090] w-full text-white py-3 px-6 rounded-md font-semibold transition duration-300" disabled={loading}>{loading ? 'Sending...' : 'Send Enquiry'}</button>
            </form>
        </section>
        </main>
    );
};

export default Contact;
