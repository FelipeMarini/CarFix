using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Domains
{
    public class ServiceImage : Entity
    {
        public string? ImagePath { get; set; }

        // Composition
        public Guid IdService { get; set; }
        public virtual Service? Service { get; set; }
    }
}
