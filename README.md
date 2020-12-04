# Capstone Project - Yummy by PuddleJumpers

## Introduction
- Your task is to solve a problem with a full-stack web application. The problem that you solve will be your choice, but you must define the problem and demonstrate how your application solves the problem in your documentation and your presentation. You can choose your own tech stack, but you must be able to complete the project so be sure to choose a stack you are familiar with. The reason we have chosen to give such a simple assignment definition is to allow you to be creative and also to give you enough time to focus on the details. This is your final capstone assignment and should represent a professional level of quality. It is your primary portfolio piece from this program.

## Project Documents and Reports
- [Project Trello Board](https://trello.com/b/zUabU848/capstone-puddlejumpers)
- [Project Wireframes (Figma)](https://www.figma.com/file/iGsjkmFikAAyslTBFRk2Bs/Capstone%3A-Wireframes?node-id=0%3A1)
- [Project ERD (Draw.io)](./Planning/Yummy_ERD.drawio) 
- [Project Plan](./Planning/Capstone Project Plan Puddlejumpers.docx)
- [User Manual](https://docs.google.com/document/d/13sPFINRwDcYq4DSw-gK44Qg3y68dmJ_DL-zZRE-G-BY/edit?usp=sharing)
- [Testing Manual](https://docs.google.com/document/d/1Pe5WhP3cspQlvyIUiBKgSVL9p2SwmnivN5Bbi0fit0w/edit?usp=sharing)

## Team Members:
- Krisztina Pap
- Aaron Barthel
- Kenji Au
- Lindsey Graham
- Tosin Olaniyi

## Project Summary
- Our web application simplifies users’ lives by enabling them to plan their meals for the next day or week in advance, using their own favourite recipes. By doing so, it reduces stress, decision-fatigue, and cuts down on last-minute grocery store trips

## Problem Statement
- Deciding on what to eat or what meal to serve the family three times a day can be a source of significant stress for many. We aim to provide our users with a convenient and easy-to-use repository for their favourite recipes and a way to organize them into daily or weekly meal plans. This could save them a lot of last minute decision-making, headaches about what ingredients they do or do not have on hand, and most importantly those energy- and time-consuming last minute trips to pick up that crucial missing ingredient.

## Stack Used
- .NET Core
- React
- MariaDB

## Project Scope
### In-scope features
- Adding a recipe
- Viewing a recipe
- Editing/updating a recipe
- Deleting a recipe
- Viewing meal plan (schedule)
- Making/editing meal plan (schedule)
- Add a user profile
- Edit a user profile (update name/password)

### Out-of-scope features
- Password email (send password reset link to user email)

## Installation Instructions
#### Installing Locally
- Install phpMyAdmin.
- Download or Clone this Repository.
- Create a new .env file in the project folder.
    - For the new .env file follow the structure in the .env.sample file.
- From the base project folder run:
    - "npm run db:setup"
- Navigate to phpMyAdmin in your web browser to confirm successful installation and database migration.
- From the "frontend" folder run:
    - "npm install"
#### Installing via Cloud
- Install phpMyAdmin on your cloud server and set up secure login credentials
- Download or Clone Repository.
    - Make the following configuration changes:
        - SETTINGS TO BE CHANGED 1
        - SETTINGS TO BE CHANGED 2
        - SETTINGS TO BE CHANGED 3
- Upload Repo to your cloud server via your preferred method
- Connect to your cloud server via terminal and access the root project folder and run:
    - "npm run db:setup"
    - Note: This will fail if you skipped the previous step or put in invalid login credentials.
- Configure your server to keep the Front End and Back End portions of this WebApp online at all times
    - Support for this step will not be provided by our team and can be found in the documentation of your server provider.
- Navigate to your servers public IP address to test for a successful install.
##### Tip! Consider purchasing a domain and redirect to your servers public IP address as a fast way of accessing your WebApp!

## Application Usage Instructions
- Ensure that the application has been properly installed.
- From the base folder run:
    - "npm run start:all"
- Navigate to the port in your web browser (the application is set to listen on port 5001 initially).
## Test Cases & Testing Instructions
#### Endpoint Testing via Postman
- Ensure that the data being sent is through the Body and that the format is set to JSON.
- API endpoints
    - Register
        - Method: POST 
        - https://localhost:5001/api/Authenticate/register
        - Body:
            ```
            {
                "Name" : "PeterTest",
                "username" : "PeterTest",
                "email" : "PeterTest@gmail.com",
                "password" : "Password@123"
            }
            ```
    - Login
        - This API endpoint will return a JWT. This token will be required for protected endpoints.
        - Method: POST 
        - https://localhost:5001/api/Authenticate/login
        - Body: 
            ```
            {
                "username" : "PeterTest",
                "password" : "Password@123"
            }
            ``` 
    - Recipes
        - Method: GET
        - https://localhost:5001/api/Recipes/-1
        - The last number is the recipe ID number. This number can be changed to any as long as there exists a recipe in the database with the corresponding ID.
        - Set the Authorization type to Bearer Token.
            - This token is the JWT taken from the Login endpoint.
    - UOM
        - Method: GET
        - https://localhost:5001/api/UOMs/all
    - Recipe Categories
        - Method: GET
        - https://localhost:5001/api/recipecategories/options
#### Endpoint Testing via Webapp
- Navigate to the following pages to test endpoints
    - Page 1, Endpoint 1
    - Page 2, Endpoint 2
    - Page 3, Endpoint 3
    - Page 4, Endpoint 4
    - Page 5, Endpoint 5
#### Front End Testing
- Responsiveness
-

## Citations:
- [React Context](https://reactjs.org/docs/context.html)
- [Composite Key Creation in C# EF](https://www.learnentityframeworkcore.com/configuration/many-to-many-relationship-configuration)
- [Web Dev Simplified: Learn useContext in 13 minutes](https://www.youtube.com/watch?v=5LrDIWkK_Bc)
- [StackOverflow: make footer fixed on the bottom with tailwindCSS](https://stackoverflow.com/questions/59812003/make-footer-fixed-on-the-bottom-with-tailwindcss)
- [TailwindCSS docs](https://tailwindcss.com/docs)
- [FontAwesome icons](https://fontawesome.com)
- [Swiper React](https://swiperjs.com/react/)
- [Moment.js](https://momentjs.com/)
- [React conditional rendering based on screen size](https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size)
- [Rendering dates from an array](https://dyclassroom.com/javascript-code/create-an-array-of-dates-between-start-date-and-end-date-in-javascript)
- [TailwindCSS Tailblocks Component](https://mertjf.github.io/tailblocks/)
- [React Burger Menu](https://github.com/negomi/react-burger-menu)



## Backend Testing
 - [AutoRollbackAttribute.cs](https://github.com/xunit/samples.xunit/blob/main/AutoRollbackExample/AutoRollbackAttribute.cs)
