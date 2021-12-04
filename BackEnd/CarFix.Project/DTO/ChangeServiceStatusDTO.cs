using CarFix.Project.Enum;
using System;

namespace CarFix.Project.DTO
{
    public class ChangeServiceStatusDTO
    {
        public Guid IdService { get; set; }
        public EnServiceStatus ServiceStatus { get; set; }
    }
}
