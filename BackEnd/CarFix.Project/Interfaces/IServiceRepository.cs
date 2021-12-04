using CarFix.Project.Domains;
using CarFix.Project.DTO;
using CarFix.Project.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Interfaces
{
    interface IServiceRepository
    {
        List<Service> ListAllServices();
        Service? FindService(Guid idService);
        List<Service> FindServicesPerBudget(Guid idBudget);
        List<Service> FindServicesPerVehicle(Guid idVehicle);
        List<Service> ListAllActiveServicesPerWorker(Guid idWorker);
        void AssignWorker(AssignWorkerDTO worker);
        void AnswerService(AnswerServiceDTO serviceAnswer);
        void ChangeServiceStatus(ChangeServiceStatusDTO serviceStatus);
        void RegisterService(ServiceBudgetDTO newService);
        void Update(Service updatedService);
        void Delete(Guid idService);
    }
}
