# Capstone Project - Yummy by PuddleJumpers

## Introduction
- Your task is to solve a problem with a full-stack web application. The problem that you solve will be your choice, but you must define the problem and demonstrate how your application solves the problem in your documentation and your presentation. You can choose your own tech stack, but you must be able to complete the project so be sure to choose a stack you are familiar with. The reason we have chosen to give such a simple assignment definition is to allow you to be creative and also to give you enough time to focus on the details. This is your final capstone assignment and should represent a professional level of quality. It is your primary portfolio piece from this program.

## Project Documents and Reports
- [Project Trello Board](https://trello.com/b/zUabU848/capstone-puddlejumpers)
- [Project Wireframes (Figma)](https://www.figma.com/file/iGsjkmFikAAyslTBFRk2Bs/Capstone%3A-Wireframes?node-id=0%3A1)
- [Project ERD (Draw.io)](./planning/YummyERD.png) 
- [Project Plan](./planning/Capstone_Project_Plan_Puddlejumpers.txt)
- [Installation Manual](https://docs.google.com/document/d/11WyFJVwn7B7u0SpiF514_CU9FgUNjTHigksCUpzdW30/edit?usp=sharing)
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
- Password email flow - to send password reset link to user's email
- Delete a user profile

## Installation Instructions
### Requirements
This is a Windows OS (Windows 10) application.
- DOTNET Core 3.1 
    - Install from: https://dotnet.microsoft.com/download/dotnet-core/3.1
- Node.js LTS 
    - Install from: https://nodejs.org/en/
- XAMPP
    - Install from: https://www.apachefriends.org/download.html

### Installation Instructions
1. Turn on XAMPP server
2. Create env file
    - Open the “.env.sample” file located in the project root folder
    - Update the server information to match your local setup
    - Save and rename the sample file to “.env”
3. Open up command prompt, then:
    - Navigate to project folder
    - Run the command: “npm run install:all”
    - Run the command: “npm run db:setup”
    - Run the command: “npm run start:all”
4. Open a browser and navigate to “https://localhost:5001/”

### If the website will not load due to a security error, try:
1. Close your browser
2. In your command prompt go into the backend folder:
    - Run the command: “cd ./backend”
    - Run the command” “run dotnet dev-certs https --clean” (if there is a prompt, click ’yes’)
    - Run the command” “run dotnet dev-certs https --trust” (if there is a prompt, click ’yes’)
3. Re-open your browser and try navigating to “https://localhost:5001/”


## Test Cases & Testing Instructions
### Prerequisites
- Yummy currently only supports Windows OS
- Internet access 
- A web browser such as Google Chrome, Firefox, or Microsoft Edge
- Database/server must be running
- Must have DOTNET Core 3 installed
- Must have node.js installed

## Data Supports
### User Management
#### Email
- Rules: Cannot be empty. Must have a @ symbol and a . symbol, in that order.
- Valid example: “test@example.com”, “username@yahoo.com”
- Invalid example: “”, “-8”, -6, “text@test”, “Test1234”

#### Name 
- Rules: String, up to 50 chars
- Valid example: “TestUser”, “Test”, “User123”
- Invalid example: “ThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslong”, “”, 0

#### Password
- Rules: Must have at least one non alphanumeric character, must have at least one digit (‘0’-’9’), must have at least one uppercase (‘A’-’Z’).
- Valid example: “Demo1!”, “TestUser1$2$3$”
- Invalid example: “password”, “test1”, “Test?User”

### Recipe Management
#### Recipe Name
- Rules: Cannot be empty, must be between 3 and 50 chars
- Valid example: 
- Invalid example:

#### Photo
- Rules: Cannot be null
- Valid example: 
- Invalid example:

#### Ingredients 
- Rules: Cannot be empty, every meal must have at least 1 ingredient
- Valid example: “olive oil”, “chicken breast”
- Invalid example: -6, “”

#### Ingredient Name
- Rules:  Field cannot be empty, string, must be between 3 and 50 chars
- Valid example: “Chicken breast”, “Olive oil”
- Invalid example: “a”, “”

#### Ingredient Quantity
- Rules: Decimal, must be between 0 and 100,000
- Valid example: 4, 300
- Invalid example: “hello”

#### Unit of Measurement
- Rules: Cannot be empty
- Valid example: “cup”, “lb”
- Invalid example: 76, “”

#### Instructions
- Rules: Long text/string, must be between 10 and 60,000
- Valid example: “Place tortillas on a work surface."
- Invalid example: “hello”

#### Prep. time
- Rules: Decimal, must be between 1 and 6,000
- Valid example: 5, 3.25
- Invalid example: “hello”

#### Cook Time
- Rules: Decimal
- Valid example: 20, 8.5
- Invalid example: “hello”

#### Servings
- Rules: Integer, must be between 1 and 1,000
- Valid example: 4
- Invalid example: “5.657”, “hello”

#### Carbohydrates
- Rules: Integer, must be between 0 and 100,000
- Valid example: 6
- Invalid example: “hello”, -7

#### Fats
- Rules: Integer, must be between 0 and 100,000
- Valid example: 3
- Invalid example: “hello”, -7

#### Proteins
- Rules: Integer, must be between 0 and 100,000
- Valid example: 45
- Invalid example: “hello”, -7

#### Recipe Category
- Rules: Recipe Category ID cannot be 0 (every recipe must have a category)
- Valid example: “chicken”, “beef”
- Invalid example: 34, -9

#### Notes
- Rules: String, must be between 10 and 5,000
- Valid example: "* Chipotle chiles in adobo sauce are smoked jalapeños packed in a flavorful sauce."
- Invalid example: “hello”, -75

## Behavioural/User Scenarios
### #1 User sign-in (login)
#### Test Case: Valid email and valid password

- Pre-Condition: User knows their email address and password
- Test Steps: Enter email. Enter password. Click Submit.
- Test Data: <Valid email>, <Valid password>
- Expected Result: Successful login
- Actual Result: Successful login (Directs user back to the page where they were asked to sign in)

#### Test Case: Valid email and missing password

- Pre-Condition: User knows their email address but doesn’t enter a password.
- Test Steps: Enter email. Click Submit.
- Test Data: <Valid email>
- Expected Result: A prompt “Please fill out this field.”
- Actual Result: A prompt “Please fill out this field.”

#### Test Case: Missing email and valid password

- Pre-Condition: User doesn’t enter their email address. They enter their password.
- Test Steps: Enter password. Click Submit.
- Test Data: <Valid password>
- Expected Result: A prompt “Please fill out this field.”
- Actual Result: A prompt “Please fill out this field.”

#### Test Case: Valid email and invalid password

- Pre-Condition: User knows their email address but enters incorrect password.
- Test Steps: Enter email. Enter password. Click Submit.
- Test Data: <Valid email>, <Invalid password>
- Expected Result: A non-specific error message “Unauthorized”.
- Actual Result: A non-specific error message “Unauthorized”.

#### Test Case: Invalid email and valid password

- Pre-Condition: User enters incorrect email and valid password.
- Test Steps: Enter email. Enter password. Click Submit.
- Test Data: <Invalid email>, <Valid password>
- Expected Result: A non-specific error message “Unauthorized”.
- Actual Result: A non-specific error message “Unauthorized”.

#### Test Case: Invalid email and invalid password

- Pre-Condition: User enters incorrect email and password.
- Test Steps: Enter email. Enter password. Click Submit.
- Test Data: <Invalid email>, <Invalid password>
- Expected Result: A non-specific error message “Unauthorized”.
- Actual Result: A non-specific error message “Unauthorized”.

### #2 New user signup
#### Test Case: Successful user creation

- Pre-Condition: User enters all valid information and new account gets created
- Test Steps: Enter email. Enter name. Enter password. Re-enter password. Click Submit.
- Test Data: <Valid email>, <Valid name>, <Valid password>, <Valid password>
- Expected Result: A message “User created successfully!”.
- Actual Result:  An error message “User created successfully!”.

#### Test Case: Password and re-entered password do not match

- Pre-Condition: User enters two different passwords instead of the same one twice
- Test Steps: Enter email. Enter name. Enter password. Re-enter password. Click Submit.
- Test Data: <Valid email>, <Valid name>, <Valid password>, <Valid password 2>
- Expected Result: An error message “Passwords do not match”.
- Actual Result:  An error message “Passwords do not match”.


#### Test Case: Password does not meet requirements

- Pre-Condition: User enters a password such as “password”
- Test Steps: Enter email. Enter name. Enter password. Re-enter password. Click Submit.
- Test Data: <Valid email>, <Valid name>, <Invalid password>, <Invalid password>
- Expected Result: An error message “User creation failed! Please check user details and try again. Passwords must have at least one non alphanumeric character. Passwords must have at least one digit (‘0’-’9’). Passwords must have at least one uppercase (‘A’-’Z’).”
- Actual Result: “User creation failed! Please check user details and try again. Passwords must have at least one non alphanumeric character. Passwords must have at least one digit (‘0’-’9’). Passwords must have at least one uppercase (‘A’-’Z’).”

### #3 Add New Recipe
#### Test Scenario: User wants to add a new recipe (successful)

- Pre-Condition: User is logged in.
- Test Steps: Click on the menu button. Click on ‘Add a Recipe’. Enter all required information. Click ‘Submit’.
- Test Data: <valid recipe name><valid photo><valid ingredients><valid instructions><valid prep time><valid cook time><valid servings><valid carbohydrates><valid fats><valid proteins><valid recipe category><valid notes>
- Expected Result: 
- Actual Result

#### Test Scenario: User wants to add a new recipe (not successful - field missing/incorrect data)

- Pre-Condition: User is logged in.
- Test Steps: Click on the menu button. Click on ‘Add a Recipe’. Enter all required information. Click ‘Submit’.
- Test Data: <valid recipe name><valid photo><valid ingredients><valid instructions><valid prep time><valid cook time><valid servings><valid carbohydrates><valid fats><valid proteins><valid recipe category><valid notes>
- Expected Result: 
- Actual Result

#### Test Scenario: User wants to add a new recipe (not successful - duplicate recipe name)

- Pre-Condition: User is logged in.
- Test Steps: Click on the menu button. Click on ‘Add a Recipe’. Enter all required information. Click ‘Submit’.
- Test Data: <valid recipe name><valid photo><valid ingredients><valid instructions><valid prep time><valid cook time><valid servings><valid carbohydrates><valid fats><valid proteins><valid recipe category><valid notes>
- Expected Result: 
- Actual Result

### #4 Create new plan
#### Test Scenario: User wants to create a new plan (successful)

- Pre-Condition: User is logged in.
- Test Steps: Click on the menu button. Click on ‘Dashboard’. Drag a recipe to the plan and drop into a meal slot..
- Test Data: <recipe information><date information>
- Expected Result: Recipe shows in appropriate slot. Recipe also shows on the recipe list so the user can use it on another day. When the user logs out and back in, data persists.
- Actual Result: Recipe shows in appropriate slot. Recipe also shows on the recipe list so the user can use it on another day. When the user logs out and back in, data persists.

### #5 Delete recipe
#### Test Scenario: User wants to delete a recipe (successful)

- Pre-Condition: User is logged in.
- Test Steps: 
- Test Data: 
- Expected Result:
- Actual Result:




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
