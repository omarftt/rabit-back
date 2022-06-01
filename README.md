## RABIT TECH - FRONT BACKEND


### Related repositories

This repo contain the backend functionality of Rabit Tech web application. If you would like to run all, please go to https://github.com/omarftt/rabit-front and run it too.


### Installing dependencies

To install the project in local execute the next line in terminal:

```
npm install
```

### Previous instructions
To run the project create your .env file and add the next information:

```
URL_FRONT= 'http://localhost:3000' ## for local 
CLOUDINARY_NAME=  ##Provide your own cloudinary name
CLOUDINARY_API_KEY= ##Provide your own cloudinary api key
CLOUDINARY_API_SECRET = ##Provide your own cloudinary api secret code
```
If you dont provide Cloudinary credentials, upload image functionality does not work.


### Run instructions

To run the project execute the next line:
```
npm start 
```
To test the project execute the next line:
```
npm start : run application
npm run dev: run in development environment
```



	
### Endpoinst information

Here some additional information for endpoints created:

```
├── /AUTH/LOCAL
     |-- POST   /register  : Register user 
     |-- POST   /login     : Login user by email/password
     |-- GET    /refresh    : Refresh the auth token
     |-- GET    /logout     : Log out
     
├── /API/USER
     |-- GET     /all             : Get all list of users
     |-- GET    /:id              : Get user by Id
     |-- DELETE /:id              : Delete user by Id
     |-- PUT  /update             : Update profile user information
     |-- GET  /current/profile      : Get the user logged
     |-- PUT  /api/favs/:favsId      : Update profile image
     
├── /API/TALLER
     |-- POST    /                      : *Admin* creates a 'taller' 
     |-- GET     /                      : *Admin and Teacher* get 'talleres' created
     |-- GET    /:id                    : Get 'taller' by Id
     |-- DELETE    /:id                 : Delete 'taller' by Id
     |-- PUT    /:id                    : Update 'taller' information by Id
     |-- GET    /user/unique            : Get the own 'talleres' of the user logged (*Admin or Teacher*)
     |-- PUT    /enroll/current/:tallerId       : *Teacher* enroll in a classroom
     |-- PUT    /unenroll/:tallerId     : *Teacher* unenroll from a classroom
     |-- PUT    /imageUpload/current    : Upload 'taller' front image
     
├── /API/PRODUCTS
     |-- POST    /       : 
     |-- GET    /       : 
     |-- GET    /:id       : 
     |-- DELETE    /:id       : 
     |-- PUT    /:id       : 
     |-- PUT    /imageUpload/imgfront       :
     |-- PUT    /imageUpload/imgmodal      :
     
├── /API/CLASSROOM
     |-- POST    /api/fav/:favsId       : Creates a single fav for favorite list
├── /API/HOMEWORK
     |-- POST    /api/fav/:favsId       : Creates a single fav for favorite list

```
