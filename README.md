
# Task Management Application

A comprehensive application designed to help users efficiently manage their tasks and projects. With a user-friendly interface and robust backend support, this application allows users to create, update, assign, and track tasks seamlessly.

## Features
- **Task Creation and Management**: Create new tasks, set priorities, and assign deadlines.
- **Project Support**: Group tasks under specific projects for better organization.
- **User Assignment**: Assign tasks to different users, and track the progress.
- **Task Status Update**: Easily update task status (e.g., Pending, In Progress, Completed).
- **Notifications and Reminders**: Get reminders and updates about upcoming deadlines.
- **API Documentation**: Swagger-based API documentation to explore available endpoints.

## Technologies Used
### Backend
- **Java Spring Boot**
- **Spring Data JPA**
- **MySQL**
- **Swagger** (for API documentation)

### Frontend
- **React**
- **Material-UI** (for sleek, responsive components)
- **Axios** (for API calls)

## Getting Started

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the backend directory:
   ```bash
   cd TaskManageMentBacked
   ```
3. Configure the database settings in the `application.properties` file:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/task_management
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```
4. Build and run the backend server:
   ```bash
   mvn spring-boot:run
   ```
5. Access the backend API documentation at:
   ```
   http://localhost:8080/swagger-ui/index.html
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/task
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```
4. Access the frontend application at:
   ```
   http://localhost:3000
   ```

## Usage
1. Create a new project and define its tasks.
2. Assign tasks to different users, and update task statuses as needed.
3. Use the task filter and search options to find tasks easily.
4. View task analytics and generate reports for completed projects.

## API Endpoints
The Swagger API documentation provides a complete overview of available endpoints for task, user, and project management. Visit `http://localhost:8080/swagger-ui/index.html` for more information.
