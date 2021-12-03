using CarFix.Project.Contexts;
using CarFix.Project.Domains;
using CarFix.Project.Interfaces;
using CarFix.Project.Repositories;
using CarFix.Project.Utils;
using CarFix.Project.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CarFix.Project.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UnitOfWork.UnitOfWork _unitOfWork;
        private readonly CarFixContext _context;

        public LoginController(CarFixContext context)
        {
            _context = context;
            _unitOfWork = new UnitOfWork.UnitOfWork(_context);
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                User userLogin = _unitOfWork.UserRepository.FindUserPerEmail(login.Email);

                if(userLogin == null || !Password.Validate(login.Password, userLogin.Password))
                {
                    return BadRequest("E-mail ou senha inválida!");
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, userLogin.Email),

                    new Claim(JwtRegisteredClaimNames.Jti, userLogin.Id.ToString()),

                    new Claim(ClaimTypes.Role, userLogin.UserType.ToString()),

                    new Claim("role", userLogin.UserType.ToString())
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("ChaveSecretaCarFixProjectSenai"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "CarFix",
                    audience: "CarFix",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
