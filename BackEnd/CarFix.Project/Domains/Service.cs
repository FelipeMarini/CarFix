using CarFix.Project.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Domains
{
    public class Service : Entity
    {
        public string ServiceDescription { get; set; }
        public double? Price { get; set; }
        public string? Observations { get; set; }
        public EnServiceStatus? ServiceStatus { get; set; }

        public Guid? IdUser { get; set; }
        public virtual User? Worker { get; set; }

        public Guid? IdServiceType { get; set; }
        public virtual ServiceType? ServiceType { get; set; }

        public Guid? IdBudget { get; set; }
        public virtual Budget? Budget { get; set; }

        public ICollection<ServiceImage>? ServiceImages { get; set; }

    }

}
