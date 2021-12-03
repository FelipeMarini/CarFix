using CarFix.Project.Contexts;
using CarFix.Project.Domains;
using CarFix.Project.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarFix.Project.Repositories
{
    public class BudgetRepository : IBudgetRepository
    {

        private readonly CarFixContext c_Context;

        public BudgetRepository(CarFixContext _context)
        {

            c_Context = _context;

        }
                
        public void Delete(Guid idBudget)
        {
            Budget selectedBudget = c_Context.Budgets.Find(idBudget);

            c_Context.Budgets.Remove(selectedBudget);
        }
        
        public Budget? FindBudget(Guid idBudget)
        {
            return c_Context.Budgets.FirstOrDefault(x => x.Id == idBudget);
        }

        public Budget? FindBudgetByVehicle(Guid idVehicle)
        {
            return c_Context.Budgets
                .Include(x => x.Vehicle)
                .Include(x => x.Services)
                .FirstOrDefault(x => x.IdVehicle == idVehicle);
        }

        public List<Budget> ListActiveBudgets()
        {
            return c_Context.Budgets
                .AsNoTracking()
                .Include(x => x.Vehicle)
                .Include(x => x.Services)
                .Where(x => x.FinalizationDate == null)
                .ToList();
        }

        public List<Budget>? FindBudgetsPerUser(Guid idUser)
        {
            List<Budget>? budgets = c_Context.Budgets
                .AsNoTracking()
                .Include(x => x.Vehicle)
                .Include(x => x.Services)
                .Where(x => x.Vehicle.IdUser == idUser)
                .ToList();

            if (budgets != null)
            {
                return budgets;
            }

            return null;
        }
        
        public List<Budget> ListAllBudgets()
        {
            return c_Context.Budgets
                .AsNoTracking()
                .Include(x => x.Vehicle)
                .Include(x => x.Services)
                .ToList();
        }

        public void Register(Budget newBudget)
        {
            c_Context.Budgets.Add(newBudget);
        }
        
        public void Update(Budget updatedBudget)
        {
            c_Context.Entry(updatedBudget).State = EntityState.Modified;
        }
    
    }

}
