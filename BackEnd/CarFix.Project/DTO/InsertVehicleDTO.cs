using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.DTO
{
    public class InsertVehicleDTO
    {
        public string LicensePlate { get; set; }
        public string ModelName { get; set; }
        public string BrandName { get; set; }
        public int Year { get; set; }
        public string Color { get; set; }
        public string? VehicleImage { get; set; }
        public Guid IdUser { get; set; }
    }
}
