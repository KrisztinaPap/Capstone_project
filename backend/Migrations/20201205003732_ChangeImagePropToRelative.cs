using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class ChangeImagePropToRelative : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "E3E28BD3-594A-455F-9ACA-90758B48F376",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "8ccf46f4-cb81-4973-ab6c-1cb60f98068d", "a6712106-6c30-4b19-bb87-68bb4e372623" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                column: "Image",
                value: "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chipotle-orange-chicken.jpg ");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                column: "Image",
                value: "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\blackbean-quesadilla.jpg ");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                column: "Image",
                value: "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\butter-chicken.jpg ");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                column: "Image",
                value: "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\steak-sweet-potato.jpeg ");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                column: "Image",
                value: "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chicken-potato-hotsauce.jpg ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "E3E28BD3-594A-455F-9ACA-90758B48F376",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "4f70d5e2-6998-4392-8161-789f1eb87ace", "cf44295d-e92c-4411-aec9-a0f17861e343" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                column: "Image",
                value: "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chipotle-orange-chicken.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                column: "Image",
                value: "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\blackbean-quesadilla.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                column: "Image",
                value: "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\butter-chicken.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                column: "Image",
                value: "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\steak-sweet-potato.jpeg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                column: "Image",
                value: "H:\\Coding Applications\\TechCareersRepos\\Capstone\\GitRepo\\backend\\wwwroot\\images\\User_E3E28BD3-594A-455F-9ACA-90758B48F376\\chicken-potato-hotsauce.jpg");
        }
    }
}
