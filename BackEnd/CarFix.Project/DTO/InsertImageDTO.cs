using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.DTO
{
    public class InsertImageDTO
    {
        public Guid IdService { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
