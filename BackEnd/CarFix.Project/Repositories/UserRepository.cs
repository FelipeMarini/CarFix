using System;
using System.Collections.Generic;
using System.Linq;
using CarFix.Project.Contexts;
using CarFix.Project.Domains;
using CarFix.Project.DTO;
using CarFix.Project.Interfaces;
using CarFix.Project.Utils;
using Microsoft.EntityFrameworkCore;

namespace CarFix.Project.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CarFixContext c_Context;

        public UserRepository(CarFixContext _context)
        {
            c_Context = _context;
        }

        public void Delete(Guid idUser)
        {
            User selectedUser = c_Context.Users.Find(idUser);

            c_Context.Users.Remove(selectedUser);
        }

        public User? FindUser(Guid idUser)
        {
            User? userSearch = c_Context.Users.FirstOrDefault(x => x.Id == idUser);

            if(userSearch != null){

                return userSearch;

            }

            return null;
        }

        public User? FindUserPerEmail(string email)
        {
            User? userLogin = c_Context.Users.FirstOrDefault(x => x.Email.ToLower() == email.ToLower());

            if(userLogin != null)
            {
                return userLogin;
            }

            return null;
        }

        public List<User> ListAllUsers()
        {
            return c_Context.Users
                .AsNoTracking()
                .Include(x => x.Vehicles)
                .Include(x => x.Services)
                .OrderBy(x => x.CreationDate)
                .ToList();
        }

        public List<User> ListAllWorkers()
        {
            return c_Context.Users
                .AsNoTracking()
                .Include(x => x.Vehicles)
                .Include(x => x.Services)
                .Where(x => x.UserType == Enum.EnUserType.Funileiro)
                .ToList();
        }

        public void Register(User newUser)
        {
            newUser.Password = Password.Encrypt(newUser.Password);
            c_Context.Users.Add(newUser);
        }

        public void Update(UpdateUserDTO user)
        {
            User searchUser = c_Context.Users.FirstOrDefault(x => x.Id == user.UserId);
            
            if(user.Email != null)
            {
                searchUser.Email = user.Email;
            }
            if(user.Username != null)
            {
                searchUser.Username = user.Username;
            }
            if(user.Password != null)
            {
                user.Password = Password.Encrypt(user.Password);
                searchUser.Password = user.Password;
            }
            if(user.UserType != null)
            {
                searchUser.UserType = (Enum.EnUserType)user.UserType;
            }
            if(user.PhoneNumber != null)
            {
                searchUser.PhoneNumber = user.PhoneNumber;
            }
        }
    
    }
}
