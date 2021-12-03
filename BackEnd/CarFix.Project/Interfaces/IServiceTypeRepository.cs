using CarFix.Project.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Interfaces
{
    interface IServiceTypeRepository
    {
        List<ServiceType> ListAllTypes();
        ServiceType? FindServiceType(Guid idType);
        void Register(ServiceType newType);
        void Update(ServiceType updatedType);
        void Delete(Guid idServiceType);
    }
}
