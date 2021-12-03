using CarFix.Project.Contexts;
using CarFix.Project.Domains;
using CarFix.Project.DTO;
using CarFix.Project.Utils;
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
    public class ServiceImagesController : ControllerBase
    {
        private readonly UnitOfWork.UnitOfWork _unitOfWork;
        private readonly CarFixContext _context;

        public ServiceImagesController(CarFixContext context)
        {
            _context = context;
            _unitOfWork = new UnitOfWork.UnitOfWork(_context);
        }

        [HttpGet("{id}")]
        public IActionResult GetServiceImageById(Guid id)
        {
            try
            {

                return Ok(_unitOfWork.ServiceImageRepository.FindServiceImage(id));

            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }

        
        [HttpGet("Service/{id}")]
        public IActionResult GetImagesByService(Guid id)
        {
            try
            {

                return Ok(_unitOfWork.ServiceImageRepository.FindImagesPerService(id));

            }

            catch (Exception error)
            {

                return BadRequest(error);

            }
        }


        
        [HttpGet]
        public IActionResult GetAllServiceImages()
        {
            try
            {

                return Ok(_unitOfWork.ServiceImageRepository.ListAllImages());

            }

            catch (Exception error)
            {
                return BadRequest(error);
            }

        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult RegisterServiceImage([FromForm]InsertImageDTO newServiceImageForm)
        {

            try
            {
                Upload up = new();

                string[] imagens = new string[Request.Form.Files.Count];

                for (int i = 0; i < Request.Form.Files.Count; i++)
                {
                    var imagem = up.UploadFile(Request.Form.Files[i]);
                    imagens[i] = imagem;

                    if(!imagens[i].Equals("Invalid File Type"))
                    {
                        ServiceImage newServiceImage = new();

                        newServiceImage.IdService = newServiceImageForm.IdService;
                        newServiceImage.ImagePath = imagem;
                        _unitOfWork.ServiceImageRepository.Register(newServiceImage);
                        _unitOfWork.Save();
                    }
                    else
                    {
                        return BadRequest("Arquivo Inválido");
                    }
                }

                return Ok(imagens);

            }

            catch (Exception error)
            {
                return BadRequest(error);
            }

        }


        [HttpPatch]
        public IActionResult UpdateServiceImage(ServiceImage updatedServiceImage)
        {
            try
            {

                _unitOfWork.ServiceImageRepository.Update(updatedServiceImage);
                _unitOfWork.Save();

                return StatusCode(204);

            }

            catch (Exception error)
            {
                return BadRequest(error);
            }

        }


        [HttpDelete("{id}")]
        public IActionResult DeleteServiceImage(Guid id)
        {

            try
            {
                Upload up = new();

                ServiceImage? selectedImage = _unitOfWork.ServiceImageRepository.FindServiceImage(id);
                if(selectedImage != null)
                {
                    var fileName = selectedImage.ImagePath;
                    up.DeleteFile(fileName);
                }

                _unitOfWork.ServiceImageRepository.Delete(id);
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
