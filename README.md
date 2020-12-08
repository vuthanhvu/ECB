# MERN - ECB

# 1. Start:
## - Install package: npm run install-all
## - Run project: npm run dev

# 2. API
## 2.1 Category (CRUD)
### GET    : api/category
### POST   : api/category
### DELETE : api/category/:id
### PUT    : api/category/:id
## 2.2 User (Authorization: JWT)
### POST    : user/register
### POST    : user/login
### GET    : user/logout
### GET    : user/refresh_token 
### GET    : user/info
### PATH    : user/add_cart
### GET    : user/history
## 2.3 Upload (cloudinary) 
### POST    : api/upload
### POST    : api/destroy
## 2.4 Products (CRUD)
### GET       : api/products
### POST      : api/products
### DELETE    : api/products/:id
### PUT       : api/products/:id
## 2.5 Payment (Paypal) 
### GET     : api/payment
### POST    : api/payment

# 3. Pages
## 3.1 Login
## 3.2 Register
## 3.3 Cart
## 3.4 Create Products
## 3.5 Details products
## 3.6 Order History
## 3.7 Products
## 3.8 Products Items
## 3.9 Filter - Sort - Pagination - Search  
