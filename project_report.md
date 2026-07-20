# Project Report: GoVroom - Premium Vehicle Rental Platform

## 1. Abstract
GoVroom is a comprehensive, full-stack web application designed to bridge the gap between vehicle rental agencies and customers looking for premium cars and two-wheelers. Built using the modern MERN stack (MongoDB, Express.js, React, Node.js), the platform digitalizes the entire vehicle rental lifecycle. It features a secure, role-based architecture supporting Customers, Agencies, and Administrators. By integrating real-time booking workflows, cloud-based image storage, and an intuitive dark-themed user interface, GoVroom provides a seamless and premium rental experience while giving agencies full control over their fleet and reservations.

## 2. Introduction
### 2.1 Purpose
The traditional vehicle rental process is often plagued by manual paperwork, disjointed communication, and a lack of transparency for both the renter and the provider. GoVroom was developed to solve these issues by providing a centralized digital marketplace. 

### 2.2 Objectives
* To create a secure platform where verified agencies can list their fleets.
* To provide customers with an intuitive interface to browse, filter, and book vehicles.
* To implement a robust approval workflow for both users (agencies) and bookings.
* To deliver a premium, mobile-responsive user experience.

## 3. Technology Stack
The project was developed using modern, industry-standard technologies to ensure scalability, security, and maintainability:

* **Frontend (Client):** 
  * **React 18 (Vite):** For building a fast, interactive user interface.
  * **Tailwind CSS & shadcn/ui:** For rapid, utility-first styling and accessible UI components.
  * **React Router DOM:** For seamless Single Page Application (SPA) navigation.
  * **Axios:** For handling HTTP requests to the backend API.
* **Backend (Server):** 
  * **Node.js & Express.js:** For building a robust, RESTful API.
  * **MongoDB & Mongoose:** As a flexible NoSQL database and Object Data Modeling library.
  * **JSON Web Tokens (JWT) & bcryptjs:** For stateless, secure authentication and password hashing.
  * **Cloudinary & Multer:** For handling image uploads and cloud storage.

## 4. System Architecture
GoVroom utilizes a decoupled Client-Server architecture. The React frontend operates independently and communicates with the Express backend via RESTful API endpoints. 

* **Authentication Flow:** Users log in and receive a JWT. This token is attached to subsequent API requests via HTTP headers, ensuring stateless and secure authorization.
* **Data Flow:** The Express backend acts as the controller, interacting with the MongoDB database to fetch, create, or update records, and interfacing with Cloudinary API to upload and serve vehicle images.

## 5. Modules & Features
The system is divided into three primary role-based modules:

### 5.1 Customer Module
* **Authentication:** Secure registration and login.
* **Vehicle Browsing:** Customers can view the entire approved fleet and use dynamic filters (e.g., fuel type, transmission, price).
* **Booking System:** Customers can select start and end dates and submit a rental request to the respective agency.
* **Booking Dashboard:** A dedicated space to track the real-time status of their requests (Pending, Approved, Rejected, Completed).

### 5.2 Agency Module
* **Fleet Management:** Agencies can add new vehicles, upload images directly to the cloud, and update vehicle details/pricing.
* **Booking Management:** Agencies receive booking requests from customers and have the authority to Approve or Reject them based on availability.
* **Earnings Tracking:** Agencies can view the expected earnings for all approved and completed bookings.

### 5.3 Administrator Module
* **Platform Governance:** Admins review and approve newly registered Agencies before they are allowed to list vehicles.
* **Global Oversight:** Admins can view all users, all vehicles, and all bookings across the entire platform to ensure quality control and handle disputes.

## 6. Database Schema Design
The NoSQL database relies on three interconnected collections:

1. **Users:** Stores credentials, contact info, and roles (`customer`, `agency`, `admin`). Includes an `isApproved` flag specifically for agency onboarding.
2. **Vehicles:** Stores vehicle metadata (brand, model, pricing, fuel type), the Cloudinary image URL, and a reference (`agencyId`) linking the vehicle to its owner.
3. **Bookings:** Acts as the transactional bridge, storing references to the `customerId`, `agencyId`, and `vehicleId`, alongside rental dates, calculated total price, and the current state (`pending`, `approved`, etc.).

## 7. Implementation & Deployment
* **Local Development:** The project uses `concurrently` to run both the Vite development server and the Node backend simultaneously.
* **Production Deployment:**
  * The **Frontend** is deployed on Vercel, benefiting from global CDN distribution.
  * The **Backend** is hosted on Render as a Web Service.
  * The **Database** is hosted on MongoDB Atlas in the cloud.
  * Cross-Origin Resource Sharing (CORS) is strictly configured to allow secure communication between the Vercel frontend and the Render backend.

## 8. Future Scope
While the current iteration fulfills all core requirements of a rental marketplace, future enhancements could include:
* Integration of a secure payment gateway (e.g., Stripe or Razorpay) for upfront deposit processing.
* Real-time GPS tracking integration for agencies to monitor their active fleet.
* An automated review and rating system for customers to rate vehicles and agencies.
* Advanced dynamic pricing algorithms based on demand and seasonality.

## 9. Conclusion
The GoVroom platform successfully digitalizes the vehicle rental ecosystem. By leveraging the MERN stack and cloud services like Cloudinary and MongoDB Atlas, the project resulted in a highly responsive, secure, and scalable application. The strict role-based access control ensures that all participants—Customers, Agencies, and Admins—have tailored, efficient interfaces to fulfill their specific needs within the marketplace.
