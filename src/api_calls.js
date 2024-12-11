const API_BASE_URL = "http://localhost:5000"; // Update with API's base URL

// Fetch all users
export async function getUsers() {
    const response = await fetch(`${API_BASE_URL}/Users`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    return response.json();
}

//Fetch a user by id
export async function getUserById(id) {
    const response = await fetch(`${API_BASE_URL}/Users/${id}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    return response.json();
}

// Add a new user
export async function addUser(userData) {
    const response = await fetch(`${API_BASE_URL}/Users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error(`Failed to add user: ${response.statusText}`);
    }
    return response.json();
}

// Fetch all products
export async function getProducts() {
    const response = await fetch(`${API_BASE_URL}/Products`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return response.json();
}

// Add a new product
export async function addProduct(productData) {
    const response = await fetch(`${API_BASE_URL}/Products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error(`Failed to add product: ${response.statusText}`);
    }
    return response.json();
}
