import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Users, Shield, UserCheck, UserX } from 'lucide-react';
import { toast } from 'sonner';

interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'super_admin' | 'admin' | 'manager' | 'cashier';
    isActive: boolean;
    lastLogin?: string;
    createdDate: string;
    permissions: string[];
}

const mockUsers: User[] = [
    {
        id: '1',
        username: 'superadmin',
        email: 'super@possystem.com',
        firstName: 'Super',
        lastName: 'Admin',
        role: 'super_admin',
        isActive: true,
        lastLogin: '2024-01-20T10:30:00',
        createdDate: '2024-01-01',
        permissions: ['all']
    },
    {
        id: '2',
        username: 'admin',
        email: 'admin@possystem.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
        lastLogin: '2024-01-19T15:45:00',
        createdDate: '2024-01-02',
        permissions: ['inventory', 'sales', 'customers', 'reports']
    },
    {
        id: '3',
        username: 'manager1',
        email: 'manager@possystem.com',
        firstName: 'Store',
        lastName: 'Manager',
        role: 'manager',
        isActive: true,
        lastLogin: '2024-01-18T09:15:00',
        createdDate: '2024-01-05',
        permissions: ['inventory', 'sales', 'customers']
    }
];

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: 'cashier' as User['role'],
        isActive: true,
        permissions: [] as string[]
    });

    const roleOptions = [
        { value: 'super_admin', label: 'Super Admin' },
        { value: 'admin', label: 'Admin' },
        { value: 'manager', label: 'Manager' },
        { value: 'cashier', label: 'Cashier' }
    ];

    const permissionOptions = [
        'inventory', 'sales', 'customers', 'reports', 'settings', 'users'
    ];

    useEffect(() => {
        // Load users from localStorage
        const savedUsers = localStorage.getItem('pos_users');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        } else {
            localStorage.setItem('pos_users', JSON.stringify(mockUsers));
        }
    }, []);

    const saveUsers = (updatedUsers: User[]) => {
        setUsers(updatedUsers);
        localStorage.setItem('pos_users', JSON.stringify(updatedUsers));
    };

    const handleCreateUser = () => {
        setFormData({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            role: 'cashier',
            isActive: true,
            permissions: []
        });
        setIsEditing(false);
        setIsDialogOpen(true);
    };

    const handleEditUser = (user: User) => {
        setFormData({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isActive: user.isActive,
            permissions: user.permissions
        });
        setSelectedUser(user);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const handleSaveUser = () => {
        if (!formData.username || !formData.email || !formData.firstName || !formData.lastName) {
            toast.error('Please fill in all required fields');
            return;
        }

        let updatedUsers;
        if (isEditing && selectedUser) {
            updatedUsers = users.map(user =>
                user.id === selectedUser.id
                    ? { ...user, ...formData }
                    : user
            );
            toast.success('User updated successfully');
        } else {
            const newUser: User = {
                id: Date.now().toString(),
                ...formData,
                createdDate: new Date().toISOString().split('T')[0],
                lastLogin: undefined
            };
            updatedUsers = [...users, newUser];
            toast.success('User created successfully');
        }

        saveUsers(updatedUsers);
        setIsDialogOpen(false);
    };

    const handleDeleteUser = (id: string) => {
        if (id === '1') {
            toast.error('Cannot delete super admin user');
            return;
        }

        const updatedUsers = users.filter(user => user.id !== id);
        saveUsers(updatedUsers);
        toast.success('User deleted successfully');
    };

    const toggleUserStatus = (id: string) => {
        if (id === '1') {
            toast.error('Cannot deactivate super admin user');
            return;
        }

        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, isActive: !user.isActive } : user
        );
        saveUsers(updatedUsers);
        toast.success('User status updated');
    };

    const getRoleBadgeColor = (role: User['role']) => {
        switch (role) {
            case 'super_admin': return 'destructive';
            case 'admin': return 'default';
            case 'manager': return 'secondary';
            case 'cashier': return 'outline';
            default: return 'outline';
        }
    };

    const formatLastLogin = (lastLogin?: string) => {
        if (!lastLogin) return 'Never';
        return new Date(lastLogin).toLocaleDateString();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">User Management</h2>
                        <p className="text-muted-foreground">Manage system users and their permissions</p>
                    </div>
                </div>
                <Button onClick={handleCreateUser}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Users</p>
                                <p className="text-2xl font-bold">{users.length}</p>
                            </div>
                            <Users className="w-8 h-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Active Users</p>
                                <p className="text-2xl font-bold">{users.filter(u => u.isActive).length}</p>
                            </div>
                            <UserCheck className="w-8 h-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Admins</p>
                                <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin' || u.role === 'super_admin').length}</p>
                            </div>
                            <Shield className="w-8 h-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Inactive Users</p>
                                <p className="text-2xl font-bold">{users.filter(u => !u.isActive).length}</p>
                            </div>
                            <UserX className="w-8 h-8 text-red-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>System Users</CardTitle>
                    <CardDescription>
                        Manage user accounts and permissions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Login</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium">
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium">{user.firstName} {user.lastName}</p>
                                                <p className="text-sm text-muted-foreground">@{user.username}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={getRoleBadgeColor(user.role)}>
                                            {roleOptions.find(r => r.value === user.role)?.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.isActive ? 'default' : 'secondary'}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{formatLastLogin(user.lastLogin)}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleUserStatus(user.id)}
                                                disabled={user.id === '1'}
                                            >
                                                {user.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteUser(user.id)}
                                                disabled={user.id === '1'}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add/Edit User Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? 'Edit User' : 'Add New User'}
                        </DialogTitle>
                        <DialogDescription>
                            Create or modify user accounts and permissions
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                placeholder="Enter first name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                placeholder="Enter last name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username *</Label>
                            <Input
                                id="username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                placeholder="Enter username"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter email address"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={formData.role} onValueChange={(value: User['role']) => setFormData({ ...formData, role: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roleOptions.map(role => (
                                        <SelectItem key={role.value} value={role.value}>
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="rounded"
                                />
                                <Label htmlFor="isActive">Active User</Label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveUser}>
                            {isEditing ? 'Update' : 'Create'} User
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}