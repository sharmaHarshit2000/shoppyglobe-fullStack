function Test() {
    
    const token = localStorage.getItem("token");
    if (token) {
        const response = await axios.get("http://localhost:5000/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`, // Ensure the token is passed with 'Bearer'
            },
        });
    }
}