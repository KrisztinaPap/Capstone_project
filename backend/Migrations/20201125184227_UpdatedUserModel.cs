using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class UpdatedUserModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PasswordSalt",
                table: "AspNetUsers",
                type: "varchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "AspNetUsers",
                type: "varchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "-1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "2a6a8812-c7b7-4c23-b14b-fcd0de4cbe3e", "83d351d9-59f3-4bd9-a3ad-41108a818a74" });

            migrationBuilder.UpdateData(
                table: "Plan",
                keyColumn: "Id",
                keyValue: -1,
                column: "Day",
                value: new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 25, 0, 0, 0, 0, DateTimeKind.Local) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PasswordSalt",
                table: "AspNetUsers",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "AspNetUsers",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "-1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "c98f87f8-c0c9-404d-966f-2a1a84e63407", "3cb8461a-54e5-4419-af24-3fbc7013e485" });

            migrationBuilder.UpdateData(
                table: "Plan",
                keyColumn: "Id",
                keyValue: -1,
                column: "Day",
                value: new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Local) });
        }
    }
}
