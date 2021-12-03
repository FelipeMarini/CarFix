using CarFix.Project.Contexts;
using CarFix.Project.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.UnitOfWork
{
    public class UnitOfWork
    {
        private readonly CarFixContext c_Context;

        private UserRepository? _userRepository;
        private VehicleRepository? _vehicleRepository;
        private ServiceTypeRepository? _serviceTypeRepository;
        private ServiceRepository? _serviceRepository;
        private BudgetRepository? _budgetRepository;
        private ServiceImageRepository? _serviceImageRepository;

        public UnitOfWork(CarFixContext context)
        {
            c_Context = context;
        }

        public void Save()
        {
            c_Context.SaveChanges();
        }

        public UserRepository UserRepository
        {
            get
            {
                if(_userRepository == null)
                {
                    _userRepository = new UserRepository(c_Context);
                }
                return _userRepository;
            }
        }

        public VehicleRepository VehicleRepository
        {
            get
            {
                if(_vehicleRepository == null)
                {
                    _vehicleRepository = new VehicleRepository(c_Context);
                }
                return _vehicleRepository;
            }
        }

        public ServiceTypeRepository ServiceTypeRepository
        {
            get
            {
                if (_serviceTypeRepository == null)
                {
                    _serviceTypeRepository = new ServiceTypeRepository(c_Context);
                }
                return _serviceTypeRepository;
            }
        }

        public ServiceRepository ServiceRepository
        {
            get
            {
                if (_serviceRepository == null)
                {
                    _serviceRepository = new ServiceRepository(c_Context);
                }
                return _serviceRepository;
            }
        }

        public BudgetRepository BudgetRepository
        {
            get
            {
                if (_budgetRepository == null)
                {
                    _budgetRepository = new BudgetRepository(c_Context);
                }
                return _budgetRepository;
            }
        }

        public ServiceImageRepository ServiceImageRepository
        {
            get
            {
                if (_serviceImageRepository == null)
                {
                    _serviceImageRepository = new ServiceImageRepository(c_Context);
                }
                return _serviceImageRepository;
            }
        }
    }
}
