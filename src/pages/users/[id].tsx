// src/pages/user-management/[id].tsx
import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useRouter } from 'next/router';
import { FaSave } from 'react-icons/fa';

const UserForm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Local state for the form
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: 'user',
  });

  const [loading, setLoading] = useState(false);

  // Simulate fetching data when editing an existing user
  useEffect(() => {
    if (id) {
      // Simulating data fetch for the user
      setUserData({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user', // Example role
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulating saving the user data
    setTimeout(() => {
      console.log('User Data Saved:', userData);
      setLoading(false);
      router.push('/user-management'); // Redirect to user listing after success
    }, 1000); // Simulate a network request delay
  };

  return (
    <div>
      <h1>{id ? 'Edit User' : 'Add New User'}</h1>
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
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="super_admin">Super Admin</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          <FaSave /> {id ? 'Save Changes' : 'Add User'}
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
