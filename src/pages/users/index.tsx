import React, { useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsColDef,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';

const User: React.FC = () => {
  // Dummy data for users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'user' },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'admin',
    },
    {
      id: 3,
      name: 'Mark Johnson',
      email: 'mark.johnson@example.com',
      role: 'super_admin',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', minWidth: 250, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 250, flex: 1 },
    { field: 'role', headerName: 'Role', minWidth: 150, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      type: 'actions', // Type must be 'actions' for GridActionsCellItem
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<FaEdit />}
          label="Edit"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={<FaTrash />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    } as GridActionsColDef, // Explicitly cast to GridActionsColDef
  ];

  const handleEdit = (id: number) => {
    // Handle the Edit action
    console.log(`Edit user with ID: ${id}`);
    // Redirect to the edit page (for example, using Next.js routing)
    // router.push(`/user-management/${id}`);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id)); // Remove user from the list
    }
  };

  return (
    <div>
      <h1 className="mb-4 font-semibold text-xl">User Management</h1>
      <Link href="/users/new">
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: '20px' }}
        >
          Add New User
        </Button>
      </Link>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={users} columns={columns} loading={loading} />
      </div>
    </div>
  );
};

export default User;
