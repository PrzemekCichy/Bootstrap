using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bootstrap.Models
{
    public class UsersModel
    {
        Dictionary<string,PersonModel> users = new Dictionary<string, PersonModel>();

        public PersonModel GetUser { get; set; }
        public PersonModel AddUser { get; set; }
        public PersonModel SaveFile { get; set; }
        public PersonModel ReadFile { get; set; }
        public PersonModel ScheduleWrite { get; set; }

    }
}