import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Settings,
    Save,
    Building,
    CreditCard,
    Percent,
    Clock
} from 'lucide-react';
import { toast } from 'sonner';
import type { BusinessConfig } from '../utils/business-config';
import {
    getBusinessConfig,
    saveBusinessConfig,
    businessPresets,
    applyBusinessPreset
} from '../utils/business-config';

export default function SystemConfiguration() {
    const [config, setConfig] = useState<BusinessConfig>(getBusinessConfig());
    const [hasChanges, setHasChanges] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState<string>('');

    const handleConfigChange = (key: keyof BusinessConfig, value: any) => {
        setConfig(prev => ({
            ...prev,
            [key]: value
        }));
        setHasChanges(true);
    };

    const handleSaveConfig = () => {
        saveBusinessConfig(config);
        setHasChanges(false);
        toast.success('Configuration saved successfully');
    };

    const handleApplyPreset = () => {
        if (!selectedPreset) return;

        const updatedConfig = applyBusinessPreset(selectedPreset);
        setConfig(updatedConfig);
        setHasChanges(true);
        toast.success(`Applied ${selectedPreset} preset`);
    };

    // Convert businessPresets object to array for dropdown
    const presetOptions = Object.entries(businessPresets).map(([key, preset]) => ({
        id: key,
        name: preset.businessType?.replace(/\b\w/g, l => l.toUpperCase()) || key,
        description: `Optimized for ${preset.businessType} businesses`
    }));

    const taxRateOptions = [
        { value: 0, label: 'No Tax (0%)' },
        { value: 5, label: '5%' },
        { value: 7.5, label: '7.5%' },
        { value: 10, label: '10%' },
        { value: 12.5, label: '12.5%' },
        { value: 15, label: '15%' },
        { value: 18, label: '18%' },
        { value: 20, label: '20%' }
    ];

    const currencyOptions = [
        { value: 'USD', label: 'US Dollar ($)' },
        { value: 'EUR', label: 'Euro (€)' },
        { value: 'GBP', label: 'British Pound (£)' },
        { value: 'CAD', label: 'Canadian Dollar (C$)' },
        { value: 'AUD', label: 'Australian Dollar (A$)' },
        { value: 'JPY', label: 'Japanese Yen (¥)' },
        { value: 'CNY', label: 'Chinese Yuan (¥)' },
        { value: 'INR', label: 'Indian Rupee (₹)' }
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold">System Configuration</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">Configure basic business settings</p>
                    </div>
                </div>
                <Button
                    onClick={handleSaveConfig}
                    disabled={!hasChanges}
                    className="gap-2 self-start sm:self-auto"
                >
                    <Save className="w-4 h-4" />
                    Save Changes
                </Button>
            </div>

            {/* Business Presets */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Business Type Preset
                    </CardTitle>
                    <CardDescription>
                        Quick setup for common business types
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                            <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Choose a business type..." />
                            </SelectTrigger>
                            <SelectContent>
                                {presetOptions.map((preset) => (
                                    <SelectItem key={preset.id} value={preset.id}>
                                        {preset.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={handleApplyPreset}
                            disabled={!selectedPreset}
                            variant="outline"
                            className="sm:w-auto"
                        >
                            Apply Preset
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Presets will configure categories, tax rates, and other settings appropriate for your business type.
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Business Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="w-5 h-5" />
                            Business Information
                        </CardTitle>
                        <CardDescription>
                            Basic business details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                                id="businessName"
                                value={config.businessName}
                                onChange={(e) => handleConfigChange('businessName', e.target.value)}
                                placeholder="Your Business Name"
                            />
                        </div>

                        <div>
                            <Label htmlFor="businessType">Business Type</Label>
                            <Input
                                id="businessType"
                                value={config.businessType}
                                onChange={(e) => handleConfigChange('businessType', e.target.value)}
                                placeholder="e.g., Retail Store, Restaurant"
                            />
                        </div>

                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={config.address}
                                onChange={(e) => handleConfigChange('address', e.target.value)}
                                placeholder="Business address"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={config.phone}
                                    onChange={(e) => handleConfigChange('phone', e.target.value)}
                                    placeholder="Phone number"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={config.email}
                                    onChange={(e) => handleConfigChange('email', e.target.value)}
                                    placeholder="Business email"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Financial Settings
                        </CardTitle>
                        <CardDescription>
                            Currency and tax configuration
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="currency">Currency</Label>
                            <Select
                                value={config.currency}
                                onValueChange={(value) => handleConfigChange('currency', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencyOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="taxRate">Default Tax Rate</Label>
                            <Select
                                value={config.taxRate.toString()}
                                onValueChange={(value) => handleConfigChange('taxRate', parseFloat(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select tax rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    {taxRateOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="receiptPrefix">Receipt Number Prefix</Label>
                            <Input
                                id="receiptPrefix"
                                value={config.receiptPrefix}
                                onChange={(e) => handleConfigChange('receiptPrefix', e.target.value)}
                                placeholder="e.g., RCP, INV"
                                maxLength={5}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="includeTaxInPrice"
                                checked={config.includeTaxInPrice}
                                onChange={(e) => handleConfigChange('includeTaxInPrice', e.target.checked)}
                                className="rounded"
                            />
                            <Label htmlFor="includeTaxInPrice">Include tax in displayed prices</Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Receipt Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Percent className="w-5 h-5" />
                            Receipt Settings
                        </CardTitle>
                        <CardDescription>
                            Configure receipt appearance and content
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="receiptHeader">Receipt Header Message</Label>
                            <Input
                                id="receiptHeader"
                                value={config.receiptHeader}
                                onChange={(e) => handleConfigChange('receiptHeader', e.target.value)}
                                placeholder="Thank you for your business!"
                            />
                        </div>

                        <div>
                            <Label htmlFor="receiptFooter">Receipt Footer Message</Label>
                            <Input
                                id="receiptFooter"
                                value={config.receiptFooter}
                                onChange={(e) => handleConfigChange('receiptFooter', e.target.value)}
                                placeholder="Visit us again soon!"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="showBusinessInfo"
                                    checked={config.showBusinessInfo}
                                    onChange={(e) => handleConfigChange('showBusinessInfo', e.target.checked)}
                                    className="rounded"
                                />
                                <Label htmlFor="showBusinessInfo">Show business info on receipt</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="showDateTime"
                                    checked={config.showDateTime}
                                    onChange={(e) => handleConfigChange('showDateTime', e.target.checked)}
                                    className="rounded"
                                />
                                <Label htmlFor="showDateTime">Show date/time on receipt</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="showCustomerInfo"
                                    checked={config.showCustomerInfo}
                                    onChange={(e) => handleConfigChange('showCustomerInfo', e.target.checked)}
                                    className="rounded"
                                />
                                <Label htmlFor="showCustomerInfo">Show customer info on receipt</Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* System Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            System Preferences
                        </CardTitle>
                        <CardDescription>
                            Basic system operation settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="lowStockThreshold">Low Stock Alert Threshold</Label>
                            <Input
                                id="lowStockThreshold"
                                type="number"
                                value={config.lowStockThreshold}
                                onChange={(e) => handleConfigChange('lowStockThreshold', parseInt(e.target.value))}
                                min="0"
                                placeholder="5"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Alert when product quantity falls below this number
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="autoSaveInterval">Auto-save Interval (minutes)</Label>
                            <Select
                                value={config.autoSaveInterval.toString()}
                                onValueChange={(value) => handleConfigChange('autoSaveInterval', parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select interval" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 minute</SelectItem>
                                    <SelectItem value="2">2 minutes</SelectItem>
                                    <SelectItem value="5">5 minutes</SelectItem>
                                    <SelectItem value="10">10 minutes</SelectItem>
                                    <SelectItem value="15">15 minutes</SelectItem>
                                    <SelectItem value="30">30 minutes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="enableNotifications"
                                    checked={config.enableNotifications}
                                    onChange={(e) => handleConfigChange('enableNotifications', e.target.checked)}
                                    className="rounded"
                                />
                                <Label htmlFor="enableNotifications">Enable system notifications</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="enableSounds"
                                    checked={config.enableSounds}
                                    onChange={(e) => handleConfigChange('enableSounds', e.target.checked)}
                                    className="rounded"
                                />
                                <Label htmlFor="enableSounds">Enable sound effects</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="requireCustomerInfo"
                                    checked={config.requireCustomerInfo}
                                    onChange={(e) => handleConfigChange('requireCustomerInfo', e.target.checked)}
                                    className="rounded"
                                />
                                <Label htmlFor="requireCustomerInfo">Require customer info for transactions</Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Save reminder */}
            {hasChanges && (
                <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-orange-800">
                                <Settings className="w-4 h-4" />
                                <span className="text-sm font-medium">You have unsaved changes</span>
                            </div>
                            <Button onClick={handleSaveConfig} size="sm" className="gap-2">
                                <Save className="w-4 h-4" />
                                Save Now
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}