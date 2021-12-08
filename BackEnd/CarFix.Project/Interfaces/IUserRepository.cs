using CarFix.Project.Domains;
using CarFix.Project.DTO;
using CarFix.Project.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Interfaces
{
    public interface IUserRepository
    {
        List<User> ListAllUsers();
        User? FindUser(Guid idUser);
        User? FindUserPerEmail(string email);
        // User FindWorkers(EnUserType userType);
        List<User> ListAllWorkers();
        void Register(User newUser);
        void Update(UpdateUserDTO user);
        void Delete(Guid idUser);
    }
}
