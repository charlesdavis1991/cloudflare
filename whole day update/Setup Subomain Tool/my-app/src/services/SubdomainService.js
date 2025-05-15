
export async function getAllSubdomains() {

    try{
        const response = await fetch('/api/subdomains');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function createSubdomain(data) {
    const response = await fetch(`/api/subdomain`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({subdomain: data})
      })
    return await response.json();
}