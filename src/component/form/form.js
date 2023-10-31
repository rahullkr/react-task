import React, { useState } from 'react';

function FormSubmission() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://api.example.com/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmissionStatus(data.message);
      })
      .catch((error) => {
        console.error('Error submitting the form:', error);
        setSubmissionStatus('Error submitting the form.');
      });
  };

  return (
    <div>
      <h1>Form Submission in React</h1>
      <form onSubmit={handleSubmit}>
        <div>w
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
}

export default FormSubmission;
