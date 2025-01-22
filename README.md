
# Blog Management System API Documentation

## **Base URL**
```
http://localhost:3000
```

---

## **Authentication**


### **2. User Signup**
- **URL**: `/auth/signup`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

---

### **1. User Login**
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticate a user and return a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "token": "JWT-TOKEN"
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "message": "Invalid credentials"
    }
    ```


## **Blogs**

### **1. Get All Blogs**
- **URL**: `/blogs`
- **Method**: `GET`
- **Description**: Retrieve all blog posts.
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "_id": "63c9f1dfc1a7c9b4a1e8e9a4",
        "title": "How to Learn Node.js",
        "content": "Start by understanding JavaScript..."
      }
    ]
    ```

### **2. Get Blog by ID**
- **URL**: `/blogs/{id}`
- **Method**: `GET`
- **Description**: Retrieve details of a specific blog post.
- **Response**:
  - **200 OK**:
    ```json
    {
      "_id": "63c9f1dfc1a7c9b4a1e8e9a4",
      "title": "How to Learn Node.js",
      "content": "Start by understanding JavaScript..."
    }
    ```
  - **404 Not Found**:
    ```json
    {
      "message": "Blog not found"
    }
    ```

### **3. Create a Blog (Admin Only)**
- **URL**: `/blogs`
- **Method**: `POST`
- **Description**: Create a new blog post.
- **Request Body**:
  ```json
  {
    "title": "New Blog Post",
    "content": "This is the content of the blog post."
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "message": "Blog created successfully"
    }
    ```

### **4. Update Blog (Admin or Assigned Editor)**
- **URL**: `/blogs/{id}`
- **Method**: `PUT`
- **Description**: Update an existing blog post.
- **Request Body**:
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated content for the blog post."
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Blog updated successfully"
    }
    ```

### **5. Delete Blog (Admin Only)**
- **URL**: `/blogs/{id}`
- **Method**: `DELETE`
- **Description**: Delete a blog post.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Blog deleted successfully"
    }
    ```

---

## **Comments**

### **1. Add a Comment**
- **URL**: `/blogs/{blogId}/comments`
- **Method**: `POST`
- **Description**: Add a comment to a specific blog post.
- **Request Body**:
  ```json
  {
    "content": "This is a comment."
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "message": "Comment added successfully"
    }
    ```

### **2. Delete a Comment**
- **URL**: `/comments/{id}`
- **Method**: `DELETE`
- **Description**: Delete a comment by its ID.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Comment deleted successfully"
    }
    ```

### **3. Delete All Comments for a Blog**
- **URL**: `/blogs/{blogId}/comments`
- **Method**: `DELETE`
- **Description**: Remove all comments associated with a specific blog post.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "All comments for the blog have been deleted successfully"
    }
    ```

---

## **Roles and Access**

| Role   | Access to Endpoints                                                                                   |
|--------|------------------------------------------------------------------------------------------------------|
| Admin  | Can create, edit, delete blogs; assign blogs to editors; manage all comments.                        |
| Editor | Can edit blogs assigned to them by Admin.                                                            |
| User   | Can view blogs and manage their own comments.                                                        |

---

## **Error Codes**

| Status Code | Description                 |
|-------------|-----------------------------|
| 200         | Success                     |
| 201         | Resource created            |
| 400         | Bad request                 |
| 401         | Unauthorized (invalid token)|
| 403         | Forbidden (not allowed)     |
| 404         | Resource not found          |
| 500         | Internal server error       |
