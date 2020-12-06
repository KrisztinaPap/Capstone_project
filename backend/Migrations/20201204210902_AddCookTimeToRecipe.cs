using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class AddCookTimeToRecipe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b71fc1ce-8af7-4994-b200-894b1f88c432");

            migrationBuilder.AddColumn<decimal>(
                name: "CookTime",
                table: "Recipes",
                type: "decimal(10, 3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "E3E28BD3-594A-455F-9ACA-90758B48F376", 0, "4060a74a-e305-4f50-81b3-928724b58488", "phprox123@gmail.com", false, false, null, "TestAdminWarren", null, null, null, null, false, "ab3ccd48-a2b0-45a7-8c59-e8fee98294df", false, null });

            migrationBuilder.UpdateData(
                table: "Plan",
                keyColumn: "Id",
                keyValue: -1,
                column: "Day",
                value: new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "CookTime", "DateCreated", "DateModified", "Image", "Instructions", "Notes" },
                values: new object[] { 15m, new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chipotle-orange-chicken.jpg", @"* 1. Preheat grill or broiler.
* 2. Whisk together orange-juice concentrate, chipotle pepper, vinegar, molasses and mustard in a small bowl.
* 3. Lightly oil the grill or broiler rack (see Tip).
* 4. Season chicken with salt and grill or broil for 2 minutes.
* 5. Turn, brush with the glaze and cook for 4 minutes, brushing occasionally with glaze.
* 6. Turn again, brush with the glaze, and cook until the center is no longer pink, 1 to 2 minutes longer.", @"* Chipotle chiles in adobo sauce are smoked jalapeños packed in a flavorful sauce.
* Look for the small cans with the Mexican foods in large supermarkets.
* Once opened, they'll keep up to 2 weeks in the refrigerator or 6 months in the freezer.
* Tip: To oil a grill rack: Oil a folded paper towel, hold it with tongs and rub it over the rack. (Do not use cooking spray on a hot grill.)
* When grilling delicate foods like tofu and fish, it is helpful to spray the food with cooking spray." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                columns: new[] { "CookTime", "DateCreated", "DateModified", "Image", "Instructions" },
                values: new object[] { 5m, new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3 - 594A - 455F - 9ACA - 90758B48F376\\blackbean - quesadilla.jpg", @"* 1. Combine beans, cheese and 1/4 cup salsa in a medium bowl.
* 2. Place tortillas on a work surface.
* 3. Spread 1/2 cup filling on half of each tortilla.
* 4. Fold tortillas in half, pressing gently to flatten.
* 5. Heat 1 teaspoon oil in a large nonstick skillet over medium heat.
* 6. Add 2 quesadillas and cook, turning once, until golden on both sides, 2 to 4 minutes total.
* 7. Transfer to a cutting board and tent with foil to keep warm. Repeat with the remaining 1 teaspoon oil and quesadillas.
* 8. Serve the quesadillas with avocado and the remaining salsa." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                columns: new[] { "CookTime", "DateCreated", "DateModified", "Image", "Instructions" },
                values: new object[] { 40m, new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\butter-chicken.jpg", @"* 1. Place the olive oil, garlic, chilies, onion, and ginger in a blender and purée until smooth.
* 2. Heat ghee in a large dutch oven over medium-high. Add the onion purée and cook until the mixture darkens slightly and softens, about 15 minutes.
* 3. Add the tomato paste, turmeric, chili powder, garam masala, coriander, and cumin and cook for 5 minutes, or until dark and sticky.
* 4. Add in 1 1/2 cups water. Using a wooden spoon, scrape up any browned bits at the bottom of the pan.
* 5. Stir in the tomato puree and fenugreek leaves and increase the heat to high. Bring to a boil, then reduce the heat to maintain a simmer. Cover and cook, stirring occasionally, until thick, about 1 hour. Add the chicken and cook until the chicken is cooked through, about 15 minutes more.
* 6. Add the cream and butter and stir to combine. Season with salt and serve garnished with fresh cilantro with steamed Jasmine rice." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "CookTime", "DateCreated", "DateModified", "Image", "Instructions", "Notes" },
                values: new object[] { 20m, new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\steak-sweet-potato.jpeg", @"* Cook Steak on BBQ
* Cook Potatoes to personal preference
* Serve and Enjoy!", @"* Marinate Steak for at least 12 hours for maximum flavor
* Can be cooked on the stovetop but is better when BBQ'd
* Potatoes can be diced, sliced, or baked. Personal preference." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "CookTime", "DateCreated", "DateModified", "Image", "Instructions" },
                values: new object[] { 30m, new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chicken-potato-hotsauce.jpg", @"* Cook Chicken
* Cook Potatoes
* Smother in Hot Sauce" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "E3E28BD3-594A-455F-9ACA-90758B48F376");

            migrationBuilder.DropColumn(
                name: "CookTime",
                table: "Recipes");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "b71fc1ce-8af7-4994-b200-894b1f88c432", 0, "69daf73e-ff43-4cbe-a5a3-bc2dadd34a4e", "phprox123@gmail.com", false, false, null, "TestAdminWarren", null, null, null, null, false, "f411ded0-8750-4f80-8f5e-5d0fd1d25920", false, null });

            migrationBuilder.UpdateData(
                table: "Plan",
                keyColumn: "Id",
                keyValue: -1,
                column: "Day",
                value: new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "DateCreated", "DateModified", "Image", "Instructions", "Notes" },
                values: new object[] { new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), "", @"* 1. Preheat grill or broiler.
* 2. Whisk together orange-juice concentrate, chipotle pepper, vinegar, molasses and mustard in a small bowl.
* 3. Lightly oil the grill or broiler rack (see Tip).
* 4. Season chicken with salt and grill or broil for 2 minutes.
* 5. Turn, brush with the glaze and cook for 4 minutes, brushing occasionally with glaze.
* 6. Turn again, brush with the glaze, and cook until the center is no longer pink, 1 to 2 minutes longer.", @"* Chipotle chiles in adobo sauce are smoked jalapeños packed in a flavorful sauce.
* Look for the small cans with the Mexican foods in large supermarkets.
* Once opened, they'll keep up to 2 weeks in the refrigerator or 6 months in the freezer.
* Tip: To oil a grill rack: Oil a folded paper towel, hold it with tongs and rub it over the rack. (Do not use cooking spray on a hot grill.)
* When grilling delicate foods like tofu and fish, it is helpful to spray the food with cooking spray." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                columns: new[] { "DateCreated", "DateModified", "Image", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), "", @"* 1. Combine beans, cheese and 1/4 cup salsa in a medium bowl.
* 2. Place tortillas on a work surface.
* 3. Spread 1/2 cup filling on half of each tortilla.
* 4. Fold tortillas in half, pressing gently to flatten.
* 5. Heat 1 teaspoon oil in a large nonstick skillet over medium heat.
* 6. Add 2 quesadillas and cook, turning once, until golden on both sides, 2 to 4 minutes total.
* 7. Transfer to a cutting board and tent with foil to keep warm. Repeat with the remaining 1 teaspoon oil and quesadillas.
* 8. Serve the quesadillas with avocado and the remaining salsa." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                columns: new[] { "DateCreated", "DateModified", "Image", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), "", @"* 1. Place the olive oil, garlic, chilies, onion, and ginger in a blender and purée until smooth.
* 2. Heat ghee in a large dutch oven over medium-high. Add the onion purée and cook until the mixture darkens slightly and softens, about 15 minutes.
* 3. Add the tomato paste, turmeric, chili powder, garam masala, coriander, and cumin and cook for 5 minutes, or until dark and sticky.
* 4. Add in 1 1/2 cups water. Using a wooden spoon, scrape up any browned bits at the bottom of the pan.
* 5. Stir in the tomato puree and fenugreek leaves and increase the heat to high. Bring to a boil, then reduce the heat to maintain a simmer. Cover and cook, stirring occasionally, until thick, about 1 hour. Add the chicken and cook until the chicken is cooked through, about 15 minutes more.
* 6. Add the cream and butter and stir to combine. Season with salt and serve garnished with fresh cilantro with steamed Jasmine rice." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "DateCreated", "DateModified", "Image", "Instructions", "Notes" },
                values: new object[] { new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), "", @"* Cook Steak on BBQ
* Cook Potatoes to personal preference
* Serve and Enjoy!", @"* Marinate Steak for at least 12 hours for maximum flavor
* Can be cooked on the stovetop but is better when BBQ'd
* Potatoes can be diced, sliced, or baked. Personal preference." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "DateCreated", "DateModified", "Image", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), "", @"* Cook Chicken
* Cook Potatoes
* Smother in Hot Sauce" });
        }
    }
}
