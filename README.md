# Blog Management System API Documentation

## **Base URL**

```
https://blog-management-system-api.vercel.app
```

---

To make API testing easier, I have prepared a Postman collection containing all the available endpoints with pre-configured requests and sample data.

### **How to Use the Postman Collection**
 - Download or import the Postman collection from the link below.
 - Update the environment variables (e.g., `baseUrl`, `token`) as needed.
 - Start testing the API endpoints directly from Postman.

Postman Collection Link : [Click here](https://elements.getpostman.com/redirect?entityId=41326442-8dc774ca-63c4-4a71-9a58-2820c8e17e41&entityType=collection)

---

| Role   | Access to Endpoints                                                           |
| ------ | ----------------------------------------------------------------------------- |
| Admin  | Can create, edit, delete blogs; assign blogs to editors; manage all comments. |
| Editor | Can edit blogs assigned to them by Admin.                                     |
| User   | Can view blogs and manage their own comments.                                 |

---

## **Authentication**

### **1. User Signup**

- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:

  ```json
  {
    "name": "Rithickroshan S",
    "email": "rithickroshan7878@gmail.com",
    "password": "admin@123",
    "role": "admin"
  }
  ```

  - _name, email and passoword are required_

  - _role is optional in default role will be assign user_
  - _eamil should be unique_

- **Response**:

  - **201 Resource created**:

    ```json
    {
      "message": "verficatio link sented thorugh email, verify your mail"
    }
    ```

    _User created successfully._

  - **400 Bad request**:
    ```json
    {
      "message": "rithickroshan7878@gamil.com is already exists,  try other"
    }
    ```
    _`Reason:-` eamil already exist_.

---

### **2. Verify email**

- **URL**: `/api/auth/verify/{token}`
- **Method**: `GET`
- **Description**: verifying email through link.

- **Response**:

  - **200 OK**:
    ```json
    {
      "message": "verifyed"
    }
    ```
    _Email verifycation successfully completed._
  - **200 OK**:

    ```json
    {
      "message": "user already verifyed"
    }
    ```

    _If user already verifyed the account using same link_

  - **401 Unauthorized**:

    ```json
    {
      "message": "invalid link"
    }
    ```

    _`Reason:-` If invalid token used in link_.

  - **400 Bad request**:

    ```json
    {
      "message": "verification link expired"
    }
    ```

    _`Reason:-` If user clicks link after 24 hours, then link will be expired_.

### **3. Resend verification link**

- **URL**: `/api/auth/resendverifylink?email={email}`
- **Method**: `GET`
- **Description**: Request to resend verification link.

- **Response**:

  - **200 OK**:

    ```json
    {
      "message": "verfication link resented thorugh email, verify your email"
    }
    ```

    _Verification link resended successfully._

  - **200 OK**:

    ```json
    {
      "message": "user already verifyed"
    }
    ```

    _If user already verifyed._

  - **404 Resource not found**:

    ```json
    {
      "message": "user not found"
    }
    ```

    _`Reason:-` If non registered user request's the verification link_.

  - **400 Bad request**:

    ```json
    {
      "message": "enter valid email"
    }
    ```

    _`Reason:-` If invalid email id provided_.

### **4. Login**

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Authenticate a user and return a JWT token.
- **Request Body**:

  ```json
  {
    "email": "rithickroshan7878@gmail.com",
    "password": "admin@123"
  }
  ```

- **Response**:

  - **200 OK**:

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......"
    }
    ```

    _login successfully._

  - **404 Resource not found**:

    ```json
    {
      "message": "user not found"
    }
    ```

    _`Reason:-` If non registered user request's try's to login_.

  - **400 Bad request**:

    ```json
    {
      "message": "worng password"
    }
    ```

    _`Reason:-` If user try's login using invalid password_.

  - **401 Unauthorized**:

    ```json
    {
      "message": "verify your email id"
    }
    ```

    _`Reason:-` If registered user, not verifiyed there email._

  - **400 Bad request**:

    ```json
    {
      "message": "enter valid email"
    }
    ```

    _`Reason:-` If invalid email id provided_.

### **5. Fetch user**
  - **URL**: `/api/users/user`
  - **Method**: `GET`
  - **Description**: To get user data.
  - **Request Header**:
    ```json
    {
      "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........"
    }
    ```
  - **Request Body**:
    ```json
    {
      "email": "rithickroshan7878@gmail.com",
      "password": "admin@123"
    }
    ```
  - **Response**:

    - **200 OK**:

      ```json
      {
          "_id": "6791d93d57c8739f458744e1",
          "name": "RithickROshan S",
          "email": "rithickroshan7878@gamil.com",
          "role": "admin",
          "verified": true,
          "createdAt": "2025-01-23T05:53:05.002Z",
          "updatedAt": "2025-01-23T05:54:16.864Z"
      }
      ```

## **Blogs**

### **1. Get All Blogs**

- **URL**: `/api/blogs`
- **Method**: `GET`
- **Description**: Retrieve all blogs.
- **Response**:
  - **200 OK**:
    ```json
    {
      "blogList": [
        {
          "_id": "6790f5ddffd6066ee840188a",
          "tittle": "1st blog",
          "content": "lsakdjaldk sdas asd.......",
          "author": {
            "_id": "6790646e5fd3f0b576900bb5",
            "name": "Rithickroshan S",
            "email": "rithickroshandev@gmail.com"
          },
          "editor": null,
          "comments": [
            {
              "_id": "6790f6c961ccf372115a202e",
              "text": "last comment",
              "author": {
                "_id": "6790646e5fd3f0b576900bb5",
                "name": "Rithickroshan S"
              }
            }
          ],
          "createdAt": "2025-01-22T13:42:53.316Z",
          "updatedAt": "2025-01-22T13:46:49.827Z",
          "__v": 1
        },
        {
          "_id": "6790f5ddffd6066ee840188a",
          "tittle": "1st blog",
          "content": "lsakdjaldk sdas asd.......",
          ......
        },
        ....
      ],
      "total": 10
    }
    ```

### **2. Get Blog by ID**

- **URL**: `/api/blogs/blog/{blogId}`
- **Method**: `GET`
- **Description**: Retrieve details of a specific blog.
- **Response**:
  - **200 OK**:
    ```json
    {
      "blog":{
        "_id": "6790f5ddffd6066ee840188a",
        "tittle": "1st blog",
        "content": "lsakdjaldk  oiohd oa hd asdl l  jdhka   ksjdhak d kjdhkash",
        "author": {
            "_id": "6790646e5fd3f0b576900bb5",
            "name": "Rithickroshan S"
        },
        "editor": null,
        ......
      },
      "createdAt": "2025-01-22T13:42:53.316Z",
      "updatedAt": "2025-01-22T13:46:49.827Z",
      "__v": 1
    }
    ```
  - **404 Not Found**:
    ```json
    {
      "message": "blog not found"
    }
    ```
    _`Reason:-` If blog not found_.

### **3. Create a Blog (Admin Only)**

- **URL**: `/api/blogs/create`
- **Method**: `POST`
- **Description**: Create a new blog post.
- **Request Header**:
  ```json
  {
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........"
  }
  ```
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
      "message": "blog created successfully"
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "message": "Access denied"
    }
    ```
    _`Reason:-` Admin only had access to create a new blog_.

### **4. Assign editor to Blog (Admin or Assigned Editor)**

- **URL**: `/blogs/asingedtior/{blogId}/{editorId}`
- **Method**: `GET`
- **Description**: Assigning editor to blog.
- **Request Header**:
  ```json
  {
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........"
  }
  ```
- **Response**:

  - **200 OK**:
    ```json
    {
      "message": "asign editor successfully"
    }
    ```
  - **401 Unauthorized**:

    ```json
    {
      "message": "Access denied"
    }
    ```

    _`Reason:-` Admin only had access to assign the editor_.

  - **404 Bad Request**:
    ```json
    {
      "message": "editor not found"
    }
    ```
    _`Reason:-` If editor not found_.

### **5. Edit Blog (Admin or Assigned Editor)**

- **URL**: `/api/blogs/edit/{blogId}`
- **Method**: `PUT`
- **Description**: Edit an existing blog post.
- **Request Header**:
  ```json
  {
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........"
  }
  ```
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
      "message": "blog edited successfully"
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "message": "Access denied"
    }
    ```
    _`Reason:-` Admin and Editor had access to assign the editor_.
  - **401 Unauthorized**:

    ```json
    {
      "message": "You are not assigned to this blog and cannot edit it."
    }
    ```

    _`Reason:-` If not assigned editor try's to edit the bolg_.

  - **404 Bad Request**:
    ```json
    {
      "message": "blog not found"
    }
    ```
    _`Reason:-` If blog not found_.

### **6. Delete Blog (Admin Only)**

- **URL**: `/api/blogs/delete/{blogId}`
- **Method**: `DELETE`
- **Description**: Delete a blog post.
- **Request Header**:
  ```json
  {
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........"
  }
  ```
- **Response**:

  - **200 OK**:
    ```json
    {
      "message": "blog deleted successfully"
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "message": "Access denied"
    }
    ```
    _`Reason:-` Admin only had access to delete_.
  - **401 Unauthorized**:

    ```json
    {
      "message": "your not a author"
    }
    ```

    _`Reason:-` If another user try's to delete the post_.

  - **404 Bad Request**:
    ```json
    {
      "message": "blog not found"
    }
    ```
    _`Reason:-` If blog not found_.

## **Comments**

### **1. Add a Comment**

- **URL**: `/api/comments/add/{blogId}`
- **Method**: `POST`
- **Description**: Add a comment to a specific blog post.
- **Request Header**:
  ```json
  {
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........"
  }
  ```
- **Request Body**:
  ```json
  {
    "text": "This is a comment."
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

- **URL**: `/delete/{commentId}`
- **Method**: `DELETE`
- **Description**: Delete a comment by its ID.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Comment deleted successfully"
    }
    ```

## **Error Codes**

| Status Code | Description                  |
| ----------- | ---------------------------- |
| 200         | Success                      |
| 201         | Resource created             |
| 400         | Bad request                  |
| 401         | Unauthorized (invalid token) |
| 403         | Forbidden (not allowed)      |
| 404         | Resource not found           |
| 500         | Internal server error        |
