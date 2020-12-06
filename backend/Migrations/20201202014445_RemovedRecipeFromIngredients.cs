using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class RemovedRecipeFromIngredients : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Recipes_RecipeId1",
                table: "Ingredients");

            migrationBuilder.DropIndex(
                name: "IX_Ingredients_RecipeId1",
                table: "Ingredients");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "ed0dc79b-5d32-4af3-b624-926904237491");

            migrationBuilder.DropColumn(
                name: "RecipeId1",
                table: "Ingredients");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "d8c77da8-d469-45b1-9f37-c62e34e878b2", 0, "bbe51222-b700-4f73-8796-4927f86ffb24", "phprox123@gmail.com", false, false, null, "TestAdminWarren", null, null, null, null, false, "68a40863-f1c1-4200-86ae-4dc89f398d96", false, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8c77da8-d469-45b1-9f37-c62e34e878b2");

            migrationBuilder.AddColumn<int>(
                name: "RecipeId1",
                table: "Ingredients",
                type: "int(10)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "ed0dc79b-5d32-4af3-b624-926904237491", 0, "4fcaea93-eaf1-4cbc-9352-56ad3d31c3f5", "phprox123@gmail.com", false, false, null, "TestAdminWarren", null, null, null, null, false, "c771bed2-90a5-43dd-ac9e-cec405b6b571", false, null });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_RecipeId1",
                table: "Ingredients",
                column: "RecipeId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_Recipes_RecipeId1",
                table: "Ingredients",
                column: "RecipeId1",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
