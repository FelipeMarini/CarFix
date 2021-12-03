using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Domains
{
    public class Vehicle : Entity
    {
        public string LicensePlate { get; set; }
        public string ModelName { get; set; }
        public string BrandName { get; set; }
        public int Year { get; set; }
        public string Color { get; set; }
        public string? VehicleImage { get; set; }

        // Compositions
        public Guid? IdUser { get; set; }
        public virtual User? User { get; set; }

        public virtual Budget? Budget { get; set; }
    }
}
