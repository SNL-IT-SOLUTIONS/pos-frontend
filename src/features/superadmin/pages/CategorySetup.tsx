import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Tags,
    Package,
    Plus,
    Edit,
    Trash2,
    Search
} from 'lucide-react';
import { toast } from 'sonner';
import type { Category } from '../utils/categories';
import { getCategories, saveCategories, initializeCategories } from '../utils/categories';

export default function CategorySetup() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        code: '',
        color: 'bg-blue-100 text-blue-800',
        icon: 'package',
        isActive: true
    });

    useEffect(() => {
        initializeCategories();
        setCategories(getCategories());
    }, []);

    const handleCreateCategory = () => {
        setFormData({
            name: '',
            description: '',
            code: '',
            color: 'bg-blue-100 text-blue-800',
            icon: 'package',
            isActive: true
        });
        setIsEditing(false);
        setIsDialogOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setFormData({
            name: category.name,
            description: category.description,
            code: category.code,
            color: category.color,
            icon: category.icon,
            isActive: category.isActive
        });
        setSelectedCategory(category);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const handleSaveCategory = () => {
        if (!formData.name || !formData.code) {
            toast.error('Please fill in all required fields');
            return;
        }

        let updatedCategories;
        if (isEditing && selectedCategory) {
            updatedCategories = categories.map(cat =>
                cat.id === selectedCategory.id
                    ? { ...cat, ...formData }
                    : cat
            );
            toast.success('Category updated successfully');
        } else {
            const newCategory: Category = {
                id: Date.now().toString(),
                ...formData,
                itemCount: 0,
                createdDate: new Date().toISOString().split('T')[0]
            };
            updatedCategories = [...categories, newCategory];
            toast.success('Category created successfully');
        }

        setCategories(updatedCategories);
        saveCategories(updatedCategories);
        setIsDialogOpen(false);
    };

    const handleDeleteCategory = (id: string) => {
        const updatedCategories = categories.filter(cat => cat.id !== id);
        setCategories(updatedCategories);
        saveCategories(updatedCategories);
        toast.success('Category deleted successfully');
    };



    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.code.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All' ||
            (statusFilter === 'Active' && category.isActive) ||
            (statusFilter === 'Inactive' && !category.isActive);

        return matchesSearch && matchesStatus;
    });

    const categoryStats = {
        total: categories.length,
        active: categories.filter(c => c.isActive).length,
        inactive: categories.filter(c => !c.isActive).length,
        totalProducts: categories.reduce((sum, cat) => sum + cat.itemCount, 0)
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Tags className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold">Category Management</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">Organize your products into categories</p>
                    </div>
                </div>
                <Button onClick={handleCreateCategory} className="gap-2 self-start sm:self-auto">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Category</span>
                    <span className="sm:hidden">Add</span>
                </Button>
            </div>

            {/* Categories Management */}
            <div className="space-y-4 sm:space-y-6">

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-muted-foreground">Total Categories</p>
                                    <p className="text-xl sm:text-2xl font-bold">{categoryStats.total}</p>
                                </div>
                                <Tags className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-muted-foreground">Active Categories</p>
                                    <p className="text-xl sm:text-2xl font-bold">{categoryStats.active}</p>
                                </div>
                                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-muted-foreground">Inactive Categories</p>
                                    <p className="text-xl sm:text-2xl font-bold">{categoryStats.inactive}</p>
                                </div>
                                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-muted-foreground">Total Products</p>
                                    <p className="text-xl sm:text-2xl font-bold">{categoryStats.totalProducts}</p>
                                </div>
                                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                            <div>
                                <CardTitle className="text-lg sm:text-xl">Category Overview</CardTitle>
                                <CardDescription className="text-sm sm:text-base">
                                    Manage and organize your product categories
                                </CardDescription>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <Input
                                        placeholder="Search categories..."
                                        value={searchTerm}
                                        onChange={(e: any) => setSearchTerm(e.target.value)}
                                        className="pl-10 w-full sm:w-64"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                </div>
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

                {/* Categories Table */}
                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="hidden sm:table-cell">Code</TableHead>
                                    <TableHead className="hidden lg:table-cell">Description</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCategories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                                                    <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">{category.name}</p>
                                                    <p className="text-xs text-muted-foreground sm:hidden">{category.code}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge variant="outline" className="text-xs">{category.code}</Badge>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell max-w-xs">
                                            <p className="truncate text-sm">{category.description}</p>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium text-sm sm:text-base">{category.itemCount}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={category.isActive ? 'default' : 'secondary'} className="text-xs">
                                                {category.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1 sm:gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditCategory(category)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteCategory(category.id)}
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
            </div>

            {/* Add/Edit Category Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? 'Edit Category' : 'Add New Category'}
                        </DialogTitle>
                        <DialogDescription>
                            Create categories to organize your products
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Category Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Electronics, Clothing"
                            />
                        </div>

                        <div>
                            <Label htmlFor="code">Category Code *</Label>
                            <Input
                                id="code"
                                value={formData.code}
                                onChange={(e: any) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="e.g., ELEC, CLOTH"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e: any) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief description of the category"
                                rows={3}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="rounded"
                            />
                            <Label htmlFor="isActive">Active Category</Label>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveCategory}>
                                {isEditing ? 'Update' : 'Create'} Category
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}