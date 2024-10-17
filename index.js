const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));
let products = [
  { id: 1, name: "Product A", rating: 4.5 },
  { id: 2, name: "Product B", rating: 3.8 },
  { id: 3, name: "Product C", rating: 4.9 },
  { id: 4, name: "Product D", rating: 4.2 },
];
app.get('/products/sort/popularity', (req, res) => {
  const sortedProducts = products.sort((a, b) => b.rating - a.rating);
  res.json(sortedProducts);
});

let product = [
  { id: 1, name: "Product A", ram: 8, rom: 64, price: 150 },
  { id: 2, name: "Product B", ram: 16, rom: 128, price: 300 },
  { id: 3, name: "Product C", ram: 8, rom: 64, price: 100 },
  { id: 4, name: "Product D", ram: 4, rom: 32, price: 250 },
];
app.get('/product/sort/price-high-to-low', (req, res) => {
  const sortedProducts = product.sort((a, b) => b.price - a.price);
  res.json(sortedProducts);
});

app.get('/product/sort/price-low-to-high', (req, res) => {
  const sortedProducts = product.sort((a, b) => a.price - b.price);
  res.json(sortedProducts);
});

function filterByRam(products, ram) {
  return products.filter(product => product.ram === parseInt(ram));
}

app.get('/product/filter/ram', (req, res) => {
  const ram = req.query.ram;
  if(!ram) {
    return res.status(400).json({ error: "Please specify a RAM value." });
  }
  const filteredProducts = filterByRam(product, ram);
  res.json(filteredProducts);
});

function filterByRom(products, rom) {
  return products.filter(product => product.rom === parseInt(rom));
}

app.get('/product/filter/rom', (req, res) => {
  const rom = req.query.rom;
  if(!rom) {
    return res.status(400).json({ error: "Please specify a ROM value." });
  }
  const filteredProducts = filterByRom(product, rom);
  res.json(filteredProducts);
});

let mobiles = [
  { id: 1, name: "iPhone 12", brand: "Apple", price: 999 },
  { id: 2, name: "Galaxy S21", brand: "Samsung", price: 799 },
  { id: 3, name: "Pixel 5", brand: "Google", price: 699 },
  { id: 4, name: "iPad Pro", brand: "Apple", price: 1099 },
  { id: 5, name: "OnePlus 9", brand: "OnePlus", price: 729 },
];

function filterByBrand(mobiles, brand) {
  return mobiles.filter(mobiles => mobiles.brand.toLowerCase() === brand.toLowerCase());
}

app.get('/mobiles/filter/brand', (req, res) => {
  const brand = req.query.brand;
  if(!brand) {
    return res.status(400).json({ error: "Please specify a brand." });
  }
  const filteredMobiles = filterByBrand(mobiles, brand);
  res.json(filteredMobiles);
});

let mobile = [
  { id: 2, name: "Galaxy S21", os: "Android", price: 799 },
  { id: 1, name: "iPhone 12", os: "iOS", price: 999 },
  { id: 3, name: "Pixel 5", os: "Android", price: 699 },
  { id: 4, name: "iPad Pro", os: "iOS", price: 1099 },
  { id: 5, name: "Surface Pro", os: "Windows", price: 1299 },
];

function filterByOs(mobile, os) {
  return mobiles.filter(mobile => mobile.os && mobile.os.toLowerCase() === os.toLowerCase());
}

app.get('/mobile/filter/os', (req, res) => {
  const os = req.query.os;
  if(!os) {
    return res.status(400).json({ error: "Please specify an OS." });
  }
  const filteredMobiles = filterByOs(mobile, os);
  res.json(filteredMobiles);
});

function filterByPrice(mobile, maxPrice) {
  return mobiles.filter(mobile => mobile.price <= maxPrice);
}

app.get('/mobile/filter/price', (req, res) => {
  const price = parseFloat(req.query.price);
  if(isNaN(price)) {
    return res.status(400).json({ error: "Please specify a valid price." });
  }
  const filteredMobiles = filterByPrice(mobile, price);
  res.json(filteredMobiles);
});

const items = [
  { id: 1, name: "Galaxy S21", os: "Android", ram: "8GB", rom: "128GB", brand: "Samsung", price: 799, popularity: 4.5 },
  { id: 2, name: "iPhone 12", os: "iOS", ram: "4GB", rom: "64GB", brand: "Apple", price: 999, popularity: 4.8 },
  { id: 3, name: "Pixel 5", os: "Android", ram: "8GB", rom: "128GB", brand: "Google", price:699, popularity: 4.3 },
  { id: 4, name: "iPad Pro", os: "iOS", ram: "6GB", rom: "256GB", brand: "Apple", price: 1099, popularity: 4.7 },
  { id: 5, name: "Surface Pro", os: "Windows", ram: "8GB", rom: "256GB", brand: "Microsoft", price: 1299, popularity: 4.4 },
  { id: 6, name: "Budget Phone", os: "Android", ram: "4GB", rom: "32GB", brand: "Generic", price: 299, popularity: 3.8 }
];

app.get('/items', (req, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
