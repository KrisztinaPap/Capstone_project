using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class UpdateDefaultUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "E3E28BD3-594A-455F-9ACA-90758B48F376");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "927249ee-afd9-4bd0-b74e62053687d989", 0, "9ce7c801-2204-473c-9967-110632a96a79", "demo@example.com", true, true, null, "DemoUser", "DEMO@EXAMPLE.COM", "DEMO@EXAMPLE.COM", "AQAAAAEAACcQAAAAEF2K8rjzLW+Pg5eripVafumGQa/4BRTSboiXDMa95qTMTPdH249hphHAkUQHUE0Ctw==", null, false, "MVLR77ABXD2ZQFYVDR6NAJB7UASX45MD", false, "demo@example.com" });

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -3,
                column: "Name",
                value: "Potato");

            migrationBuilder.UpdateData(
                table: "Plan",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Day", "UserId" },
                values: new object[] { new DateTime(2020, 12, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "927249ee-afd9-4bd0-b74e62053687d989" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "DateCreated", "DateModified", "Image", "UserId" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), "E:\\organizations\\techcareers\\assignments\\capstone\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chipotle-orange-chicken.jpg ", "927249ee-afd9-4bd0-b74e62053687d989" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                columns: new[] { "DateCreated", "DateModified", "Image", "UserId" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), "E:\\organizations\\techcareers\\assignments\\capstone\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\blackbean-quesadilla.jpg ", "927249ee-afd9-4bd0-b74e62053687d989" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                columns: new[] { "DateCreated", "DateModified", "Image", "UserId" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), "E:\\organizations\\techcareers\\assignments\\capstone\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\butter-chicken.jpg ", "927249ee-afd9-4bd0-b74e62053687d989" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "DateCreated", "DateModified", "Image", "UserId" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), "E:\\organizations\\techcareers\\assignments\\capstone\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\steak-sweet-potato.jpeg ", "927249ee-afd9-4bd0-b74e62053687d989" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "DateCreated", "DateModified", "Image", "UserId" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), "E:\\organizations\\techcareers\\assignments\\capstone\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chicken-potato-hotsauce.jpg ", "927249ee-afd9-4bd0-b74e62053687d989" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "927249ee-afd9-4bd0-b74e62053687d989");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "E3E28BD3-594A-455F-9ACA-90758B48F376", 0, "8ccf46f4-cb81-4973-ab6c-1cb60f98068d", "phprox123@gmail.com", false, false, null, "TestAdminWarren", null, null, null, null, false, "a6712106-6c30-4b19-bb87-68bb4e372623", false, null });

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -3,
                column: "Name",
                value: "Poatato");

            migrationBuilder.UpdateData(
                table: "Plan",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Day", "UserId" },
                values: new object[] { new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "-1" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "DateCreated", "DateModified", "Image", "UserId" },
                values: new object[] { new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chipotle-orange-chicken.jpg ", null });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                columns: new[] { "DateCreated", "DateModified", "Image", "UserId" },
                values: new object[] { new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\blackbean-quesadilla.jpg ", null });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                columns: new[] { "DateCreated", "DateModified", "Image", "UserId" },
                values: new object[] { new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\butter-chicken.jpg ", null });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "DateCreated", "DateModified", "Image", "UserId" },
                values: new object[] { new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\steak-sweet-potato.jpeg ", null });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "DateCreated", "DateModified", "Image", "UserId" },
                values: new object[] { new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 4, 0, 0, 0, 0, DateTimeKind.Local), "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chicken-potato-hotsauce.jpg ", null });
        }
    }
}
