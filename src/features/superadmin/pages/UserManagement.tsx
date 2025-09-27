import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Plus,
    Edit,
    Trash2,
    Users,
    UserCheck,
    UserX,
    Search,
    Mail,
    Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'super_admin' | 'admin' | 'manager' | 'cashier' | any;
    isActive: boolean;
    lastLogin?: string;
    createdDate: string;
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
        createdDate: '2024-01-01'
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
        createdDate: '2024-01-02'
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
        createdDate: '2024-01-05'
    }
];

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('All');
    const [statusFilter, setStatusFilter] = useState<string>('All');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: 'cashier' as const,
        isActive: true
    });

    const handleCreateUser = () => {
        setFormData({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            role: 'cashier',
            isActive: true
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
            isActive: user.isActive
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
                createdDate: new Date().toISOString().split('T')[0]
            };
            updatedUsers = [...users, newUser];
            toast.success('User created successfully');
        }

        setUsers(updatedUsers);
        setIsDialogOpen(false);
    };

    const handleDeleteUser = (id: string) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
        toast.success('User deleted successfully');
    };

    const handleToggleUserStatus = (id: string) => {
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, isActive: !user.isActive } : user
        );
        setUsers(updatedUsers);
        toast.success('User status updated');
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === 'All' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'All' ||
            (statusFilter === 'Active' && user.isActive) ||
            (statusFilter === 'Inactive' && !user.isActive);

        return matchesSearch && matchesRole && matchesStatus;
    });

    const userStats = {
        total: users.length,
        active: users.filter(u => u.isActive).length,
        inactive: users.filter(u => !u.isActive).length,
        admins: users.filter(u => u.role === 'admin' || u.role === 'super_admin').length
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'super_admin': return 'bg-red-100 text-red-800';
            case 'admin': return 'bg-blue-100 text-blue-800';
            case 'manager': return 'bg-green-100 text-green-800';
            case 'cashier': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold">User Management</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">Manage system users and access</p>
                    </div>
                </div>
                <Button onClick={handleCreateUser} className="gap-2 self-start sm:self-auto">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add User</span>
                    <span className="sm:hidden">Add</span>
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Total Users</p>
                                <p className="text-xl sm:text-2xl font-bold">{userStats.total}</p>
                            </div>
                            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Active Users</p>
                                <p className="text-xl sm:text-2xl font-bold">{userStats.active}</p>
                            </div>
                            <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Inactive Users</p>
                                <p className="text-xl sm:text-2xl font-bold">{userStats.inactive}</p>
                            </div>
                            <UserX className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Administrators</p>
                                <p className="text-xl sm:text-2xl font-bold">{userStats.admins}</p>
                            </div>
                            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                        <div>
                            <CardTitle className="text-lg sm:text-xl">User Overview</CardTitle>
                            <CardDescription className="text-sm sm:text-base">
                                Manage system users and their access levels
                            </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative">
                                <Input
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e: any) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full sm:w-64"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            </div>
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Roles</SelectItem>
                                    <SelectItem value="super_admin">Super Admin</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="cashier">Cashier</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Status</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Users Table */}
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead className="hidden sm:table-cell">Username</TableHead>
                                <TableHead className="hidden lg:table-cell">Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium">
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm sm:text-base">{user.firstName} {user.lastName}</p>
                                                <p className="text-xs text-muted-foreground sm:hidden">{user.username}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <span className="text-sm">{user.username}</span>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <div className="flex items-center gap-1">
                                            <Mail className="w-3 h-3 text-muted-foreground" />
                                            <span className="text-sm">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`text-xs ${getRoleBadgeColor(user.role)}`}>
                                            {user.role.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.isActive ? 'default' : 'secondary'} className="text-xs">
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
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
                                                onClick={() => handleToggleUserStatus(user.id)}
                                            >
                                                {user.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteUser(user.id)}
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
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? 'Edit User' : 'Add New User'}
                        </DialogTitle>
                        <DialogDescription>
                            Create or modify user accounts and access levels
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="firstName">First Name *</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e: any) => setFormData({ ...formData, firstName: e.target.value })}
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name *</Label>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e: any) => setFormData({ ...formData, lastName: e.target.value })}
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="username">Username *</Label>
                            <Input
                                id="username"
                                value={formData.username}
                                onChange={(e: any) => setFormData({ ...formData, username: e.target.value })}
                                placeholder="johndoe"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cashier">Cashier</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="super_admin">Super Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

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

                        <div className="flex justify-end space-x-2 pt-4">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveUser}>
                                {isEditing ? 'Update' : 'Create'} User
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}