using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Domains
{
    public class ServiceType : Entity
    {
        public string TypeName { get; set; }

        public ICollection<Service>? Services { get; set; }
    }
}
