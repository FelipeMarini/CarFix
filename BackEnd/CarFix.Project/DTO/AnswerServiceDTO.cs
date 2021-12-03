using CarFix.Project.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFix.Project.DTO
{
    public class AnswerServiceDTO
    {
        public Guid IdService { get; set; }
        public double Price { get; set; }
        public string? Observations { get; set; }
        public DateTime? TimeEstimate { get; set; }
    }
}
