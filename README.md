# 🎓 Student Event Management System (IP-mini)

## 📌 Description
This project is a full-stack web application designed to manage student and faculty events. It features a modern **microservices-based backend** to ensure scalability and separation of concerns, alongside a fast, interactive frontend.

The system provides dedicated services for handling student data, faculty details, and event management, all communicating efficiently to deliver a seamless user experience.

---

## 🚀 Features
- 📅 Create, update, and manage events  
- 👨‍🎓 Manage student information  
- 👩‍🏫 Manage faculty details  
- 🔗 Microservices-based backend for scalability  
- ⚡ Fast and interactive frontend UI  
- 🔄 Independent service communication  

---

## 🛠️ Tech Stack

### 🎨 Frontend
- **Framework:** React 19 with Vite  
- **Language:** TypeScript  
- **Routing:** React Router v7  
- **Styling/Icons:** Lucide React  
- **HTTP Client:** Axios  

### ⚙️ Backend (Microservices)
- **Framework:** Spring Boot 3.4.2  
- **Language:** Java 17  
- **Build Tool:** Maven (Multi-module project)  
- **Utilities:** Lombok  

#### 🔧 Microservices
- `student-service` → Handles student-related operations  
- `faculty-service` → Manages faculty information  
- `event-service` → Core service for event creation and management  

---

## 📁 Project Structure

```
IP-mini/
├── frontend/               # React + Vite frontend application
│   ├── src/                # Components, pages, and API integration
│   ├── public/             # Static assets
│   ├── package.json        # Node.js dependencies
│   └── vite.config.ts      # Vite configuration
└── studentevent/           # Spring Boot backend projects
    ├── event-service/      # Event management microservice
    ├── faculty-service/    # Faculty management microservice
    ├── student-service/    # Student management microservice
    └── pom.xml             # Root parent POM for maven modules
```

---

## ⚡ Getting Started

### ✅ Prerequisites
- Node.js (v18 or higher)  
- Java Development Kit (JDK 17)  
- Maven (or use the provided `mvnw` wrapper)  

---

## ▶️ Running the Backend

The backend is structured as a Maven multi-module project comprising three independent services.

1. Navigate to the backend directory:
   ```bash
   cd studentevent
   ```

2. Build all the services using Maven wrapper:
   ```bash
   ./mvnw clean install
   ```

3. Start each service individually:
   ```bash
   cd student-service && ../mvnw spring-boot:run
   cd ../faculty-service && ../mvnw spring-boot:run
   cd ../event-service && ../mvnw spring-boot:run
   ```

⚠️ Ensure each service runs on different ports (configure in `application.properties`).

---

## 💻 Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 🔗 Future Improvements
- 🔐 Authentication & Authorization (JWT / OAuth)  
- 🌐 API Gateway integration  
- 🐳 Docker containerization  
- ☁️ Cloud deployment (AWS / Azure / GCP)  

---

## 📄 License
Please refer to the `LICENSE` file for more details.

---

## 🙌 Acknowledgements
Built as part of an academic mini-project to demonstrate full-stack development and microservices architecture.
