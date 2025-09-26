import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings, Users, Tags, Building, LogOut, Activity, Store, Cog, LayoutDashboard } from 'lucide-react';
import SystemConfiguration from './SystemConfiguration';
import CategorySetup from './CategorySetup';
import UserManagement from './UserManagement';
import { useNavigate } from 'react-router-dom';

export default function SuperAdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    // Mock system status data
    const systemStatus = {
        categoriesSetup: true,
        usersSetup: true,
        systemConfigured: true
    };

    const setupModules = [
        {
            id: 'categories',
            title: 'Category Management',
            description: 'Configure product categories and organization',
            icon: Tags,
            status: systemStatus.categoriesSetup ? 'complete' : 'pending',
            tab: 'categories',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            id: 'users',
            title: 'User Management',
            description: 'Create admin users and manage roles',
            icon: Users,
            status: systemStatus.usersSetup ? 'complete' : 'pending',
            tab: 'users',
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            id: 'config',
            title: 'System Configuration',
            description: 'Business settings, tax rates, and system preferences',
            icon: Settings,
            status: systemStatus.systemConfigured ? 'complete' : 'pending',
            tab: 'config',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        }
    ];

    return (
        <>
            {/* Header */}
            <div className="p-4 bg-slate-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Cog className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">Super Admin Dashboard</h1>
                        <p className="text-sm text-slate-200 mt-1">POS system setup and configuration management</p>
                    </div>
                </div>

                <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="gap-2 border-slate-400 text-slate-100 hover:bg-slate-800 hover:text-white hover:border-slate-300 transition-all duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                </Button>
            </div>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Main Content */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            {/* Enhanced Tabs */}
                            <div className="border-b border-slate-200 px-6 bg-slate-50/50">
                                <TabsList className="grid w-full grid-cols-4 h-12 gap-2 bg-transparent p-0">
                                    <TabsTrigger
                                        value="overview"
                                        className="gap-2 px-4 py-3 rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold transition-all duration-200 font-medium text-slate-600 hover:text-slate-800"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Overview
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="categories"
                                        className="gap-2 px-4 py-3 rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold transition-all duration-200 font-medium text-slate-600 hover:text-slate-800"
                                    >
                                        <Tags className="w-4 h-4" />
                                        Categories
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="users"
                                        className="gap-2 px-4 py-3 rounded-lg data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:font-semibold transition-all duration-200 font-medium text-slate-600 hover:text-slate-800"
                                    >
                                        <Users className="w-4 h-4" />
                                        Users
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="config"
                                        className="gap-2 px-4 py-3 rounded-lg data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:font-semibold transition-all duration-200 font-medium text-slate-600 hover:text-slate-800"
                                    >
                                        <Settings className="w-4 h-4" />
                                        <span className="hidden sm:inline">Configuration</span>
                                        <span className="sm:hidden">Config</span>
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            {/* Tab Contents */}
                            <div className="p-6">
                                <TabsContent value="overview" className="space-y-6 mt-0">
                                    {/* Overview Header */}
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-slate-800 mb-2">System Overview</h2>
                                        <p className="text-slate-600">Monitor your POS system status and performance</p>
                                    </div>

                                    {/* System Stats */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Total Categories', value: '12', icon: Tags, color: 'text-blue-600', bgColor: 'bg-blue-50' },
                                            { label: 'Active Users', value: '8', icon: Users, color: 'text-green-600', bgColor: 'bg-green-50' },
                                            { label: 'System Status', value: 'Ready', icon: Activity, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
                                            { label: 'Store Setup', value: 'Complete', icon: Store, color: 'text-purple-600', bgColor: 'bg-purple-50' }
                                        ].map((stat, index) => {
                                            const IconComponent = stat.icon;
                                            return (
                                                <Card key={index} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                                                    <CardContent className="p-6">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                                                                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                                                            </div>
                                                            <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
                                                                <IconComponent className="w-5 h-5" />
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </div>

                                    {/* POS Setup Status */}
                                    <Card className="border border-slate-200 shadow-sm bg-white">
                                        <CardHeader className="pb-4 border-b border-slate-100">
                                            <CardTitle className="text-xl text-slate-800">POS Setup Status</CardTitle>
                                            <CardDescription className="text-slate-600">
                                                Overview of POS system setup progress and configuration modules
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {setupModules.map((module) => {
                                                    const IconComponent = module.icon;
                                                    return (
                                                        <Card
                                                            key={module.id}
                                                            className="cursor-pointer border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 bg-white"
                                                            onClick={() => setActiveTab(module.tab)}
                                                        >
                                                            <CardContent className="p-5">
                                                                <div className="flex items-start justify-between mb-4">
                                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${module.bgColor} ${module.color}`}>
                                                                        <IconComponent className="w-5 h-5" />
                                                                    </div>
                                                                    <Badge
                                                                        variant={module.status === 'complete' ? 'default' : 'secondary'}
                                                                        className={module.status === 'complete' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-slate-100 text-slate-800 border-slate-200'}
                                                                    >
                                                                        {module.status === 'complete' ? 'Complete' : 'Pending'}
                                                                    </Badge>
                                                                </div>
                                                                <h3 className="font-semibold text-slate-800 mb-2">{module.title}</h3>
                                                                <p className="text-sm text-slate-600">{module.description}</p>
                                                            </CardContent>
                                                        </Card>
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Quick Actions */}
                                    <Card className="border border-slate-200 shadow-sm bg-white">
                                        <CardHeader className="pb-4 border-b border-slate-100">
                                            <CardTitle className="text-xl text-slate-800">Quick Actions</CardTitle>
                                            <CardDescription className="text-slate-600">
                                                Common super admin tasks and shortcuts
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="h-14 flex-col gap-2 border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 transition-colors bg-white"
                                                    onClick={() => setActiveTab('categories')}
                                                >
                                                    <Tags className="w-4 h-4" />
                                                    <span>Manage Categories</span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="h-14 flex-col gap-2 border-green-200 text-green-700 hover:border-green-300 hover:bg-green-50 hover:text-green-800 transition-colors bg-white"
                                                    onClick={() => setActiveTab('users')}
                                                >
                                                    <Users className="w-4 h-4" />
                                                    <span>User Management</span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="h-14 flex-col gap-2 border-purple-200 text-purple-700 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-800 transition-colors bg-white"
                                                    onClick={() => setActiveTab('config')}
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    <span>System Settings</span>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="categories" className="mt-0">
                                    <CategorySetup />
                                </TabsContent>

                                <TabsContent value="users" className="mt-0">
                                    <UserManagement />
                                </TabsContent>

                                <TabsContent value="config" className="mt-0">
                                    <SystemConfiguration />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}