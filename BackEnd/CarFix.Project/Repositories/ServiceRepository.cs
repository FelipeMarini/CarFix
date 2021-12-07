using CarFix.Project.Contexts;
using CarFix.Project.Domains;
using CarFix.Project.DTO;
using CarFix.Project.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


namespace CarFix.Project.Repositories
{
    public class ServiceRepository : IServiceRepository
    {

        private readonly CarFixContext c_Context;

        public ServiceRepository(CarFixContext _context)
        {
            c_Context = _context;
        }

        public void AnswerService(AnswerServiceDTO serviceAnswer)
        {
            Service selectedService = c_Context.Services.Find(serviceAnswer.IdService);

            if (serviceAnswer.Observations != null)
            {
                selectedService.Observations = serviceAnswer.Observations;
            }

            selectedService.Price = serviceAnswer.Price;

            var idBudget = selectedService.IdBudget;

            Budget selectedBudget = c_Context.Budgets.Find(idBudget);

            if (selectedBudget.TotalValue == null)
            {
                selectedBudget.TotalValue = 0;
            }

            selectedBudget.TotalValue += selectedService.Price;

        }

        public void AssignWorker(AssignWorkerDTO worker)
        {
            Service selectedService = c_Context.Services.Find(worker.IdService);

            if (worker.IdWorker != null)
            {
                selectedService.IdUser = worker.IdWorker;
            }
        }

        public void ChangeServiceStatus(ChangeServiceStatusDTO serviceStatus)
        {
            Service selectedService = c_Context.Services.Find(serviceStatus.IdService);

            if (serviceStatus.IdService != null)
            {
                selectedService.ServiceStatus = serviceStatus.ServiceStatus;
            }
        }

        public void Delete(Guid idService)
        {
            Service selectedService = c_Context.Services.Find(idService);

            c_Context.Services.Remove(selectedService);
        }


        public Service? FindService(Guid idService)
        {
            return c_Context.Services
                .Include(x => x.ServiceType)
                .Include(x => x.ServiceImages)
                .FirstOrDefault(x => x.Id == idService);
        }



        public List<Service> ListAllServices()
        {
            return c_Context.Services
                .AsNoTracking()
                .Include(x => x.Worker)
                .Include(x => x.ServiceType)
                .Include(x => x.Budget)
                .Include(x => x.ServiceImages)
                .ToList();
        }

        public List<Service> ListAllActiveServicesPerWorker(Guid idWorker)
        {
            return c_Context.Services
                .AsNoTracking()
                .Include(x => x.Worker)
                .Include(x => x.ServiceType)
                .Include(x => x.Budget)
                .Include(x => x.ServiceImages)
                .Where(x => x.IdUser == idWorker)
                .Where(x => x.ServiceStatus != Enum.EnServiceStatus.Finalizado)
                .ToList();
        }

        public void RegisterService(ServiceBudgetDTO newServiceBudget)
        {
            Service newService = new();

            if (newServiceBudget.IdBudget == null)
            {
                Budget newBudget = new();
                newService.IdBudget = newBudget.Id;

                newBudget.IdVehicle = newServiceBudget.IdVehicle;

                c_Context.Budgets.Add(newBudget);
            }

            else
            {
                Budget selectedBudget = c_Context.Budgets.Find(newServiceBudget.IdBudget);

                newService.IdBudget = selectedBudget.Id;
            }

            if (newServiceBudget.ServiceDescription != null)
            {
                newService.ServiceDescription = newServiceBudget.ServiceDescription;
            }

            newService.ServiceStatus = Enum.EnServiceStatus.Pendente; //add aqui

            newService.IdServiceType = newServiceBudget.IdServiceType;

            c_Context.Services.Add(newService);
        }


        public void Update(Service updatedService)
        {
            c_Context.Entry(updatedService).State = EntityState.Modified;
        }

        public List<Service> FindServicesPerBudget(Guid idBudget)
        {
            List<Service>? services = c_Context.Services
                   .AsNoTracking()
                   .Include(x => x.Budget)
                   .Include(x => x.ServiceType)
                   .Include(x => x.Worker)
                   .Include(x => x.ServiceImages)
                   .Where(x => x.Budget.Id == idBudget)
                   .ToList();

            if (services != null)
            {
                return services;
            }

            return null;
        }

        public List<Service> FindServicesPerVehicle(Guid idVehicle)
        {
            List<Service>? services = c_Context.Services
                   .AsNoTracking()
                   .Include(x => x.Budget)
                   .Include(x => x.ServiceType)
                   .Include(x => x.Worker)
                   .Include(x => x.ServiceImages)
                   .Where(x => x.Budget.IdVehicle == idVehicle)
                   .ToList();

            if (services != null)
            {
                return services;
            }

            return null;
        }

    }

}
