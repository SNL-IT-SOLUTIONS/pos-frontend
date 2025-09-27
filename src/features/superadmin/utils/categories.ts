// Shared category management system
export interface Category {
    id: string;
    name: string;
    description: string;
    code: string;
    color: string;
    icon: string;
    isActive: boolean;
    itemCount: number;
    createdDate: string;
}

// Comprehensive categories including detailed clothing and other business types
export const defaultCategories: Category[] = [
    {
        id: '1',
        name: 'General Merchandise',
        description: 'Office supplies, stationery, and general items',
        code: 'GENERAL',
        color: 'bg-slate-100 text-slate-800',
        icon: 'package',
        isActive: true,
        itemCount: 1,
        createdDate: '2024-01-15'
    },
    {
        id: '2',
        name: 'Electronics',
        description: 'Smartphones, headphones, computers, and electronic accessories',
        code: 'ELECTRONICS',
        color: 'bg-blue-100 text-blue-800',
        icon: 'smartphone',
        isActive: true,
        itemCount: 2,
        createdDate: '2024-01-15'
    },
    {
        id: '3',
        name: 'Clothing & Accessories',
        description: 'General apparel, shoes, and fashion accessories',
        code: 'CLOTHING',
        color: 'bg-pink-100 text-pink-800',
        icon: 'shirt',
        isActive: true,
        itemCount: 1,
        createdDate: '2024-01-15'
    },
    {
        id: '4',
        name: 'Men\'s Clothing',
        description: 'Men\'s apparel including shirts, pants, suits, and accessories',
        code: 'MENS',
        color: 'bg-blue-100 text-blue-800',
        icon: 'shirt',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '5',
        name: 'Women\'s Clothing',
        description: 'Women\'s apparel including dresses, blouses, skirts, and accessories',
        code: 'WOMENS',
        color: 'bg-rose-100 text-rose-800',
        icon: 'shirt',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '6',
        name: 'Children\'s Clothing',
        description: 'Kids and baby clothing, from infants to teens',
        code: 'KIDS',
        color: 'bg-yellow-100 text-yellow-800',
        icon: 'shirt',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '7',
        name: 'Footwear',
        description: 'Shoes, boots, sandals, and athletic footwear for all ages',
        code: 'SHOES',
        color: 'bg-amber-100 text-amber-800',
        icon: 'package',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '8',
        name: 'Fashion Accessories',
        description: 'Jewelry, bags, belts, watches, and fashion accessories',
        code: 'ACCESSORIES',
        color: 'bg-purple-100 text-purple-800',
        icon: 'shopping-bag',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '9',
        name: 'Home & Garden',
        description: 'Home decor, kitchenware, furniture, and garden supplies',
        code: 'HOME',
        color: 'bg-green-100 text-green-800',
        icon: 'home',
        isActive: true,
        itemCount: 2,
        createdDate: '2024-01-15'
    },
    {
        id: '10',
        name: 'Food & Beverages',
        description: 'Snacks, drinks, groceries, and food items',
        code: 'FOOD',
        color: 'bg-orange-100 text-orange-800',
        icon: 'coffee',
        isActive: true,
        itemCount: 2,
        createdDate: '2024-01-15'
    },
    {
        id: '11',
        name: 'Fresh Produce',
        description: 'Fresh fruits, vegetables, and organic produce',
        code: 'PRODUCE',
        color: 'bg-lime-100 text-lime-800',
        icon: 'package',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '12',
        name: 'Books & Media',
        description: 'Books, magazines, movies, music, and entertainment media',
        code: 'BOOKS',
        color: 'bg-indigo-100 text-indigo-800',
        icon: 'book-open',
        isActive: true,
        itemCount: 1,
        createdDate: '2024-01-15'
    },
    {
        id: '13',
        name: 'Sports & Recreation',
        description: 'Fitness equipment, athletic gear, outdoor and recreational items',
        code: 'SPORTS',
        color: 'bg-red-100 text-red-800',
        icon: 'dumbbell',
        isActive: true,
        itemCount: 2,
        createdDate: '2024-01-15'
    },
    {
        id: '14',
        name: 'Personal Care',
        description: 'Beauty products, hygiene items, cosmetics, and wellness products',
        code: 'CARE',
        color: 'bg-purple-100 text-purple-800',
        icon: 'heart',
        isActive: true,
        itemCount: 1,
        createdDate: '2024-01-15'
    },
    {
        id: '15',
        name: 'Health & Wellness',
        description: 'Vitamins, supplements, medical supplies, and health products',
        code: 'HEALTH',
        color: 'bg-teal-100 text-teal-800',
        icon: 'package',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '16',
        name: 'Automotive',
        description: 'Car accessories, tools, motor oil, and automotive supplies',
        code: 'AUTO',
        color: 'bg-gray-100 text-gray-800',
        icon: 'package',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '17',
        name: 'Baby & Kids',
        description: 'Baby care products, toys, strollers, and children\'s items',
        code: 'BABY',
        color: 'bg-pink-100 text-pink-800',
        icon: 'heart',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '18',
        name: 'Toys & Games',
        description: 'Toys, board games, puzzles, and recreational games',
        code: 'TOYS',
        color: 'bg-rainbow-100 text-rainbow-800',
        icon: 'package',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '19',
        name: 'Pet Supplies',
        description: 'Pet food, toys, accessories, and animal care products',
        code: 'PETS',
        color: 'bg-emerald-100 text-emerald-800',
        icon: 'heart',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '20',
        name: 'Office Supplies',
        description: 'Stationery, office equipment, printing supplies, and workspace items',
        code: 'OFFICE',
        color: 'bg-slate-100 text-slate-800',
        icon: 'package',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '21',
        name: 'Arts & Crafts',
        description: 'Art supplies, craft materials, hobby items, and creative tools',
        code: 'ARTS',
        color: 'bg-violet-100 text-violet-800',
        icon: 'package',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '22',
        name: 'Tools & Hardware',
        description: 'Hand tools, power tools, hardware, and construction supplies',
        code: 'TOOLS',
        color: 'bg-zinc-100 text-zinc-800',
        icon: 'package',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '23',
        name: 'Musical Instruments',
        description: 'Instruments, music accessories, and audio equipment',
        code: 'MUSIC',
        color: 'bg-indigo-100 text-indigo-800',
        icon: 'package',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    },
    {
        id: '24',
        name: 'Pharmacy & Medicine',
        description: 'Prescription drugs, over-the-counter medications, and medical devices',
        code: 'PHARMACY',
        color: 'bg-red-100 text-red-800',
        icon: 'package',
        isActive: true,
        itemCount: 0,
        createdDate: '2024-01-15'
    }
];

// Get categories from localStorage (simulating database)
export const getCategories = (): Category[] => {
    const stored = localStorage.getItem('pos_categories');
    return stored ? JSON.parse(stored) : defaultCategories;
};

// Save categories to localStorage (simulating database)
export const saveCategories = (categories: Category[]): void => {
    localStorage.setItem('pos_categories', JSON.stringify(categories));
};

// Get active category names for dropdowns
export const getActiveCategoryNames = (): string[] => {
    const categories = getCategories();
    return categories.filter(cat => cat.isActive).map(cat => cat.name);
};

// Get category by name
export const getCategoryByName = (name: string): Category | undefined => {
    const categories = getCategories();
    return categories.find(cat => cat.name === name);
};

// Initialize categories if not present
export const initializeCategories = (): void => {
    const stored = localStorage.getItem('pos_categories');
    if (!stored) {
        saveCategories(defaultCategories);
    }
};