﻿using CarFix.Project.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.Domains
{
    public class User : Entity
    {
        public string Username { get; set; }
        public string Email{ get; set; }
        public string Password { get; set; }
        public EnUserType UserType { get; set; }
        public string PhoneNumber { get; set; }

        public ICollection<Vehicle>? Vehicles { get; set; }
        public ICollection<Service>? Services { get; set; }
    }
}
