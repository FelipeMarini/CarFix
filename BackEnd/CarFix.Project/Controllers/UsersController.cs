using CarFix.Project.Contexts;
using CarFix.Project.Domains;
using CarFix.Project.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UnitOfWork.UnitOfWork _unitOfWork;
        private readonly CarFixContext _context;


        public UsersController(CarFixContext context)
        {
            _context = context;
            _unitOfWork = new UnitOfWork.UnitOfWork(_context);

        }


        [HttpGet]
        public IActionResult GetAllUsers()
        {
            try
            {
                return Ok(_unitOfWork.UserRepository.ListAllUsers());
            }

            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [Route("Workers")]
        [HttpGet]
        public IActionResult ListAllWorkers()
        {
            try
            {
                return Ok(_unitOfWork.UserRepository.ListAllWorkers());
            }

            catch (Exception error)
            {
                return BadRequest(error);
            }
        }


        [HttpGet("{id}")]
        public IActionResult FindUserById(Guid id)
        {
            try
            {

                return Ok(_unitOfWork.UserRepository.FindUser(id));


            }

            catch (Exception error)
            {

                return BadRequest(error);

            }

        }

        [HttpPost]
        public IActionResult RegisterUser(InsertUserDTO newUserDTO)
        {
            try
            {
                if(string.IsNullOrEmpty(newUserDTO.Email) || string.IsNullOrEmpty(newUserDTO.Password) || string.IsNullOrEmpty(newUserDTO.Username))
                {
                    return BadRequest("Usuário Inválido!");
                }
                
                if(_unitOfWork.UserRepository.FindUserPerEmail(newUserDTO.Email) == null)
                {
                    User newUser = new();

                    newUser.Email = newUserDTO.Email.ToString();
                    newUser.Password = newUserDTO.Password.ToString();
                    newUser.UserType = newUserDTO.UserType;
                    newUser.Username = newUserDTO.Username.ToString();
                    newUser.PhoneNumber = newUserDTO.PhoneNumber.ToString(); 


                    _unitOfWork.UserRepository.Register(newUser);
                    _unitOfWork.Save();

                    return StatusCode(201);
                }
                
                return BadRequest("Email já cadastrado!");
            
            }
            catch (Exception error)
            {

                return BadRequest(error);

            }

        }

        [HttpPatch]
        public IActionResult UpdateUser(UpdateUserDTO userUpdated)
        {
            try
            {
                string idJti = User.Claims.First(t => t.Type == JwtRegisteredClaimNames.Jti).Value;
                Guid idFinal = Guid.Parse(idJti);

                userUpdated.UserId = idFinal;
                _unitOfWork.UserRepository.Update(userUpdated);
                _unitOfWork.Save();
                return StatusCode(204);

            }

            catch (Exception error)
            {
                return BadRequest(error);
            }

        }


        [HttpDelete]
        public IActionResult DeleteUser(Guid id)
        {
            try
            {
                _unitOfWork.UserRepository.Delete(id);
                _unitOfWork.Save();
                return StatusCode(204);
            }

            catch (Exception error)
            {

                return BadRequest(error);

            }

        }

    }
}
