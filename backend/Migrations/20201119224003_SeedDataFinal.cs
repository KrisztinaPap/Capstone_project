using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class SeedDataFinal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MealTime",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(10)", nullable: false),
                    Name = table.Column<string>(type: "varchar(30)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealTime", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Plan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(type: "varchar(50)", nullable: false),
                    Day = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plan", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RecipeCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UOM",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(20)", nullable: false),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UOM", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    Password = table.Column<string>(type: "varchar(50)", nullable: false),
                    PasswordSalt = table.Column<string>(type: "varchar(50)", nullable: false),
                    Email = table.Column<string>(type: "varchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PlanId = table.Column<int>(type: "int(10)", nullable: false),
                    MealTimeId = table.Column<string>(type: "varchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Meals_MealTime_MealTimeId",
                        column: x => x.MealTimeId,
                        principalTable: "MealTime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Meals_Plan_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CategoryId = table.Column<int>(type: "int(10)", nullable: false),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    Fat = table.Column<int>(type: "int(10)", nullable: false),
                    Protein = table.Column<int>(type: "int(10)", nullable: false),
                    Carbohydrates = table.Column<int>(type: "int(10)", nullable: false),
                    Calories = table.Column<int>(type: "int(10)", nullable: false),
                    Instructions = table.Column<string>(type: "longtext", nullable: false),
                    Tags = table.Column<string>(type: "json", nullable: true),
                    Image = table.Column<string>(type: "varchar(100)", nullable: true),
                    DateModified = table.Column<DateTime>(type: "date", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "date", nullable: false),
                    PrepTime = table.Column<decimal>(type: "decimal(10, 3)", nullable: false),
                    Servings = table.Column<int>(type: "int(10)", nullable: false),
                    Notes = table.Column<string>(type: "varchar(500)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recipes_RecipeCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "RecipeCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RecipeId = table.Column<int>(type: "int(10)", nullable: false),
                    UOMId = table.Column<string>(type: "varchar(30)", nullable: false),
                    Name = table.Column<string>(type: "varchar(50)", nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(10, 3)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ingredients_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ingredients_UOM_UOMId",
                        column: x => x.UOMId,
                        principalTable: "UOM",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MealsRecipes",
                columns: table => new
                {
                    MealId = table.Column<int>(type: "int(10)", nullable: false),
                    RecipeId = table.Column<int>(type: "int(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealsRecipes", x => new { x.MealId, x.RecipeId });
                    table.ForeignKey(
                        name: "FK_MealsRecipes_Meals_MealId",
                        column: x => x.MealId,
                        principalTable: "Meals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MealsRecipes_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "MealTime",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { "-1", "Breakfast" },
                    { "-2", "Lunch" },
                    { "-3", "Dinner" }
                });

            migrationBuilder.InsertData(
                table: "Plan",
                columns: new[] { "Id", "Day", "UserId" },
                values: new object[] { -1, new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), "-1" });

            migrationBuilder.InsertData(
                table: "RecipeCategories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { -1, "Chicken" },
                    { -2, "Beef" },
                    { -3, "Fish" },
                    { -4, "Vegetarian" },
                    { -5, "Vegan" }
                });

            migrationBuilder.InsertData(
                table: "UOM",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { "kg", "Kilogram" },
                    { "lb", "Pound" },
                    { "tbsp", "Tablespoon" },
                    { "tsp", "Teaspoon" },
                    { "g", "Gram" },
                    { "L", "Liter" },
                    { "ml", "Milliliter" },
                    { "oz", "Ounce" },
                    { "ea", "Each" },
                    { "cup", "Cup" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "Password", "PasswordSalt" },
                values: new object[] { -1, "phprox123@gmail.com", "TestAdminWarren", "$uper$ecurePHPa$$w0rd", "$alt33" });

            migrationBuilder.InsertData(
                table: "Meals",
                columns: new[] { "Id", "MealTimeId", "PlanId" },
                values: new object[,]
                {
                    { -1, "-2", -1 },
                    { -2, "-3", -1 }
                });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "Calories", "Carbohydrates", "CategoryId", "DateCreated", "DateModified", "Fat", "Image", "Instructions", "Name", "Notes", "PrepTime", "Protein", "Servings", "Tags" },
                values: new object[,]
                {
                    { -1, 860, 100, -1, new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), 30, null, @"* Cook Chicken
                * Cook Potatoes
                * Smother in Hot Sauce", "Chicken and Potatoes with Hot Sauce", "* Marinate Chicken for at least 12 hours for maximum flavor", 35m, 70, 2, "[\"Spicy\"]" },
                    { -3, 222, 10, -1, new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), 11, null, @"* 1. Place the olive oil, garlic, chilies, onion, and ginger in a blender and purée until smooth.
                * 2. Heat ghee in a large dutch oven over medium-high. Add the onion purée and cook until the mixture darkens slightly and softens, about 15 minutes.
                * 3. Add the tomato paste, turmeric, chili powder, garam masala, coriander, and cumin and cook for 5 minutes, or until dark and sticky.
                * 4. Add in 1 1/2 cups water. Using a wooden spoon, scrape up any browned bits at the bottom of the pan.
                * 5. Stir in the tomato puree and fenugreek leaves and increase the heat to high. Bring to a boil, then reduce the heat to maintain a simmer. Cover and cook, stirring occasionally, until thick, about 1 hour. Add the chicken and cook until the chicken is cooked through, about 15 minutes more.
                * 6. Add the cream and butter and stir to combine. Season with salt and serve garnished with fresh cilantro with steamed Jasmine rice.", "Butter Chicken", "* Delicious!", 65m, 20, 8, "[\"Chicken, Dinner, Easy\"]" },
                    { -5, 148, 6, -1, new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), 3, null, @"* 1. Preheat grill or broiler.
                * 2. Whisk together orange-juice concentrate, chipotle pepper, vinegar, molasses and mustard in a small bowl.
                * 3. Lightly oil the grill or broiler rack (see Tip).
                * 4. Season chicken with salt and grill or broil for 2 minutes.
                * 5. Turn, brush with the glaze and cook for 4 minutes, brushing occasionally with glaze.
                * 6. Turn again, brush with the glaze, and cook until the center is no longer pink, 1 to 2 minutes longer.", "Chipotle and Orange grilled Chicken", @"* Chipotle chiles in adobo sauce are smoked jalapeños packed in a flavorful sauce.
                * Look for the small cans with the Mexican foods in large supermarkets.
                * Once opened, they'll keep up to 2 weeks in the refrigerator or 6 months in the freezer.
                * Tip: To oil a grill rack: Oil a folded paper towel, hold it with tongs and rub it over the rack. (Do not use cooking spray on a hot grill.)
                * When grilling delicate foods like tofu and fish, it is helpful to spray the food with cooking spray.", 45m, 23, 4, "[\"Low calorie, Low fat, Low Sodium\"]" },
                    { -2, 770, 115, -2, new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), 10, null, @"* Cook Steak on BBQ
                * Cook Potatoes to personal preference
                * Serve and Enjoy!", "Steak and Sweet Potatoes", @"* Marinate Steak for at least 12 hours for maximum flavor
                * Can be cooked on the stovetop but is better when BBQ'd
                * Potatoes can be diced, sliced, or baked. Personal preference.", 25m, 70, 2, "[\"BBQ\"]" },
                    { -4, 375, 45, -4, new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Local), 16, null, @"* 1. Combine beans, cheese and 1/4 cup salsa in a medium bowl.
                * 2. Place tortillas on a work surface.
                * 3. Spread 1/2 cup filling on half of each tortilla.
                * 4. Fold tortillas in half, pressing gently to flatten.
                * 5. Heat 1 teaspoon oil in a large nonstick skillet over medium heat.
                * 6. Add 2 quesadillas and cook, turning once, until golden on both sides, 2 to 4 minutes total.
                * 7. Transfer to a cutting board and tent with foil to keep warm. Repeat with the remaining 1 teaspoon oil and quesadillas.
                * 8. Serve the quesadillas with avocado and the remaining salsa.", "Black Bean Quesadillas", "Tip: Look for prepared fresh salsa in the supermarket refrigerator section near other dips and spreads.", 25m, 13, 4, "[\"Low calorie, High fiber, Vegetarian\"]" }
                });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Name", "Quantity", "RecipeId", "UOMId" },
                values: new object[,]
                {
                    { -1, "Chicken Breast", 3m, -1, "lb" },
                    { -25, "Tortillas", 4m, -4, "ea" },
                    { -24, "Salsa", 0.5m, -4, "cup" },
                    { -23, "Shredded Monterey Jack Cheese", 0.5m, -4, "cup" },
                    { -22, "Black Beans", 15m, -4, "oz" },
                    { -34, "Salt", 1m, -5, "tsp" },
                    { -33, "Chicken Breast", 1m, -5, "lb" },
                    { -32, "Dijon mustard", 1m, -5, "tsp" },
                    { -31, "Unsulfured Molasses", 2m, -5, "tsp" },
                    { -30, "Balsamic Vinegar", 1m, -5, "tbsp" },
                    { -29, "Finely chopped chipotle peppers(See notes)", 1m, -5, "tbsp" },
                    { -28, "Orange juice concentrate", 2m, -5, "tbsp" },
                    { -21, "Cooked Jasmine Rice", 5m, -3, "cup" },
                    { -20, "Unsalted butter", 8m, -3, "tbsp" },
                    { -26, "Canola oil", 2m, -4, "tsp" },
                    { -19, "Heavy Cream", 2m, -3, "cup" },
                    { -17, "Tomato puree", 3.5m, -3, "cup" },
                    { -2, "Hot Sauce", 1m, -1, "cup" },
                    { -3, "Poatato", 4m, -1, "ea" },
                    { -7, "Olive Oil", 6m, -3, "tbsp" },
                    { -8, "Garlic cloves", 5m, -3, "ea" },
                    { -18, "Chicken Breast", 4m, -3, "ea" },
                    { -10, "ghee", 0.5m, -3, "cup" },
                    { -9, "Yellow onion", 2m, -3, "ea" },
                    { -12, "Tumeric", 3m, -3, "tbsp" },
                    { -13, "Chili powder", 2m, -3, "tbsp" },
                    { -14, "Garam masala", 2m, -3, "tbsp" },
                    { -15, "Ground coriander", 2m, -3, "tbsp" },
                    { -16, "Ground cumin", 2m, -3, "tbsp" },
                    { -11, "Tomato paste", 3m, -3, "tbsp" },
                    { -27, "Avocado, diced", 1m, -4, "ea" }
                });

            migrationBuilder.InsertData(
                table: "MealsRecipes",
                columns: new[] { "MealId", "RecipeId" },
                values: new object[,]
                {
                    { -2, -2 },
                    { -1, -1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_RecipeId",
                table: "Ingredients",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_UOMId",
                table: "Ingredients",
                column: "UOMId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_MealTimeId",
                table: "Meals",
                column: "MealTimeId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_PlanId",
                table: "Meals",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_MealsRecipes_RecipeId",
                table: "MealsRecipes",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_CategoryId",
                table: "Recipes",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "MealsRecipes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "UOM");

            migrationBuilder.DropTable(
                name: "Meals");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "MealTime");

            migrationBuilder.DropTable(
                name: "Plan");

            migrationBuilder.DropTable(
                name: "RecipeCategories");
        }
    }
}
