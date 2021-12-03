using CarFix.Project.Contexts;
using CarFix.Project.Domains;
using CarFix.Project.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Flunt.Notifications;

namespace CarFix.Project.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly CarFixContext c_Context;

        public VehicleRepository(CarFixContext _context)
        {
            c_Context = _context;
        }

        public void Delete(Guid idVehicle)
        {
            Vehicle selectedVehicle = c_Context.Vehicles.Find(idVehicle);

            c_Context.Vehicles.Remove(selectedVehicle);
        }

        public Vehicle? FindVehicle(Guid idVehicle)
        {
            Vehicle? searchVehicle = c_Context.Vehicles.FirstOrDefault(x => x.Id == idVehicle);

            if(searchVehicle != null)
            {
                return searchVehicle;
            }

            return null;
        }

        public List<Vehicle> ListAllVehicles()
        {
            return c_Context.Vehicles
                .AsNoTracking()
                .Include(x => x.User)
                .ToList();
        }

        public List<Vehicle>? FindVehiclePerUser(Guid idUser)
        {
            List<Vehicle>? vehicles = c_Context.Vehicles
                .AsNoTracking()
                .Include(x => x.User)
                .Where(x => x.IdUser == idUser)
                .ToList();

            if(vehicles != null)
            {
                return vehicles;
            }

            return null;
        }

        public void Register(Vehicle newVehicle)
        {
            c_Context.Vehicles.Add(newVehicle);
        }

        public void Update(Vehicle vehicle)
        {
            c_Context.Entry(vehicle).State = EntityState.Modified;
        }
    }
}
