This is a web application that uses 2 microservices that connects between each other and a frontend. 
For the backend part I used Java Spring Boot : 
- first microservice is related to users and crud operations that can be done on users list.
- second microservice is related to metering devices. Each user can have one or more device. The devices are mapped to the user's id. For that I used restTemplate to communicate between microservices.
In the frontend, I used React JS. The website has 4 pages : Login, Register, UserPage and AdministratorPage.
In the Login page you can authenticate as an user or as an administrator, depending on the user role. Also, in the login page, you can click a button and Register a new user.
If the role of the user is Administrator, a new page will show up '/Administrator', where you can do CRUD operations on Users list and Devices list. You can map one or more device to an user.
If an user is logged in as Administrator, he cannot navigate to '/user' page, he will be redirected to the login page. The same thing applies if the user logged in is an User, he cannot acces '/administrator'.
Logging in as an User, the page displays the list of devices that are mapped to that user's id.
For data persistance, I used MySQL server.
