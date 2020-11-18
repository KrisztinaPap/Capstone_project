using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class Test : Migration
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
                values: new object[] { -1, new DateTime(2020, 11, 18, 0, 0, 0, 0, DateTimeKind.Local), "-1" });

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
                    { "Cup", "Cup" }
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
                    { -1, 860, 100, -1, new DateTime(2020, 11, 18, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 18, 0, 0, 0, 0, DateTimeKind.Local), 30, null, @"* Cook Chicken
                * Cook Potatoes
                * Smother in Hot Sauce", "Chicken and Potatoes with Hot Sauce", null, 35m, 70, 2, "[\"Spicy\"]" },
                    { -2, 770, 115, -2, new DateTime(2020, 11, 18, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 18, 0, 0, 0, 0, DateTimeKind.Local), 10, null, @"* Cook Chicken
                * Cook Potatoes
                * Smother in Hot Sauce", "Steak and Sweet Potatoes", null, 25m, 70, 2, "[\"BBQ\"]" }
                });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Name", "Quantity", "RecipeId", "UOMId" },
                values: new object[,]
                {
                    { -1, "Chicken Breast", 3m, -1, "lb" },
                    { -2, "Hot Sauce", 1m, -1, "cup" },
                    { -3, "Poatato", 4m, -1, "ea" },
                    { -4, "Striploin", 2m, -2, "ea" },
                    { -5, "Sweet Potato", 3m, -2, "ea" },
                    { -6, "Barbeque Sauce", 4m, -2, "tbsp" }
                });

            migrationBuilder.InsertData(
                table: "MealsRecipes",
                columns: new[] { "MealId", "RecipeId" },
                values: new object[,]
                {
                    { -1, -1 },
                    { -2, -2 }
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
