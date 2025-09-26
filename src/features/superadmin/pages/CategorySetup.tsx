import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tags, Package, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import type { Category } from '@/utils/categories'; // I dont understand what the heck is this

import { getCategories, saveCategories, initializeCategories } from '@/utils/categories';

export default function CategorySetup() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Tags className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Category Management</h2>
                        <p className="text-muted-foreground">Organize your products into categories</p>
                    </div>
                </div>
                <Button onClick={handleCreateCategory}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Categories</p>
                                <p className="text-2xl font-bold">{categories.length}</p>
                            </div>
                            <Tags className="w-8 h-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Active Categories</p>
                                <p className="text-2xl font-bold">{categories.filter(c => c.isActive).length}</p>
                            </div>
                            <Package className="w-8 h-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Products</p>
                                <p className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.itemCount, 0)}</p>
                            </div>
                            <Package className="w-8 h-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Categories Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Categories Overview</CardTitle>
                    <CardDescription>
                        Manage your product categories
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Products</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                                                <Package className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{category.name}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{category.code}</Badge>
                                    </TableCell>
                                    <TableCell className="max-w-xs">
                                        <p className="truncate">{category.description}</p>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-medium">{category.itemCount}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={category.isActive ? 'default' : 'secondary'}>
                                            {category.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
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
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Electronics, Clothing"
                            />
                        </div>

                        <div>
                            <Label htmlFor="code">Category Code *</Label>
                            <Input
                                id="code"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="e.g., ELEC, CLOTH"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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