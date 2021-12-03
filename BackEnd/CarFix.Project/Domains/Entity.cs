using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Domains
{
    public abstract class Entity
    {
        public Entity()
        {
            Id = Guid.NewGuid();
            
            CreationDate = DateTime.Now;
        }

        public Guid Id { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
