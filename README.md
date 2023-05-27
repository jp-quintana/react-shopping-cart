# React Shopping Cart

Shopping cart app built with React and Firebase. Currently WIP.

This app is a clone of https://alphaleteathletics.com.

## NOTE

Last stable commit: ad726d674cb00ef07a6ca1ddb83559b7642def49. Currently redesigning whole Firebase db and refactoring project code. The mentioned commit is current version deployed.

## App Preview


https://user-images.githubusercontent.com/87621233/215578435-9736f495-9b45-43fe-bc6a-86286f14638a.mp4


*(Version in video deployed Jan 24, 2023)*

## Features
- Products Display.
- Cart Functions.
- Basic Inventory Managment.
- Auth (Email/Password & Anonymous).
- Mock Checkout Page.
- User orders.

## Future additions
Check issues tab.

## Installation

 - Step 1: Clone Repository and Install Packages.
```
git clone https://github.com/jp-quintana/flaakko-shopping-cart.git && npm install
```
 - Step 2: Create firebase-config.js file inside src/firebase directory.
```
export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
```
 - Step 3: Start the development server.
```
npm start
```

## Setup Firebase Project
1. Create product, inventory, carts, checkoutSessions, orders and users collections.
2. Product Schema

![product-schema](https://user-images.githubusercontent.com/87621233/215582231-606b4f73-be03-4c93-b8cc-f5d67027c7eb.png)

3. Inventory Schema (use skus from the inventoryLevels in Product Schema as ids for docs in inventory collection).

![inventory-schema](https://user-images.githubusercontent.com/87621233/215582258-076c0d6e-00d8-4fe0-9f14-50aa4c762464.png)


## Authors
- [@jp-quintana](https://github.com/jp-quintana)
