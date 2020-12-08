using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class UserIdFKMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "DateCreated", "DateModified", "Instructions", "Notes" },
                values: new object[] { new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), @"* 1. Preheat grill or broiler.
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
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), @"* 1. Combine beans, cheese and 1/4 cup salsa in a medium bowl.
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
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), @"* 1. Place the olive oil, garlic, chilies, onion, and ginger in a blender and purée until smooth.
* 2. Heat ghee in a large dutch oven over medium-high. Add the onion purée and cook until the mixture darkens slightly and softens, about 15 minutes.
* 3. Add the tomato paste, turmeric, chili powder, garam masala, coriander, and cumin and cook for 5 minutes, or until dark and sticky.
* 4. Add in 1 1/2 cups water. Using a wooden spoon, scrape up any browned bits at the bottom of the pan.
* 5. Stir in the tomato puree and fenugreek leaves and increase the heat to high. Bring to a boil, then reduce the heat to maintain a simmer. Cover and cook, stirring occasionally, until thick, about 1 hour. Add the chicken and cook until the chicken is cooked through, about 15 minutes more.
* 6. Add the cream and butter and stir to combine. Season with salt and serve garnished with fresh cilantro with steamed Jasmine rice." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "DateCreated", "DateModified", "Instructions", "Notes" },
                values: new object[] { new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), @"* Cook Steak on BBQ
* Cook Potatoes to personal preference
* Serve and Enjoy!", @"* Marinate Steak for at least 12 hours for maximum flavor
* Can be cooked on the stovetop but is better when BBQ'd
* Potatoes can be diced, sliced, or baked. Personal preference." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), @"* Cook Chicken
* Cook Potatoes
* Smother in Hot Sauce" });

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_UserId",
                table: "Recipes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Plan_UserId",
                table: "Plan",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plan_AspNetUsers_UserId",
                table: "Plan",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_AspNetUsers_UserId",
                table: "Recipes",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plan_AspNetUsers_UserId",
                table: "Plan");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_AspNetUsers_UserId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_UserId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Plan_UserId",
                table: "Plan");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "DateCreated", "DateModified", "Instructions", "Notes" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), @"* 1. Preheat grill or broiler.
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
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), @"* 1. Combine beans, cheese and 1/4 cup salsa in a medium bowl.
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
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), @"* 1. Place the olive oil, garlic, chilies, onion, and ginger in a blender and purée until smooth.
* 2. Heat ghee in a large dutch oven over medium-high. Add the onion purée and cook until the mixture darkens slightly and softens, about 15 minutes.
* 3. Add the tomato paste, turmeric, chili powder, garam masala, coriander, and cumin and cook for 5 minutes, or until dark and sticky.
* 4. Add in 1 1/2 cups water. Using a wooden spoon, scrape up any browned bits at the bottom of the pan.
* 5. Stir in the tomato puree and fenugreek leaves and increase the heat to high. Bring to a boil, then reduce the heat to maintain a simmer. Cover and cook, stirring occasionally, until thick, about 1 hour. Add the chicken and cook until the chicken is cooked through, about 15 minutes more.
* 6. Add the cream and butter and stir to combine. Season with salt and serve garnished with fresh cilantro with steamed Jasmine rice." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "DateCreated", "DateModified", "Instructions", "Notes" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), @"* Cook Steak on BBQ
* Cook Potatoes to personal preference
* Serve and Enjoy!", @"* Marinate Steak for at least 12 hours for maximum flavor
* Can be cooked on the stovetop but is better when BBQ'd
* Potatoes can be diced, sliced, or baked. Personal preference." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), @"* Cook Chicken
* Cook Potatoes
* Smother in Hot Sauce" });
        }
    }
}
