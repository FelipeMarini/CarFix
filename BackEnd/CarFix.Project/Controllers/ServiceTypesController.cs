using CarFix.Project.Contexts;
using CarFix.Project.Domains;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceTypesController : ControllerBase
    {
        private readonly UnitOfWork.UnitOfWork _unitOfWork;
        private readonly CarFixContext _context;


        public ServiceTypesController(CarFixContext context)
        {
            _context = context;
            _unitOfWork = new UnitOfWork.UnitOfWork(_context);

        }

        [HttpGet("{id}")]
        public IActionResult GetServiceTypeById(Guid id)
        {
            try
            {

                return Ok(_unitOfWork.ServiceTypeRepository.FindServiceType(id));

            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }


        [HttpGet]
        public IActionResult GetAllServiceTypes()
        {
            try
            {

                return Ok(_unitOfWork.ServiceTypeRepository.ListAllTypes());

            }

            catch (Exception error)
            {
                return BadRequest(error);
            }

        }


        [HttpPost]
        public IActionResult RegisterServiceType(ServiceType newServiceType)
        {

            try
            {

                _unitOfWork.ServiceTypeRepository.Register(newServiceType);
                _unitOfWork.Save();

                return StatusCode(201);

            }

            catch (Exception error)
            {
                return BadRequest(error);
            }

        }


        [HttpPatch]  //Patch ou Put aqui?
        public IActionResult UpdateServiceType(ServiceType updatedServiceType)
        {
            try
            {

                _unitOfWork.ServiceTypeRepository.Update(updatedServiceType);
                _unitOfWork.Save();

                return StatusCode(204);

            }

            catch (Exception error)
            {
                return BadRequest(error);
            }

        }


        [HttpDelete("{id}")]
        public IActionResult DeleteServiceType(Guid id)
        {

            try
            {

                _unitOfWork.ServiceTypeRepository.Delete(id);
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
