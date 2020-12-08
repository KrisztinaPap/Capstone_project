# Capstone Project - Yummy by PuddleJumpers

## Project Summary
- Our web application simplifies users’ lives by enabling them to plan their meals for the next day or week in advance, using their own favourite recipes. By doing so, it reduces stress, decision-fatigue, and cuts down on last-minute grocery store trips

### Problem Statement
- Deciding on what to eat or what meal to serve the family three times a day can be a source of significant stress for many. We aim to provide our users with a convenient and easy-to-use repository for their favourite recipes and a way to organize them into daily or weekly meal plans. This could save them a lot of last minute decision-making, headaches about what ingredients they do or do not have on hand, and most importantly those energy- and time-consuming last minute trips to pick up that crucial missing ingredient.

### Project Documents and Reports
- [Approved Project Plan](./planning/Capstone_Project_Plan_Puddlejumpers.md)
- [Project Trello Board](https://trello.com/b/zUabU848/capstone-puddlejumpers)
- [Project Wireframes (Figma)](https://www.figma.com/file/iGsjkmFikAAyslTBFRk2Bs/Capstone%3A-Wireframes?node-id=0%3A1)
- [Project ERD (Draw.io)](./planning/YummyERD.png) 
- [Yummy Installation Manual](./planning/Yummy_Installation_Manual.md)
- [Yummy User Manual](./planning/Yummy_User_Manual.md)
- [Yummy Testing Manual](./planning/Yummy_Testing_Manual.md)

### DEMO USER LOGIN INFORMATION:
- Email: demo@example.com
- Password: Demo1!

### Team Members:
- Krisztina Pap
- Aaron Barthel
- Kenji Au
- Lindsey Graham
- Tosin Olaniyi

### Stack Used
- .NET Core
- React
- MariaDB
- TailwindCSS

### Project Scope
#### In-scope features
- Adding a recipe
- Viewing a recipe
- Editing/updating a recipe
- Deleting a recipe
- Viewing meal plan
- Making/editing meal plan
- Adding a user profile
- Editing a user profile (updating name/password)

#### Out-of-scope features
- Password email flow
- Deleting user profiles

## User Manual/Quick Start Guide
Yummy allows users to plan their meals in advance, therefore saving them time and last-minute runs to the grocery store.

To properly install the application, please follow the steps described in the Installation Instructions section below or in the [Yummy Installation Manual](./planning/Yummy_Installation_Manual.md). 

Main Yummy Features:
- Site Navigation
- User Profiles
- Meal Plan
- Recipes List
- Recipe Details
- Instructions/About Page

Yummy has a pop-out Site Navigation menu that can be accessed from any of the site’s pages by simply clicking on the button with the three horizontal lines (the “hamburger menu”) in the top left corner of the screen.

Yummy features an easy-to-use user profile management component and requires users to log in to ensure that recipes and meal plans stay private. 

For ease-of-use, the Meal Plan screen serves a dual purpose. It shows what is already scheduled and allows users to edit their plans.

The Recipes page displays all the user’s recipes for easy browsing. Clicking on a title or picture will bring up the details of that recipe. Clicking on the trash can icon will delete that recipe.

In the spirit of maximum user-friendliness and transparency, the Yummy landing page includes information on both the application and the team who built it.


For detailed user information please see the [Yummy User Manual](./planning/Yummy_User_Manual.md)

## Installation Instructions
### Requirements
This is a Windows OS (Windows 10) application.
- .NET Core 3.1 
    - Install from: https://dotnet.microsoft.com/download/dotnet-core/3.1
- .NET EF Tools Global
    - Install by running the following command in your command prompt or PowerShell: “dotnet tool install --global”
    - For details, refer to: https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools-how-to-use

- Node.js LTS 
    - Install from: https://nodejs.org/en/
- XAMPP
    - Install from: https://www.apachefriends.org/download.html

### Installation Instructions
1. Download repository from GitHub.
2. Turn on XAMPP server
3. Create env file
- Open the “.env.sample” file located in the project root folder
- Update the database server information to match your local setup
- Save and rename the sample file to “.env”
4. Open up command prompt, then:
- Navigate to project folder
- Run the command: “npm run install:all” (If you get prompted to install a certificate, click ‘yes’.)
- Run the command: “npm run db:setup”
- Run the command: “npm run start:all”
5. Open a browser and navigate to “https://localhost:5001/”

For detailed installation instructions please see the [Yummy Installation Manual](./planning/Yummy_Installation_Manual.md)

## Testing Instructions

### DEMO USER LOGIN INFORMATION:
- Email: demo@example.com
- Password: Demo1!

### Testing Prerequisites
- Yummy currently only supports Windows OS
- Internet access 
- A web browser such as Google Chrome, Firefox, or Microsoft Edge
- Database/server must be running
- Must have DOTNET Core 3 installed
- Must have node.js installed

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


## Backend Testing
 - [AutoRollbackAttribute.cs](https://github.com/xunit/samples.xunit/blob/main/AutoRollbackExample/AutoRollbackAttribute.cs)


For detailed testing instructions please see the [Yummy Testing Manual](./planning/Yummy_Testing_Manual.md)

## Citations:
- [React Context](https://reactjs.org/docs/context.html)
- [Composite Key Creation in C# EF](https://www.learnentityframeworkcore.com/configuration/many-to-many-relationship-configuration)
- [Web Dev Simplified: Learn useContext in 13 minutes](https://www.youtube.com/watch?v=5LrDIWkK_Bc)
- [StackOverflow: make footer fixed on the bottom with tailwindCSS](https://stackoverflow.com/questions/59812003/make-footer-fixed-on-the-bottom-with-tailwindcss)
- [TailwindCSS docs](https://tailwindcss.com/docs)
- [FontAwesome icons](https://fontawesome.com)
- [React conditional rendering based on screen size](https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size)
- [Rendering dates from an array](https://dyclassroom.com/javascript-code/create-an-array-of-dates-between-start-date-and-end-date-in-javascript)
- [TailwindCSS Tailblocks Component](https://mertjf.github.io/tailblocks/)
- [React Burger Menu](https://github.com/negomi/react-burger-menu)
