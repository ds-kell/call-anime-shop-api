import React, { useState } from 'react';

const AddDeliveryAddress = () => {
  const [receiver, setReceiver] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [specificAddress, setSpecificAddress] = useState('');
  const [content, setContent] = useState('');
  const [defaultAddress, setDefaultAddress] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form submission or API call here
    // You can access the form data using the state variables above

    // Reset form fields
    setReceiver('');
    setPhoneNumber('');
    setProvince('');
    setDistrict('');
    setWard('');
    setSpecificAddress('');
    setContent('');
    setDefaultAddress(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="receiver">Receiver:</label>
        <input
          type="text"
          id="receiver"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="province">Province:</label>
        <input
          type="text"
          id="province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="district">District:</label>
        <input
          type="text"
          id="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="ward">Ward:</label>
        <input
          type="text"
          id="ward"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="specificAddress">Specific Address:</label>
        <input
          type="text"
          id="specificAddress"
          value={specificAddress}
          onChange={(e) => setSpecificAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="defaultAddress">Default Address:</label>
        <input
          type="checkbox"
          id="defaultAddress"
          checked={defaultAddress}
          onChange={(e) => setDefaultAddress(e.target.checked)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddDeliveryAddress;
