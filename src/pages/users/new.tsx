// src/pages/user-management/new.tsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { FaSave } from 'react-icons/fa';
import { useRouter } from 'next/router';

const NewUser: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: 'user',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle user creation logic here (e.g., API call)

    // Redirect after successful submission
    router.push('/users');
  };

  return (
    <div>
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Role"
          variant="outlined"
          fullWidth
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" type="submit">
          <FaSave /> Save
        </Button>
      </form>
    </div>
  );
};

export default NewUser;
