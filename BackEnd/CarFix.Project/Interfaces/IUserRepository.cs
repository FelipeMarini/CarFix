using CarFix.Project.Domains;
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
        void Register(User newUser);
        void Update(User user);
        void Delete(Guid idUser);
    }
}
