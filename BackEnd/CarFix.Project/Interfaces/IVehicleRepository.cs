using CarFix.Project.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Interfaces
{
    public interface IVehicleRepository
    {
        List<Vehicle> ListAllVehicles();
        List<Vehicle>? FindVehiclePerUser(Guid idUser);
        Vehicle? FindVehicle(Guid idVehicle);
        void Register(Vehicle newVehicle);
        void Update(Vehicle vehicle);
        void Delete(Guid idUser);
    }
}
