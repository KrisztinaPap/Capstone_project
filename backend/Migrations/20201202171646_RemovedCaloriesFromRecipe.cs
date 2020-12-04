using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class RemovedCaloriesFromRecipe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8c77da8-d469-45b1-9f37-c62e34e878b2");

            migrationBuilder.DropColumn(
                name: "Calories",
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
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 2, 0, 0, 0, 0, DateTimeKind.Local) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b71fc1ce-8af7-4994-b200-894b1f88c432");

            migrationBuilder.AddColumn<int>(
                name: "Calories",
                table: "Recipes",
                type: "int(10)",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "d8c77da8-d469-45b1-9f37-c62e34e878b2", 0, "bbe51222-b700-4f73-8796-4927f86ffb24", "phprox123@gmail.com", false, false, null, "TestAdminWarren", null, null, null, null, false, "68a40863-f1c1-4200-86ae-4dc89f398d96", false, null });

            migrationBuilder.UpdateData(
                table: "Plan",
                keyColumn: "Id",
                keyValue: -1,
                column: "Day",
                value: new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "Calories", "DateCreated", "DateModified" },
                values: new object[] { 148, new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                columns: new[] { "Calories", "DateCreated", "DateModified" },
                values: new object[] { 375, new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                columns: new[] { "Calories", "DateCreated", "DateModified" },
                values: new object[] { 222, new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "Calories", "DateCreated", "DateModified" },
                values: new object[] { 770, new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Calories", "DateCreated", "DateModified" },
                values: new object[] { 860, new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Local) });
        }
    }
}
