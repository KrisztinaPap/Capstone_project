using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class FixImagePaths : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                column: "Image",
                value: "images/User_927249ee-afd9-4bd0-b74e62053687d989/chipotle-orange-chicken.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                column: "Image",
                value: "images/User_927249ee-afd9-4bd0-b74e62053687d989/blackbean-quesadilla.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                column: "Image",
                value: "images/User_927249ee-afd9-4bd0-b74e62053687d989/butter-chicken.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                column: "Image",
                value: "images/User_927249ee-afd9-4bd0-b74e62053687d989/steak-sweet-potato.jpeg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                column: "Image",
                value: "images/User_927249ee-afd9-4bd0-b74e62053687d989/chicken-potato-hotsauce.jpg");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                column: "Image",
                value: "E:\\organizations\\techcareers\\assignments\\capstone\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chipotle-orange-chicken.jpg ");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                column: "Image",
                value: "E:\\organizations\\techcareers\\assignments\\capstone\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\blackbean-quesadilla.jpg ");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                column: "Image",
                value: "E:\\organizations\\techcareers\\assignments\\capstone\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\butter-chicken.jpg ");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                column: "Image",
                value: "E:\\organizations\\techcareers\\assignments\\capstone\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\steak-sweet-potato.jpeg ");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                column: "Image",
                value: "E:\\organizations\\techcareers\\assignments\\capstone\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chicken-potato-hotsauce.jpg ");
        }
    }
}
