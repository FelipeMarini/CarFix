using CarFix.Project.Contexts;
using CarFix.Project.Domains;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CarFix.Project.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetsController : ControllerBase
    {
        private readonly UnitOfWork.UnitOfWork _unitOfWork;
        private readonly CarFixContext _context;


        public BudgetsController(CarFixContext context)
        {
            _context = context;
            _unitOfWork = new UnitOfWork.UnitOfWork(_context);

        }

        [HttpGet]
        public IActionResult GetAllBudgets()
        {
            try
            {
                return Ok(_unitOfWork.BudgetRepository.ListAllBudgets());
            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }

        [Route("Active")]
        [HttpGet]
        public IActionResult GetActiveBudgets()
        {
            try
            {
                return Ok(_unitOfWork.BudgetRepository.ListActiveBudgets());
            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }

        [HttpGet("BudgetId/{id}")]
        public IActionResult GetBudgetById(Guid id)
        {
            try
            {

                return Ok(_unitOfWork.BudgetRepository.FindBudget(id));

            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }

        [HttpGet("Vehicle/{id}")]
        public IActionResult GetBudgetByVehicleId(Guid id)
        {
            try
            {

                return Ok(_unitOfWork.BudgetRepository.FindBudgetByVehicle(id));

            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }

        [HttpGet("User/{id}")]
        public IActionResult GetBudgetPerUser(Guid id)
        {
            try
            {

                return Ok(_unitOfWork.BudgetRepository.FindBudgetsPerUser(id));

            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }


        [HttpPatch]
        public IActionResult UpdateBudget(Budget updatedBudget)
        {
            try
            {

                _unitOfWork.BudgetRepository.Update(updatedBudget);
                _unitOfWork.Save();

                return StatusCode(204);

            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }


        [HttpPost]
        public IActionResult RegisterBudget(Budget newBudget)
        {
            try
            {

                _unitOfWork.BudgetRepository.Register(newBudget);
                _unitOfWork.Save();

                return StatusCode(201);

            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteBudget(Guid idBudget)
        {
            try
            {

                _unitOfWork.BudgetRepository.Delete(idBudget);
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
