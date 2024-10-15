
export type NutritionalInfo = { calories: number; fat: number; protein: number };
export type Product = {
    id: number;
    name: string;
    price: number;
    dateAdded: Date;
    nutritionalInfo: NutritionalInfo;
    ingredients: string[];
    reviews: string[];
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Apple',
        price: 0.99,
        dateAdded: new Date(Date.now() - 12 * 60 * 60 * 1000),
        nutritionalInfo: { calories: 52, fat: 0.2, protein: 0.3 },
        ingredients: ['Apple'],
        reviews: ['Fresh and juicy!', 'Perfect for snacking.'],
    },
    {
        id: 2,
        name: 'Banana',
        price: 0.59,
        dateAdded: new Date(Date.now() - 48 * 60 * 60 * 1000),
        nutritionalInfo: { calories: 96, fat: 0.3, protein: 1.3 },
        ingredients: ['Banana'],
        reviews: ['Great for smoothies!', 'Very tasty.'],
    },
    {
        id: 3, name: 'Orange',
        price: 1.29,
        dateAdded: new Date(Date.now() - 8 * 60 * 60 * 1000),
        nutritionalInfo: { calories: 96, fat: 0.3, protein: 1.3 },
        ingredients: ['Orange'],
        reviews: ['Great for juice!', 'Very tasty.'],
    },
    {
        id: 4, name: 'Strawberry',
        price: 2.99,
        dateAdded: new Date(Date.now() - 24 * 60 * 60 * 1000),
        nutritionalInfo: { calories: 96, fat: 0.3, protein: 1.3 },
        ingredients: ['Strawberry'],
        reviews: ['Great for smoothies!', 'Very tasty.'],
    },
    {
        id: 5, name: 'Watermelon',
        price: 4.99,
        dateAdded: new Date(Date.now() - 30 * 60 * 60 * 1000),
        nutritionalInfo: { calories: 96, fat: 0.3, protein: 1.3 },
        ingredients: ['Watermelon'],
        reviews: ['Great for juice!', 'Very tasty.'],
    },
];