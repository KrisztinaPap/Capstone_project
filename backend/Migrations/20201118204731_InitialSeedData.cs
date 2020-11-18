using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class InitialSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "Instructions", "Notes" },
                values: new object[] { @"* Cook Steak on BBQ
* Cook Potatoes to personal preference
* Serve and Enjoy!", @"* Marinate Steak for at least 12 hours for maximum flavor
* Can be cooked on the stovetop but is better when BBQ'd
* Potatoes can be diced, sliced, or baked. Personal preference." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                column: "Notes",
                value: "* Marinate Chicken for at least 12 hours for maximum flavor");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "Instructions", "Notes" },
                values: new object[] { @"* Cook Chicken
* Cook Potatoes
* Smother in Hot Sauce", null });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                column: "Notes",
                value: null);
        }
    }
}
