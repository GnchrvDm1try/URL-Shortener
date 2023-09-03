using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shortener.Migrations
{
    /// <inheritdoc />
    public partial class UrlUserRelationUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_URLs_Users_CreatedById",
                table: "URLs");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "URLs",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_URLs_CreatedById",
                table: "URLs",
                newName: "IX_URLs_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_URLs_Users_UserId",
                table: "URLs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_URLs_Users_UserId",
                table: "URLs");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "URLs",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_URLs_UserId",
                table: "URLs",
                newName: "IX_URLs_CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_URLs_Users_CreatedById",
                table: "URLs",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
