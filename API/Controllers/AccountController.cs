using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController(ApplicationDbContext _db, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.UserName)) return BadRequest("Username is taken");
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            
                var user = new AppUser
                {
                    UserName = registerDTO.UserName.ToLower(),
                    PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDTO.Password)),
                    PasswordSalt = hmac.Key
                };

                _db.Users.Add(user);
                await _db.SaveChangesAsync();

            
            // Registration logic here
            return Ok(
                new UserDTO
                {
                    UserName = user.UserName,
                    Token = tokenService.CreateToken(user)
                });
        }

        private async Task<bool> UserExists(string username)
        {
            return await _db.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO){
            var user = await _db.Users.FirstOrDefaultAsync(x=>x.UserName == loginDTO.UserName.ToLower());
            if(user == null) return Unauthorized("UserName or Password incorrect");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
            for(int i = 0; i< computedHash.Length; i++){
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }
            return Ok(
                 new UserDTO
                 {
                     UserName = user.UserName,
                     Token = tokenService.CreateToken(user)
                 });
        }
    }
}