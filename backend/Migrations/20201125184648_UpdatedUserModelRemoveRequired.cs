using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class UpdatedUserModelRemoveRequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "-1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "ac35f902-2bc0-4e68-88b5-1119afac8d9f", "451a9d92-5912-4e92-ab10-152b0fe3b722" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "AspNetUsers",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordSalt",
                table: "AspNetUsers",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "-1",
                columns: new[] { "ConcurrencyStamp", "Password", "PasswordSalt", "SecurityStamp" },
                values: new object[] { "2a6a8812-c7b7-4c23-b14b-fcd0de4cbe3e", "$uper$ecurePHPa$$w0rd", "$alt33", "83d351d9-59f3-4bd9-a3ad-41108a818a74" });
        }
    }
}
