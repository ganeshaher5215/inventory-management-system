# Entities
- User (id, username, password, role[ADMIN/MANAGER/EMPLOYEE])
- Department (id, name)
- Employee (id, name, department_id, designation, salary, joiningDate)
- Product (id, name, sku, category, quantity, price, supplierName)
- StockTransaction (id, product_id, type[IN/OUT], quantity, date, performedBy)

# Relationships
- Department (1) --- (many) Employee
- Product (1) --- (many) StockTransaction

# API Endpoints
POST   /api/auth/register
POST   /api/auth/login
GET    /api/departments
POST   /api/departments        [ADMIN]
GET    /api/employees
POST   /api/employees          [ADMIN]
PUT    /api/employees/{id}     [ADMIN]
DELETE /api/employees/{id}     [ADMIN]
GET    /api/products
POST   /api/products           [ADMIN, MANAGER]
PUT    /api/products/{id}      [ADMIN, MANAGER]
POST   /api/stock-transactions [ADMIN, MANAGER]
GET    /api/dashboard/summary