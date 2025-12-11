# Service Management System (SMS)

A comprehensive Service Management Software designed to streamline operations, improve efficiency, and enhance customer satisfaction. This full-stack application provides a complete solution for managing tickets, tasks, assets, inventory, schedules, invoices, CRM interactions, and more.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Design System](#design-system)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Core Modules

1. **Ticketing System**
   - Automated ticket creation and management
   - Priority assignment (Low, Medium, High, Critical)
   - Status tracking (Open, In Progress, Resolved, Closed)
   - SLA management
   - Comments and activity history

2. **Task & Workflow Automation**
   - Task creation and assignment
   - Status tracking (Pending, In Progress, Completed, Escalated)
   - Approval workflow
   - Due date management

3. **Asset Management**
   - Asset tracking with serial numbers
   - Status management (Available, In Use, Under Maintenance, Retired)
   - Maintenance scheduling
   - Location tracking

4. **Inventory Management**
   - Stock tracking
   - Low stock alerts
   - Category management
   - Barcode support

5. **Scheduling & Dispatching**
   - Schedule creation for tasks
   - Technician assignment
   - Geo-location tracking
   - Status management

6. **Billing & Invoicing**
   - Invoice generation
   - Payment status tracking
   - Payment method management
   - Revenue tracking

7. **Customer Relationship Management (CRM)**
   - Interaction logging (Call, Email, Chat, Meeting)
   - Customer history
   - Outcome tracking

8. **Reporting & Analytics**
   - Dashboard with key metrics
   - Performance reports
   - Revenue tracking
   - Custom reports

9. **Mobile Access**
   - Mobile device tracking
   - Access history

10. **Settings**
    - User profile management
    - Notification preferences
    - Security settings
    - Appearance customization

## 🛠 Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.4.2**
- **Spring Data JPA**
- **Hibernate**
- **H2 Database** (In-memory, can be configured for MySQL/PostgreSQL)
- **Maven** (Build tool)
- **Lombok** (Reduces boilerplate code)

### Frontend
- **React 18.3.1**
- **TypeScript 5.6.2**
- **Vite 6.0.5** (Build tool)
- **React Router DOM 7.1.3**
- **Tailwind CSS 3.4.17**
- **Axios 1.7.9** (HTTP client)
- **Radix UI** (UI components)
- **Lucide React** (Icons)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 17** or higher
  - Download from: https://adoptium.net/
  - Verify installation: `java -version`

- **Node.js 18+** and **npm**
  - Download from: https://nodejs.org/
  - Verify installation: `node -v` and `npm -v`

- **Maven 3.6+** (Optional - Maven Wrapper included)
  - Download from: https://maven.apache.org/
  - Verify installation: `mvn -v`

- **Git** (for cloning the repository)
  - Download from: https://git-scm.com/

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd service-management-react-spring-boot
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd my-sms-backend
```

#### Using Maven Wrapper (Recommended)

**Windows:**
```bash
.\mvnw.cmd clean install
```

**Linux/Mac:**
```bash
./mvnw clean install
```

#### Using Global Maven

```bash
mvn clean install
```

This will:
- Download all required dependencies
- Compile the project
- Run tests
- Package the application

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd my-sms-frontend
```

Install dependencies:

```bash
npm install
```

This will install all required npm packages including React, TypeScript, Tailwind CSS, and other dependencies.

## ▶️ Running the Application

### Running the Backend

#### Option 1: Using Maven Wrapper (Windows)

```bash
cd my-sms-backend
.\mvnw.cmd spring-boot:run
```

#### Option 2: Using Maven Wrapper (Linux/Mac)

```bash
cd my-sms-backend
./mvnw spring-boot:run
```

#### Option 3: Using Global Maven

```bash
cd my-sms-backend
mvn spring-boot:run
```

#### Option 4: Running the JAR file

After building, you can run the JAR file:

```bash
cd my-sms-backend
java -jar target/my-sms-backend-0.0.1-SNAPSHOT.jar
```

The backend will start on **http://localhost:8484**

**H2 Console:** http://localhost:8484/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `1234`

### Running the Frontend

```bash
cd my-sms-frontend
npm run dev
```

The frontend will start on **http://localhost:5173**

### Accessing the Application

Once both servers are running:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8484/api

## 📁 Project Structure

```
service-management-react-spring-boot/
├── my-sms-backend/                 # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/sms/my_sms_backend/
│   │   │   │   ├── config/        # Configuration classes
│   │   │   │   ├── controller/    # REST Controllers
│   │   │   │   ├── dto/           # Data Transfer Objects
│   │   │   │   ├── entity/        # JPA Entities
│   │   │   │   ├── repository/    # JPA Repositories
│   │   │   │   ├── service/       # Business Logic
│   │   │   │   └── MySmsBackendApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql       # Sample data
│   │   └── test/                  # Test files
│   ├── pom.xml                    # Maven configuration
│   └── mvnw                       # Maven wrapper
│
└── my-sms-frontend/                # React Frontend
    ├── src/
    │   ├── components/            # Reusable components
    │   │   ├── ui/                # UI primitives
    │   │   └── ...                # Feature components
    │   ├── pages/                 # Page components
    │   │   ├── Dashboard/
    │   │   ├── Ticket/
    │   │   ├── Tasks/
    │   │   ├── Assets/
    │   │   ├── Inventory/
    │   │   ├── Schedules/
    │   │   ├── Invoices/
    │   │   ├── CRM/
    │   │   ├── Reports/
    │   │   ├── Settings/
    │   │   └── ...
    │   ├── utils/                 # Utility functions
    │   ├── lib/                   # Library files
    │   ├── App.tsx                # Main app component
    │   └── main.tsx               # Entry point
    ├── package.json               # npm configuration
    ├── vite.config.ts             # Vite configuration
    └── tailwind.config.js         # Tailwind CSS configuration
```

## 🔌 API Endpoints

### Base URL: `http://localhost:8484/api`

### Tickets
- `GET /api/tickets` - Get all tickets (with pagination)
- `GET /api/tickets/{id}` - Get ticket by ID
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/{id}` - Update ticket
- `PATCH /api/tickets/{id}/status` - Update ticket status
- `DELETE /api/tickets/{id}` - Delete ticket
- `POST /api/tickets/{id}/comments` - Add comment to ticket

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `PATCH /api/tasks/{id}/status` - Update task status
- `PATCH /api/tasks/{id}/approval` - Update approval status
- `DELETE /api/tasks/{id}` - Delete task

### Assets
- `GET /api/assets` - Get all assets
- `GET /api/assets/{id}` - Get asset by ID
- `GET /api/assets/serial/{serialNumber}` - Get asset by serial number
- `POST /api/assets` - Create new asset
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset

### Inventory
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/{id}` - Get inventory item by ID
- `GET /api/inventory/barcode/{barcode}` - Get item by barcode
- `POST /api/inventory` - Create new inventory item
- `PUT /api/inventory/{id}` - Update inventory item
- `PATCH /api/inventory/{id}/quantity` - Update quantity
- `DELETE /api/inventory/{id}` - Delete inventory item

### Schedules
- `GET /api/schedules` - Get all schedules
- `GET /api/schedules/{id}` - Get schedule by ID
- `POST /api/schedules` - Create new schedule
- `PUT /api/schedules/{id}` - Update schedule
- `PATCH /api/schedules/{id}/status` - Update schedule status
- `DELETE /api/schedules/{id}` - Delete schedule

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/{id}` - Get invoice by ID
- `GET /api/invoices/number/{invoiceNumber}` - Get invoice by number
- `POST /api/invoices` - Create new invoice
- `PUT /api/invoices/{id}` - Update invoice
- `DELETE /api/invoices/{id}` - Delete invoice

### CRM
- `GET /api/crm` - Get all CRM interactions
- `GET /api/crm/{id}` - Get CRM interaction by ID
- `POST /api/crm` - Create new CRM interaction
- `PUT /api/crm/{id}` - Update CRM interaction
- `DELETE /api/crm/{id}` - Delete CRM interaction

### Reports
- `GET /api/reports` - Get all reports
- `GET /api/reports/{id}` - Get report by ID
- `POST /api/reports` - Generate new report

### Mobile Access
- `GET /api/mobile-access` - Get all mobile access records
- `GET /api/mobile-access/{id}` - Get mobile access by ID
- `POST /api/mobile-access` - Create new mobile access record

## 📖 Usage Guide

### Dashboard

The dashboard provides an overview of:
- Total tickets, tasks, and assets
- Revenue statistics
- Low stock alerts
- Status breakdowns with visual progress bars
- Recent activities
- Quick action buttons

### Creating a Ticket

1. Navigate to **Tickets** from the sidebar
2. Click **New Ticket** button
3. Fill in the form:
   - Subject
   - Description
   - Priority
   - Service
   - Assigned To (optional)
4. Click **Create Ticket**

### Managing Tasks

1. Navigate to **Tasks** from the sidebar
2. View all tasks in the table
3. Use the actions menu to:
   - View details
   - Edit task
   - Delete task
4. Create new tasks by clicking **New Task**

### Asset Management

1. Navigate to **Assets** from the sidebar
2. View all assets with their status
3. Create new assets with:
   - Name
   - Serial Number
   - Category
   - Status
   - Location
   - Maintenance dates

### Inventory Management

1. Navigate to **Inventory** from the sidebar
2. View items with quantity and threshold
3. Low stock items are highlighted
4. Create new inventory items with barcode support

### Settings

Access settings from the sidebar to configure:
- **Profile:** Update personal information
- **Notifications:** Configure email and push notifications
- **Security:** Two-factor authentication, session timeout
- **Appearance:** Theme, language, timezone, date/time formats
- **Application:** Items per page, auto-refresh, tooltips

## 🎨 Design System

The application uses the **Stratum Design System** with:

### Color Palette
- **Primary:** Deep Indigo (#4F46E5)
- **Secondary:** Soft Violet (#818CF8)
- **Background:** Slate Grey (#F1F5F9)
- **Surface:** Pure White (#FFFFFF)

### Status Colors
- **Success:** Emerald (#10B981)
- **Warning:** Amber (#F59E0B)
- **Critical:** Red (#EF4444)
- **Info:** Blue (#3B82F6)
- **Neutral:** Slate (#64748B)

### Typography
- **Font Family:** Inter/Roboto
- **H1:** 24px, Semi-Bold
- **H2:** 18px, Medium
- **Body:** 14px, Regular
- **Small:** 12px

### Components
- Cards with subtle borders and shadows
- Buttons with 6px border radius
- Inputs with focus rings
- Status badges with semantic colors

## 🔧 Configuration

### Backend Configuration

Edit `my-sms-backend/src/main/resources/application.properties`:

```properties
# Server Port
server.port=8484

# Database Configuration (H2)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=1234

# H2 Console
spring.h2.console.enabled=true
```

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8484`. To change this, update the axios base URL in your components or create an axios instance with a base URL.

### Database Configuration

The application currently uses H2 in-memory database. To switch to MySQL or PostgreSQL:

1. Add the database driver dependency to `pom.xml`
2. Update `application.properties` with database connection details
3. Update JPA dialect if needed

## 🐛 Troubleshooting

### Backend Issues

**Port Already in Use:**
```bash
# Change the port in application.properties
server.port=8485
```

**Maven Build Fails:**
- Ensure Java 17+ is installed
- Clear Maven cache: `mvn clean`
- Check internet connection for dependency downloads

**H2 Console Not Accessible:**
- Ensure `spring.h2.console.enabled=true` in `application.properties`
- Access at: http://localhost:8484/h2-console

### Frontend Issues

**Port Already in Use:**
```bash
# Vite will automatically use the next available port
# Or specify a port in vite.config.ts
```

**Dependencies Not Installing:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API Connection Errors:**
- Ensure backend is running on port 8484
- Check CORS configuration in backend
- Verify API endpoints in browser network tab

**Build Errors:**
```bash
# Clear build cache
npm run build -- --force

# Check TypeScript errors
npm run lint
```

### Common Issues

**CORS Errors:**
- Backend is configured with `@CrossOrigin(origins = "http://localhost:5173")`
- Ensure frontend is running on the correct port

**Data Not Persisting:**
- H2 in-memory database resets on restart
- Consider switching to file-based H2 or external database for persistence

**Styling Issues:**
- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.js` and `index.css`

## 📝 Development Notes

### Adding New Features

1. **Backend:**
   - Create Entity in `entity/` package
   - Create Repository in `repository/` package
   - Create Service interface and implementation
   - Create Controller in `controller/` package
   - Create DTO in `dto/` package

2. **Frontend:**
   - Create page component in `pages/` directory
   - Create list component if needed
   - Add route in `App.tsx`
   - Add navigation link in `Sidebar.tsx`

### Code Style

- **Backend:** Follow Spring Boot conventions
- **Frontend:** Use TypeScript, functional components with hooks
- **Naming:** Use descriptive names, follow camelCase convention
