# Yummy Testing Manual
Team Puddlejumpers: Aaron Barthel, Lindsey Graham, Kenji Au, Tosin Olaniyi, Krisztina Pap
________________

## Prerequisites
* Yummy currently only supports Windows OS
* Internet access 
* A web browser such as Google Chrome, Firefox, or Microsoft Edge
* Database/server must be running
* Must have DOTNET Core 3 installed
* Must have node.js installed


## DEMO USER LOGIN INFORMATION:
Email: demo@example.com
Password: Demo1!


## Data Supports
### User Management
#### Email
Rules: Cannot be empty. Must have a @ symbol and a . symbol, in that order. Max 320 chars.
Valid example: “test@example.com”, “username@yahoo.com”
Invalid example: “”, “-8”, -6, “text@test”, “Test1234”


#### Name 
Rules: Cannot be empty. String, up to 50 chars
Valid example: “TestUser”, “Test”, “User123”
Invalid example: “ThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslongThisisastringthatisdefinitelylongerthanfiftycharacterslong”, “”, 0


#### Password
Rules: Cannot be empty. Must have at least one non alphanumeric character, must have at least one digit (‘0’-’9’), must have at least one uppercase (‘A’-’Z’), must have at least one symbol.
Valid example: “Demo1!”, “TestUser1$2$3$”
Invalid example: “password”, “test1”, “Test?User”


### Recipe Management
#### Recipe Name
Rules: Cannot be empty, must be between 3 and 50 chars
Valid example: “Chicken and potato soup”
Invalid example: “”


#### Ingredients 
Rules: Cannot be empty, every meal must have at least 1 ingredient
Valid example: “olive oil”, “chicken breast”
Invalid example: -6, “”


#### Ingredient Name
Rules:  Field cannot be empty, string, must be between 3 and 50 chars
Valid example: “Chicken breast”, “Olive oil”
Invalid example: “a”, “”


#### Ingredient Quantity
Rules: Decimal, must be between 0 and 100,000
Valid example: 4, 300
Invalid example: “hello”, -75


#### Instructions
Rules: Long text/string, must be between 10 and 60,000
Valid example: “Place tortillas on a work surface."
Invalid example: “hello”, -6


#### Prep. time
Rules: Decimal, must be between 1 and 6,000
Valid example: 5, 3.25
Invalid example: “hello”, -54


#### Cook time
Rules: Decimal
Valid example: 20, 8.5
Invalid example: “hello”


#### Servings
Rules: Integer, must be between 1 and 1,000
Valid example: 4, 56
Invalid example: “5.657”, “hello”


#### Carbohydrates
Rules: Integer, must be between 0 and 100,000
Valid example: 6, 888
Invalid example: “hello”, -7


#### Fats
Rules: Integer, must be between 0 and 100,000
Valid example: 3, 4567
Invalid example: “hello”, -7


#### Proteins
Rules: Integer, must be between 0 and 100,000
Valid example: 45, 3245
Invalid example: “hello”, -7


#### Recipe Category
Rules: Every recipe must have a category selected from dropdown.


#### Notes
Rules: String, must be between 10 and 5,000
Valid example: "* Chipotle chiles in adobo sauce are smoked jalapeños packed in a flavorful sauce."
Invalid example: “hello”, -75


### Behavioural/User Scenarios
#### 1 User sign-in (login)
##### Test Case: Valid email and valid password
Pre-Condition: User knows their email address and password
Test Steps: Enter email. Enter password. Click Submit.
Test Data: <Valid email>, <Valid password>
Expected Result: Successful login
Actual Result: Successful login (Directs user back to the page where they were asked to sign in or to the Meal Plan if they came from the login page.)


##### Test Case: Valid email and missing password
Pre-Condition: User knows their email address but doesn’t enter a password.
Test Steps: Enter email. Click Submit.
Test Data: <Valid email>
Expected Result: A prompt “Please fill out this field.”
Actual Result: A prompt “Please fill out this field.”
  

________________


##### Test Case: Missing email and valid password
Pre-Condition: User doesn’t enter their email address. They enter their password.
Test Steps: Enter password. Click Submit.
Test Data: <Valid password>
Expected Result: A prompt “Please fill out this field.”
Actual Result: A prompt “Please fill out this field.”
  

##### Test Case: Valid email and invalid password
Pre-Condition: User knows their email address but enters incorrect password.
Test Steps: Enter email. Enter password. Click Submit.
Test Data: <Valid email>, <Invalid password>
Expected Result: A non-specific error message “Unauthorized”.
Actual Result: A non-specific error message “Unauthorized”.
  

________________


##### Test Case: Invalid email and valid password
Pre-Condition: User enters incorrect email and valid password.
Test Steps: Enter email. Enter password. Click Submit.
Test Data: <Invalid email>, <Valid password>
Expected Result: A non-specific error message “Unauthorized”.
Actual Result: A non-specific error message “Unauthorized”.
  

##### Test Case: Invalid email and invalid password
Pre-Condition: User enters incorrect email and password.
Test Steps: Enter email. Enter password. Click Submit.
Test Data: <Invalid email>, <Invalid password>
Expected Result: A non-specific error message “Unauthorized”.
Actual Result: A non-specific error message “Unauthorized”.
  

________________
#### 2 New user signup
##### Test Case: Successful user creation
Pre-Condition: User enters all valid information and new account gets created
Test Steps: Enter email. Enter name. Enter password. Re-enter password. Click Submit.
Test Data: <Valid email>, <Valid name>, <Valid password>, <Valid password>
Expected Result: A message “User created successfully!”. User is redirected to the Login page.
Actual Result:  A message “User created successfully!”. User is redirected to Login page


##### Test Case: Password and re-entered password do not match
Pre-Condition: User enters two different passwords instead of the same one twice
Test Steps: Enter email. Enter name. Enter password. Re-enter password. Click Submit.
Test Data: <Valid email>, <Valid name>, <Valid password>, <Valid password 2>
Expected Result: An error message “Passwords do not match”.
Actual Result:  An error message “Passwords do not match”.


##### Test Case: Password does not meet requirements
Pre-Condition: User enters a password such as “password”
Test Steps: Enter email. Enter name. Enter password. Re-enter password. Click Submit.
Test Data: <Valid email>, <Valid name>, <Invalid password>, <Invalid password>
Expected Result: An error message “User creation failed! Please check user details and try again. Passwords must have at least one non alphanumeric character. Passwords must have at least one digit (‘0’-’9’). Passwords must have at least one uppercase (‘A’-’Z’).”
Actual Result: “User creation failed! Please check user details and try again. Passwords must have at least one non alphanumeric character. Passwords must have at least one digit (‘0’-’9’). Passwords must have at least one uppercase (‘A’-’Z’).”
  

#### 3 Add New Recipe
#####  Scenario: User wants to add a new recipe (successful)
Pre-Condition: User is logged in.
Test Steps: Click on the menu button. Click on ‘Add a Recipe’. Enter all required information. Click ‘Submit’.
Test Data: <valid recipe name><valid photo><valid ingredients><valid instructions><valid prep time><valid cook time><valid servings><valid carbohydrates><valid fats><valid proteins><valid recipe category><valid notes>
Expected Result: Redirects user to the created recipe’s page.
Actual Result: Redirects user to the created recipe’s page.


________________


##### Test Scenario: User wants to add a new recipe (not successful - required field missing)
Pre-Condition: User is logged in.
Test Steps: Click on the menu button. Click on ‘Add a Recipe’. Click ‘Submit’.
Expected Result: Specific error messages.
Actual Result: Specific error messages.


#### 4 Edit a recipe
##### Test Scenario: User wants to edit one of their recipes (successful)
Pre-Condition: User is logged in.
Test Steps: Navigate to Recipes page and click on the recipe you want to edit. Click on the Edit recipe button at the bottom of the page. 
Expected Result: Success message. Recipe is reloaded with new data.
Actual Result: Success message. Recipe is reloaded with new data.


#### 5 Create new plan
##### Test Scenario: User wants to create a new plan (successful)
Pre-Condition: User is logged in.
Test Steps: Click on the menu button. Click on ‘Dashboard’. Drag a recipe to the plan and drop into a meal slot.
Expected Result: Recipe shows in appropriate slot. Recipe also shows on the recipe list so the user can use it on another day. When the user logs out and back in, data persists.
Actual Result: Recipe shows in appropriate slot. Recipe also shows on the recipe list so the user can use it on another day. When the user logs out and back in, data persists.


#### 6 Delete recipe
##### Test Scenario: User wants to delete a recipe (successful)
Pre-Condition: User is logged in.
Test Steps: Navigate to Recipes page. Choose a recipe to delete by clicking on the trash can icon on the right. Confirm that you want to delete the recipe by clicking on the red ‘yes’ button.
Expected Result: Reloads recipe list without deleted recipe.
Actual Result: Reloads recipe list without deleted recipe.


Last Updated: December 8, 2020
