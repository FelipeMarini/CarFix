using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Domains
{
    public class Budget : Entity
    {
        public double? TotalValue { get; set; }
        public int? TimeEstimate { get; set; }
        public DateTime? VisitDate { get; set;  }
        public DateTime? FinalizationDate { get; set;  }

        // Compositions
        public Guid IdVehicle { get; set; }
        public virtual Vehicle? Vehicle { get; set; }
        public ICollection<Service>? Services { get; set; }

    }
}
