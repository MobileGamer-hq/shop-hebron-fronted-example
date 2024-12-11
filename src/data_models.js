export const User = {
    "id": "",
    "name": "",
    "email": "",
    "password": "",
    "role": "", // Reference to Role Model
    "createdAt": "",
    "updatedAt": ""
};

// Admin Role
export const Admin = {
    id: "",
    name: "",
    email: "",
    password: "",
    role: "admin", // Role name
    permissions: ["manageUsers", "viewOrders", "manageProducts", "manageCoupons"], // Example of admin permissions
    createdAt: "",
    updatedAt: ""
};

// Seller Role
export const Seller = {
    id: "",
    name: "",
    email: "",
    password: "",
    role: "seller", // Role name
    storeName: "",
    storeDescription: "",
    products: [], // Array of Product IDs
    createdAt: "",
    updatedAt: ""
};

// Buyer Role
export const Buyer = {
    id: "",
    name: "",
    email: "",
    password: "",
    role: "buyer", // Role name
    address: [], // Array of Address IDs
    orders: [], // Array of Order IDs
    cart: "", // Reference to Cart Model
    reviews: [], // Array of Review IDs
    createdAt: "",
    updatedAt: ""
};

// Role Model
export const Role = {
    id: "",
    name: "", // Example: "admin", "seller", "buyer"
    permissions: [], // Array of permission IDs for the role
    createdAt: "",
    updatedAt: ""
};

// Product Model
export const Product = {
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    sellerId: "", // Reference to Seller Model
    category: "",
    images: [], // Array of image URLs
    createdAt: "",
    updatedAt: ""
};

// Coupon Model
export const Coupon = {
    id: "",
    code: "",
    discountType: "", // Example: "percentage", "fixed"
    discountValue: "",
    expirationDate: "",
    usageLimit: "",
    createdById: "", // Reference to User Model (creator)
    createdAt: "",
    updatedAt: ""
};

// Order Model
export const Order = {
    id: "",
    buyerId: "", // Reference to Buyer Model
    productIds: [], // Array of Product IDs
    totalAmount: "",
    status: "", // Example: "pending", "shipped", "delivered"
    createdAt: "",
    updatedAt: ""
};

// Cart Model
export const Cart = {
    id: "",
    buyerId: "", // Reference to Buyer Model
    productIdsWithQuantities: [], // Array of Product IDs with quantities
    createdAt: "",
    updatedAt: ""
};

// Address Model
export const Address = {
    id: "",
    userId: "", // Reference to User Model (owner)
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    createdAt: "",
    updatedAt: ""
};

// Review Model
export const Review = {
    id: "",
    productId: "", // Reference to Product Model
    buyerId: "", // Reference to Buyer Model (reviewer)
    rating: "", // Example: 1-5
    comment: "",
    createdAt: "",
    updatedAt: ""
};
