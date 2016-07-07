using Bootstrap.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bootstrap.Controllers
{
    public class CacheController
    {
        static UsersModel usersModel = new UsersModel();
        string currentUser;

        public CacheController(string name)
        {
            currentUser = name;
        }

        public PersonModel GetUser()
        {
            return usersModel.users[currentUser];
        }
        public PersonModel AddUser
        {
            set
            {
                usersModel.users.Add("Name", new PersonModel());
            }
        }

        public void Withdraw(float ammount)
        {
            usersModel.users[currentUser].Withdraw(ammount);
        }

        public void Deposit(float ammount)
        {
            usersModel.users[currentUser].Withdraw(ammount);
        }

        public void ScheduleWrite()
        {
        }
    }
}