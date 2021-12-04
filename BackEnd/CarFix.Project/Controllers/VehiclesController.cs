using CarFix.Project.Contexts;
using CarFix.Project.Domains;
using CarFix.Project.DTO;
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
    public class VehiclesController : ControllerBase
    {
        private readonly UnitOfWork.UnitOfWork _unitOfWork;
        private readonly CarFixContext _context;

        public VehiclesController(CarFixContext context)
        {
            _context = context;
            _unitOfWork = new UnitOfWork.UnitOfWork(_context);
        }

        [HttpGet]
        public IActionResult GetAllVehicles()
        {

            try
            {

                return Ok(_unitOfWork.VehicleRepository.ListAllVehicles());

            }

            catch (Exception error)
            {
                return BadRequest(error);
            }

        }

        [HttpGet("VehicleId/{id}")]
        public IActionResult FindVehiclePerId(Guid id)
        {
            try
            {

                return Ok(_unitOfWork.VehicleRepository.FindVehicle(id));

            }


            catch (Exception error)
            {

                return BadRequest(error);

            }

        }

        [HttpGet("User/{id}")]
        public IActionResult GetVehiclePerUser(Guid id)
        {
            try
            {

                return Ok(_unitOfWork.VehicleRepository.FindVehiclePerUser(id));

            }


            catch (Exception error)
            {

                return BadRequest(error);

            }

        }
                
        [HttpPatch]  // Put ou Patch?
        public IActionResult UpdateVehicle(Vehicle vehicleUpdated)
        {

            try
            {

                _unitOfWork.VehicleRepository.Update(vehicleUpdated);
                _unitOfWork.Save();

                return StatusCode(204);

            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteVehicle(Guid id)
        {

            try
            {
                _unitOfWork.VehicleRepository.Delete(id);
                _unitOfWork.Save();

                return StatusCode(204);
            }

            catch (Exception error)
            {
                return BadRequest(error);
            }

        }


        [HttpPost]
        public IActionResult RegisterVehicle(InsertVehicleDTO newVehicleDTO)
        {

            try
            {
                Vehicle newVehicle = new();

                newVehicle.LicensePlate = newVehicleDTO.LicensePlate;
                newVehicle.ModelName = newVehicleDTO.ModelName;
                newVehicle.BrandName = newVehicleDTO.BrandName;
                newVehicle.Year = newVehicleDTO.Year;
                newVehicle.Color = newVehicleDTO.Color;
                newVehicle.VehicleImage = newVehicleDTO.VehicleImage;
                newVehicle.IdUser = newVehicleDTO.IdUser;

                _unitOfWork.VehicleRepository.Register(newVehicle);
                _unitOfWork.Save();

                return StatusCode(201);

            }

            catch (Exception error)
            {
                return BadRequest(error);
            }
        
        }
    
    }

}
