export async function getAllSubdomains() {
     console.log("gdgddgfdgfdgfdgfdgfd");
    try{
        const response = await fetch('/api/subdomain/getsubdomains');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function createSubdomain(data) {
    const response = await fetch(`/api/subdomain/create_subdomain`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({subdomain: data})
      })
    return await response.json();
}