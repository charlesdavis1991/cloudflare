const express = require('express');
const path = require('path');
const axios =require('axios');
const Database= require ( 'sqlite3') ;

const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();
const app = express(),
      bodyParser = require("body-parser");
      port = 80;
const stripe  = require ( 'stripe') (process.env.STRIPE_SECRET_KEY);
// place holder for the data

//Initialize the database
const db = new Database.Database('subdomains.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQlite database.');
  }
});
// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS subdomains (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ipaddress TEXT NOT NULL,
    record TEXT NOT NULL,
    owner TEXT  default "Administrator",
    type TEXT  default "A",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);
// Cloudflare API configuration
const CLOUDFLARE_API_URL = "https://api.cloudflare.com/client/v4";
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID; // Zone ID for rgtools.se
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN; 
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = data.user; // Attach user to the request
  next();
};
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'You have access!', user: req.user });
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/subdomains', async (req, res) => {
  try {
    //Check cache first
    const cacheedSubdomains = db.prepare('SELECT * FROM subdomains').all();
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
    //Cache the results in the database
    const insertStmt = db.prepare(`
      INSERT INTO subdomains (ipaddress, record, owner, type)
      VALUES (?, ?, ?, ?)
    `);
    subdomains.forEach(subdomain => {
      insertStmt.run(subdomain.content, subdomain.name, "unknown", subdomain.type);
    });
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
   const payment = await stripe.paymentIntents.retrieve(paymentId);
   
  if (payment.status !== 'succeeded') {
    return res.status(400).json({ error: 'Payment not completed' });
  }

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
    // Add to local cache
    const insertStmt = db.prepare(`
      INSERT INTO subdomains (ipaddress, record, owner, type)
      VALUES (?, ?, ?, ?)
    `);
    insertStmt.run(ipaddress, record, owner, type);


    res.json({ message: "Subdomain added successfully", data: response.data });
  } catch (error) {
    console.error('Error adding subdomain:', error.response?.data || error.message);
    res.status(500).json({ error: "Failed to add subdomain" });
  }
});
app.post('/api/subdomain/delete', async (req, res) => { 
  const { id } = req.body; // Expecting { id }
  console.log('Deleting subdomain:::::', id);
  try {
    // Delete DNS record in Cloudflare
    const response = await axios.delete(
      `${CLOUDFLARE_API_URL}/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${id}`,
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    // Remove from local cache
    const deleteStmt = db.prepare(`
      DELETE FROM subdomains WHERE id = ?
    `);
    deleteStmt.run(id);

    res.json({ message: "Subdomain deleted successfully", data: response.data });
  } catch (error) {
    console.error('Error deleting subdomain:', error.response?.data || error.message);
    res.status(500).json({ error: "Failed to delete subdomain" });
  }
})
app.post ('/api/create-payment-intent', async (req, res) => {

  console.log('Creating payment intent:::::');

  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});
app.get('/', (req,res) => {
  console.log('index.html called!');
  //res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});
app.get('/auth/login/:provider', async (req, res) => {
  const { provider } = req.params;

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider, // e.g., 'google', 'github'
      options: {
        redirectTo: 'http://localhost:80/auth/callback', // Replace with your redirect URL
      },
    });

    if (error) throw error;

    res.redirect(data.url); // Redirect user to the provider's login page
  } catch (error) {
    console.error('Error during OAuth login:', error.message);
    res.status(500).json({ error: 'Failed to initiate OAuth login' });
  }
});
app.get('/auth/callback', async (req, res) => {
  const { access_token, refresh_token, user } = req.query;

  try {
    // Save user details to your database if needed
    console.log('User logged in:', user);

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during OAuth callback:', error.message);
    res.status(500).json({ error: 'Failed to handle OAuth callback' });
  }
});
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});