import { Product } from "../data/products"

export const sortByPrice = (products: Product[], inAsec = false) => {
    console.log('sort by price');
    return products.sort((a, b) => {
        return inAsec ? a.price - b.price : b.price - a.price;
    });
}

export const filterByCategory = (products: Product[], search = '') => {
    console.log('filterByCategory');
    if (!search) return products;
    return products.filter(product => product.name.includes(search));
}

export const sortByName = (products: Product[], inAsec = false) => {
    console.log('sort by name');
    return products.sort((a, b) => inAsec ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
}