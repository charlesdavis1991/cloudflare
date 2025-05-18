import asyncHandler from "../middlewares/asyncHandler.js";
import Subdomain from "../models/subdomainModel.js";
import axios from 'axios';

const CLOUDFLARE_API_URL = "https://api.cloudflare.com/client/v4";
const CLOUDFLARE_ZONE_ID = "367800fa6c81f16c432a932fa534ca54"; // Zone ID for rgtools.se
const CLOUDFLARE_API_TOKEN = "ty0iywMyenk0tsjK8zyLyJCV1nxWme7nufc3Hs-x";
console.log('CLOUDFLARE_ZONE_ID:', CLOUDFLARE_ZONE_ID);
console.log('CLOUDFLARE_API_TOKEN:', CLOUDFLARE_API_TOKEN);
const createSubdomain = asyncHandler(async (req, res) => {
    
    try {
        const { ipaddress, record, owner, type } = req.body.subdomain;
        console.log('Adding subdomain:::::', record);
        console.log(CLOUDFLARE_ZONE_ID);
        console.log(CLOUDFLARE_API_TOKEN);
        // Validation
        switch (true) {
            case !ipaddress:
                return res.json({ error: "IPadress is required" });
            case !record:
                return res.json({ error: "Record is required" });
        }

        try {
            // Determine the content based on the record type
            //const content = type === "A" ? ipaddress : req.body.subdomain.target;
            const content = ipaddress;
            // Create DNS record in Cloudflare
            const response = await axios.post(
                `${CLOUDFLARE_API_URL}/zones/${CLOUDFLARE_ZONE_ID}/dns_records`,
                {
                    type: "A",// "A" or "CNAME"
                    name: `${record}.rgtools.se`,
                    content,
                    ttl: 1, // Auto TTL
                    // proxied: type === "CNAME" // Proxy only for CNAME records
                },
                {
                    headers: {
                        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            // Add to local cache

           const subdomain = new Subdomain({ ...response.data.result });
           await subdomain.save();

            res.json({ message: "Subdomain created successfully", data: response.data });
        } catch (error) {
            console.error('Error adding subdomain:', error.response?.data || error.message);
            res.status(500).json({ error: "Failed to add subdomain" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});



const deleteSubdomain = asyncHandler(async (req, res) => {
    try {
        const subdomain = await Subdomain.findByIdAndDelete(req.params.id);
        res.json(subdomain);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

const  getAllSubdomains = asyncHandler(async (req, res) => {
    console.log("sfsdfsfsfsdfsdfdsfasdfawefwe")
    try {
        //Check cache first
        console.log("get SBUDOMAINS");
        const cacheedSubdomains = await Subdomain.find();
        
        

        if (cacheedSubdomains.length > 0) {
            console.log('Cache hit! Returning cached subdomains.');
            return res.json({ success: true, subdomains: cacheedSubdomains });
        }
        // Fetch fromo Cloudflare API if not in cache
        const response = await axios.get(
            `${CLOUDFLARE_API_URL}/zones/${CLOUDFLARE_ZONE_ID}/dns_records`,
            {
                headers: {
                    Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Filter only subdomains (if needed)
        const subdomains = response.data.result.filter(record =>
            record.name.endsWith('.rgtools.se')
        );
        console.log('Fetched subdomains:', subdomains);
        //Cache the results in the database

        subdomains.forEach(subdomain => {
            const subdomainData = new Subdomain({
                id: subdomain.id,
                name: subdomain.name,
                content: subdomain.content,
                type: subdomain.type,
                created_on: subdomain.created_on,
            });
            subdomainData.save();
        })
        res.json({ success: true, subdomains });
    } catch (error) {
        console.error('Error fetching subdomains:', error.response?.data || error.message);
        res.status(500).json({ success: false, error: "Failed to fetch subdomains" });
    }
});



export {
    createSubdomain,
    deleteSubdomain,
    getAllSubdomains,
};
