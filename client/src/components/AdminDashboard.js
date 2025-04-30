import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
    const [requests, setRequests] = useState([]);
    const [replyData, setReplyData] = useState({ to: '', subject: '', body: '' });
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:3001/admin/api/requests');
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const handleReply = (request) => {
        setSelectedRequest(request);
        setShowReplyForm(true);
        setReplyData({ to: request.email, subject: '', body: '' });
    };

    const handleReplyChange = (e) => {
        setReplyData({ ...replyData, [e.target.name]: e.target.value });
    };

    const sendReply = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/admin/api/send_reply', replyData);
            setReplyData({ to: '', subject: '', body: '' });
            setShowReplyForm(false);
            alert('Reply sent successfully!');
        } catch (error) {
            console.error("Error sending reply:", error);
            alert('Error sending reply!');
        }
    };


  return ( <div className="admin-dashboard">

          <h2>Admin Dashboard</h2>

          <table>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Template Type</th>
                      <th>Description</th>
                      <th>Action</th>
                  </tr>
              </thead>
            <tbody>
              {requests.map((request) => (
                  <tr key={request.email}>
                      <td>{request.name}</td>
                      <td>{request.email}</td>
                      <td>{request.templateType}</td>
                      <td>{request.deskripsi}</td>
                      <td><button onClick={() => handleReply(request)}>Reply</button></td>
                  </tr>
              ))}
           </tbody>
          </table>

          {showReplyForm && (
              <div className="reply-form-container">

                  <h3>Reply to {selectedRequest.name}</h3>

                  <form onSubmit={sendReply} className="reply-form">
                      <input type="hidden" name="to" value={replyData.to} />

                      <div className="form-group">
                          <label htmlFor="subject">Subject:</label>
                          <input type="text" id="subject" name="subject" value={replyData.subject} onChange={handleReplyChange} required />
                       </div>

                      <div className="form-group">
                        <label htmlFor="body">Message:</label>
                        <textarea id="body" name="body" value={replyData.body} onChange={handleReplyChange} rows="4" required />
                      </div>

                      <button type="submit">Send Reply</button>
                      <button type="button" onClick={() => setShowReplyForm(false)}>Cancel</button>

                  </form>
               </div>
           )}
       </div>
   );
}

export default AdminDashboard;