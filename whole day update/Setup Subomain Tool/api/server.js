const express = require('express');
const path = require('path');
const axios =require('axios');
require('dotenv').config();
const app = express(),
      bodyParser = require("body-parser");
      port = 80;

// place holder for the data
const subdomains = [
  {
    ipaddress: "first1",
    record: "last1",
    owner: "abc@gmail.com"
  },
  {
    ipaddress: "first2",
    record: "last2",
    owner: "abc@gmail.com"
  },
  {
    ipaddress: "first3",
    record: "last3",
    owner: "abc@gmail.com"
  }
];
// Cloudflare API configuration
const CLOUDFLARE_API_URL = "https://api.cloudflare.com/client/v4";
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID; // Zone ID for rgtools.se
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN; 

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/subdomains', async (req, res) => {
  try {
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

    res.json({ success: true, subdomains });
  } catch (error) {
    console.error('Error fetching subdomains:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Failed to fetch subdomains" });
  }
});

app.post('/api/subdomain', async (req, res) => {
  const { ipaddress, record, owner, type } = req.body.subdomain; // Expecting { ipaddress, record, owner, type }
  console.log('Adding subdomain:::::', record);
   console.log(CLOUDFLARE_ZONE_ID);
   console.log(CLOUDFLARE_API_TOKEN);
  try {
    // Determine the content based on the record type
    //const content = type === "A" ? ipaddress : req.body.subdomain.target;
    const content=ipaddress;
    // Create DNS record in Cloudflare
    const response = await axios.post(
      `${CLOUDFLARE_API_URL}/zones/${CLOUDFLARE_ZONE_ID}/dns_records`,
      {
        type :"A",// "A" or "CNAME"
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
     console.log('Cloudflare response:', response.data);
    // Add to local subdomains list
    subdomains.push({ ipaddress, record, owner, type });

    res.json({ message: "Subdomain added successfully", data: response.data });
  } catch (error) {
    console.error('Error adding subdomain:', error.response?.data || error.message);
    res.status(500).json({ error: "Failed to add subdomain" });
  }
});

app.get('/', (req,res) => {
  console.log('index.html called!');
  //res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});