import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import {
    Settings, Users, Tags, Building, LogOut, Activity,
    Store, Cog, LayoutDashboard, CheckCircle, Clock
} from 'lucide-react';
import SystemConfiguration from './SystemConfiguration';
import CategorySetup from './CategorySetup';
import UserManagement from './UserManagement';

// Configuration constants
const SETUP_MODULES = [
    {
        id: 'categories',
        title: 'Category Management',
        description: 'Configure product categories and organization',
        icon: Tags,
        status: 'complete' as 'complete',
        tab: 'categories',
        color: 'blue'
    },
    {
        id: 'users',
        title: 'User Management',
        description: 'Create admin users and manage roles',
        icon: Users,
        status: 'complete' as 'complete',
        tab: 'users',
        color: 'green'
    },
    {
        id: 'config',
        title: 'System Configuration',
        description: 'Business settings, tax rates, and system preferences',
        icon: Settings,
        status: 'complete' as 'complete',
        tab: 'config',
        color: 'purple'
    }
];

const SYSTEM_STATS = [
    {
        label: 'Total Categories',
        value: '12',
        trend: '+2 this week',
        icon: Tags,
        color: 'blue'
    },
    {
        label: 'Active Users',
        value: '8',
        trend: '3 online now',
        icon: Users,
        color: 'green'
    },
    {
        label: 'System Status',
        value: 'Healthy',
        trend: '99.9% uptime',
        icon: Activity,
        color: 'emerald'
    },
    {
        label: 'Configurations',
        value: 'Complete',
        trend: 'All modules ready',
        icon: Store,
        color: 'purple'
    }
];

const RECENT_ACTIVITIES = [
    {
        type: 'user',
        title: 'New user created',
        description: 'Admin user "Store Manager" was added to the system',
        icon: Users,
        time: '2 hours ago',
        color: 'green'
    },
    {
        type: 'category',
        title: 'Categories updated',
        description: 'Electronics category configuration was modified',
        icon: Tags,
        time: 'Yesterday',
        color: 'blue'
    },
    {
        type: 'config',
        title: 'System configuration updated',
        description: 'Business settings and tax rate configuration changed',
        icon: Settings,
        time: '2 days ago',
        color: 'purple'
    }
];

<DashboardHeader />



// Stat Card Component
type StatCardProps = {
    label: string;
    value: string;
    trend: string;
    icon: React.ElementType;
    color: string;
};

const StatCard = ({ label, value, trend, icon: Icon, color }: StatCardProps) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600">{label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
                    <p className={`text-xs text-${color}-600 mt-1`}>{trend}</p>
                </div>
                <div className={`p-3 bg-${color}-100 rounded-lg group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
            </div>
        </CardContent>
    </Card>
);

type SetupModuleCardProps = {
    module: {
        id: string;
        title: string;
        description: string;
        icon: React.ElementType;
        status: 'complete' | 'pending';
        tab: string;
        color: string;
    };
    onTabChange: (tab: string) => void;
};


// Setup Module Card Component
const SetupModuleCard = ({ module, onTabChange }: SetupModuleCardProps) => {
    const Icon = module.icon;
    const isComplete = module.status === 'complete';

    return (
        <Card
            className="cursor-pointer group hover:shadow-lg transition-all duration-300"
            onClick={() => onTabChange(module.tab)}
        >
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${module.color}-100`}>
                        <Icon className={`w-5 h-5 text-${module.color}-600`} />
                    </div>
                    <Badge variant={isComplete ? "default" : "secondary"} className="flex items-center gap-1">
                        {isComplete ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {isComplete ? 'Complete' : 'Pending'}
                    </Badge>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {module.title}
                </h3>
                <p className="text-sm text-slate-600">{module.description}</p>
            </CardContent>
        </Card>
    );
};

type ActivityItemProps = {
    activity: {
        type: string;
        title: string;
        description: string;
        icon: React.ElementType;
        time: string;
        color: string;
    };

}

// Activity Item Component
const ActivityItem = ({ activity }: ActivityItemProps) => {
    const Icon = activity.icon;

    return (
        <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
            <div className={`p-2 bg-${activity.color}-100 rounded-lg`}>
                <Icon className={`w-4 h-4 text-${activity.color}-600`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-slate-900">{activity.title}</p>
                <p className="text-sm text-slate-600 truncate">{activity.description}</p>
            </div>
            <div className="text-xs text-slate-500 whitespace-nowrap">{activity.time}</div>
        </div>
    );
};

type TabTriggerProps = {
    value: string;
    icon: React.ElementType;
    label: string;
    mobileLabel?: string;
    className?: string;
};



const TabTrigger = ({ value, icon: Icon, label, mobileLabel, className }: TabTriggerProps) => (
    <TabsTrigger
        value={value}
        className={`flex items-center gap-2 px-4 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm ${className ?? ""}`}
    >
        <Icon className="w-4 h-4" />
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">{mobileLabel || label}</span>
    </TabsTrigger>
);

// Main Dashboard Component
export default function SuperAdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-10">

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    {/* Tab Navigation - looks like nav */}
                    <div className="">
                        <TabsList className="grid w-full grid-cols-4 h-10 sm:h-12 bg-muted/50 p-1 rounded-xl">
                            <TabsTrigger
                                value="overview"
                                className="gap-1 sm:gap-2 px-4 sm:px-8 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 hover:bg-background/50 hover:scale-105 group text-xs sm:text-sm"
                            >
                                <div className="transition-transform duration-300 group-hover:scale-110">
                                    <LayoutDashboard className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="categories"
                                className="gap-1 sm:gap-2 px-4 sm:px-8 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 hover:bg-background/50 hover:scale-105 group text-xs sm:text-sm"
                            >
                                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                                    <Tags className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                Categories
                            </TabsTrigger>
                            <TabsTrigger
                                value="users"
                                className="gap-1 sm:gap-2 px-4 sm:px-8 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 hover:bg-background/50 hover:scale-105 group text-xs sm:text-sm"
                            >
                                <div className="transition-transform duration-300 group-hover:scale-110">
                                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                Users
                            </TabsTrigger>
                            <TabsTrigger
                                value="config"
                                className="gap-1 sm:gap-2 px-4 sm:px-8 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 hover:bg-background/50 hover:scale-105 group text-xs sm:text-sm"
                            >
                                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                <span className="hidden sm:inline">Configuration</span>
                                <span className="sm:hidden">Config</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6 p-8">

                        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                    <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold">System Overview</h2>
                                    <p className="text-sm sm:text-base text-muted-foreground">Monitor your POS system status and performance</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {SYSTEM_STATS.map((stat, index) => (
                                <StatCard key={index} {...stat} />
                            ))}
                        </div>

                        {/* Setup Modules */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">POS Setup Status</CardTitle>
                                <CardDescription>
                                    Overview of POS system setup progress and configuration modules
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {SETUP_MODULES.map((module) => (
                                        <SetupModuleCard
                                            key={module.id}
                                            module={module}
                                            onTabChange={setActiveTab}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Recent Activity</CardTitle>
                                <CardDescription>
                                    Latest system events and configuration changes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {RECENT_ACTIVITIES.map((activity, index) => (
                                        <ActivityItem key={index} activity={activity} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Quick Actions</CardTitle>
                                <CardDescription>
                                    Common super admin tasks and shortcuts
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <Button
                                        variant="outline"
                                        className="h-20 flex-col gap-2 text-base"
                                        onClick={() => setActiveTab("categories")}
                                    >
                                        <Tags className="w-6 h-6" />
                                        Manage Categories
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-20 flex-col gap-2 text-base"
                                        onClick={() => setActiveTab("users")}
                                    >
                                        <Users className="w-6 h-6" />
                                        Add Users
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-20 flex-col gap-2 text-base"
                                        onClick={() => setActiveTab("config")}
                                    >
                                        <Settings className="w-6 h-6" />
                                        System Settings
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Other Tabs */}
                    <TabsContent value="categories" className="p-8">
                        <CategorySetup />
                    </TabsContent>

                    <TabsContent value="users" className="p-8">
                        <UserManagement />
                    </TabsContent>

                    <TabsContent value="config" className="p-8">
                        <SystemConfiguration />
                    </TabsContent>
                </Tabs>

            </main>

        </div>
    );
}