using CarFix.Project.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Interfaces
{
    interface IBudgetRepository
    {
        List<Budget> ListAllBudgets();
        List<Budget> ListActiveBudgets();
        List<Budget> FindBudgetsPerUser(Guid idUser);
        Budget? FindBudget(Guid idBudget);
        Budget? FindBudgetByVehicle(Guid idVehicle);
        void Register(Budget newBudget);
        void Update(Budget updatedBudget);
        void Delete(Guid idBudget);
    }
}
