import React, { useState } from 'react';
import axios from 'axios';
import './RequestForm.css';

function RequestForm() {
    const [formData, setFormData] = useState({ name: '', email: '', templateType: 'website', deskripsi: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/submit_request', formData);
            setFormData({ name: '', email: '', templateType: 'website', deskripsi: '' });
            alert('Request submitted successfully!');
        } catch (error) {
            console.error("Error submitting request:", error);
            alert('Error submitting request.');
        }
    };

    return (
        <div className="request-form-container">
            <form onSubmit={handleSubmit} className="request-form">

                <h2>Request a Template</h2>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="templateType">Template Type:</label>
                    <select id="templateType" name="templateType" value={formData.templateType} onChange={handleChange}>
                        <option value="website">Website</option>
                        <option value="presentasi">Presentation</option>
                        <option value="lainnya">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="deskripsi">Description:</label>
                    <textarea id="deskripsi" name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows="4" required />
                </div>

                <button type="submit">Submit Request</button>

            </form>
        </div>
    );
}

export default RequestForm;