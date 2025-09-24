using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedData(AppDbContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var MemberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            var Members = JsonSerializer.Deserialize<List<SeedUserDTO>>(MemberData);

            if(Members == null)
            {
                Console.WriteLine("No members in seed data!");
                return;
            }

            var HMAC = new HMACSHA512();
            foreach (var member in Members)
            {
                var user = new AppUser
                {
                    Id = member.Id,
                    Email = member.Email,
                    DisplayName = member.DisplayName,
                    ImageUrl = member.ImageUrl,
                    PasswordHash = HMAC.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                    PasswordSalt = HMAC.Key,
                    Member = new Member
                    {
                        Id = member.Id,
                        DisplayName = member.DisplayName,
                        Description = member.Description,
                        DateOfBirth = member.DateOfBirth,
                        ImageUrl = member.ImageUrl,
                        Gender = member.Gender,
                        City = member.City,
                        Country = member.Country,
                        LastActive = member.LastActive,
                        Created = member.Created,
                    }
                };

                user.Member.Photos.Add(new Photo
                {
                    Url = member.ImageUrl!,
                    MemberId = member.Id
                });

                context.Users.Add(user);
            }
            await context.SaveChangesAsync();
        }
    }
}
