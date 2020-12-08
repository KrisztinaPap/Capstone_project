# Yummy Installation Manual
Team Puddlejumpers: Aaron Barthel, Lindsey Graham, Kenji Au, Tosin Olaniyi, Krisztina Pap
________________

## Requirements
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

## Instructions
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


Last Updated: December 8, 2020