// Business configuration utility for dynamic POS system
export interface BusinessConfig {
    businessName: string;
    businessType: 'retail' | 'pharmacy' | 'grocery' | 'electronics' | 'clothing' | 'restaurant' | 'other';
    address: string;
    phone: string;
    email: string;
    currency: string;
    taxRate: number;
    receiptPrefix: string;
    includeTaxInPrice: boolean;
    receiptHeader: string;
    receiptFooter: string;
    showBusinessInfo: boolean;
    showDateTime: boolean;
    showCustomerInfo: boolean;
    lowStockThreshold: number;
    autoSaveInterval: number;
    enableNotifications: boolean;
    enableSounds: boolean;
    requireCustomerInfo: boolean;
    requiresSpecialHandling: boolean; // If true, products can require special handling (age verification, licenses, etc.)
    specialHandlingLabel: string; // Label for special handling (e.g., "ID Required", "Rx Required", "Age Verification")
    loyaltyProgram: boolean;
    allowBackorders: boolean;
    trackExpiry: boolean;
    defaultCategories: string[];
    defaultUnits: string[];
    features: {
        inventory: boolean;
        suppliers: boolean;
        customers: boolean;
        analytics: boolean;
        multiLocation: boolean;
    };
}

// Default configurations for different business types
export const businessPresets: Record<string, Partial<BusinessConfig>> = {
    retail: {
        businessType: 'retail',
        specialHandlingLabel: 'Age Verification',
        defaultCategories: ['General Merchandise', 'Electronics', 'Clothing & Accessories', 'Men\'s Clothing', 'Women\'s Clothing', 'Footwear', 'Fashion Accessories', 'Home & Garden', 'Food & Beverages', 'Books & Media', 'Sports & Recreation', 'Personal Care'],
        defaultUnits: ['Each', 'Pack', 'Box', 'Set'],
        trackExpiry: false
    },
    pharmacy: {
        businessType: 'pharmacy',
        requiresSpecialHandling: true,
        specialHandlingLabel: 'Rx Required',
        defaultCategories: ['Healthcare Products', 'Personal Care', 'Wellness & Supplements', 'Medical Equipment'],
        defaultUnits: ['Tablets', 'Capsules', 'Bottles', 'Boxes', 'Tubes', 'Strips'],
        trackExpiry: true
    },
    grocery: {
        businessType: 'grocery',
        specialHandlingLabel: 'Age Verification',
        defaultCategories: ['Food & Beverages', 'Fresh Produce', 'Dairy', 'Meat & Seafood', 'Frozen Foods'],
        defaultUnits: ['Each', 'Pound', 'Kilogram', 'Pack', 'Bottle', 'Can'],
        trackExpiry: true
    },
    electronics: {
        businessType: 'electronics',
        defaultCategories: ['Electronics', 'Computers', 'Mobile Devices', 'Audio & Video', 'Gaming'],
        defaultUnits: ['Each', 'Pack', 'Set', 'Bundle'],
        trackExpiry: false
    },
    clothing: {
        businessType: 'clothing',
        defaultCategories: ['Clothing & Accessories', 'Men\'s Clothing', 'Women\'s Clothing', 'Children\'s Clothing', 'Shoes'],
        defaultUnits: ['Each', 'Pair', 'Set'],
        trackExpiry: false
    },
    restaurant: {
        businessType: 'restaurant',
        defaultCategories: ['Food & Beverages', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages'],
        defaultUnits: ['Each', 'Serving', 'Portion'],
        trackExpiry: true
    }
};

// Default business configuration
const defaultBusinessConfig: BusinessConfig = {
    businessName: 'Universal POS',
    businessType: 'retail',
    address: '',
    phone: '',
    email: '',
    currency: 'USD',
    taxRate: 0.08,
    receiptPrefix: 'RCP',
    includeTaxInPrice: false,
    receiptHeader: 'Thank you for your business!',
    receiptFooter: 'Visit us again soon!',
    showBusinessInfo: true,
    showDateTime: true,
    showCustomerInfo: false,
    lowStockThreshold: 5,
    autoSaveInterval: 5,
    enableNotifications: true,
    enableSounds: true,
    requireCustomerInfo: false,
    requiresSpecialHandling: false,
    specialHandlingLabel: 'Special Handling',
    loyaltyProgram: true,
    allowBackorders: false,
    trackExpiry: false,
    defaultCategories: ['General Merchandise', 'Electronics', 'Clothing & Accessories', 'Men\'s Clothing', 'Women\'s Clothing', 'Footwear', 'Fashion Accessories', 'Home & Garden', 'Food & Beverages', 'Books & Media', 'Sports & Recreation', 'Personal Care'],
    defaultUnits: ['Each', 'Pack', 'Box', 'Set'],
    features: {
        inventory: true,
        suppliers: true,
        customers: true,
        analytics: true,
        multiLocation: false
    }
};

// Get business configuration from localStorage
export const getBusinessConfig = (): BusinessConfig => {
    const stored = localStorage.getItem('business_config');
    return stored ? { ...defaultBusinessConfig, ...JSON.parse(stored) } : defaultBusinessConfig;
};

// Save business configuration to localStorage
export const saveBusinessConfig = (config: Partial<BusinessConfig>): void => {
    const currentConfig = getBusinessConfig();
    const newConfig = { ...currentConfig, ...config };
    localStorage.setItem('business_config', JSON.stringify(newConfig));
};

// Initialize business configuration
export const initializeBusinessConfig = (businessType?: string): void => {
    const stored = localStorage.getItem('business_config');
    if (!stored) {
        let config = defaultBusinessConfig;
        if (businessType && businessPresets[businessType]) {
            config = { ...defaultBusinessConfig, ...businessPresets[businessType] };
        }
        saveBusinessConfig(config);
    }
};

// Apply business configuration preset
export const applyBusinessPreset = (businessType: string): BusinessConfig => {
    const currentConfig = getBusinessConfig();
    if (businessPresets[businessType]) {
        const preset = businessPresets[businessType];
        const newConfig = { ...currentConfig, ...preset };
        saveBusinessConfig(newConfig);
        return newConfig;
    }
    return currentConfig;
};

// Get special handling label based on business configuration
export const getSpecialHandlingLabel = (): string => {
    const config = getBusinessConfig();
    return config.specialHandlingLabel;
};

// Check if special handling is enabled
export const isSpecialHandlingEnabled = (): boolean => {
    const config = getBusinessConfig();
    return config.requiresSpecialHandling || false;
};

// Get default units for the business
export const getDefaultUnits = (): string[] => {
    const config = getBusinessConfig();
    return config.defaultUnits;
};

// Check if expiry tracking is enabled
export const isExpiryTrackingEnabled = (): boolean => {
    const config = getBusinessConfig();
    return config.trackExpiry;
};