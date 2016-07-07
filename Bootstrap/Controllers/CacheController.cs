using Bootstrap.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Win32.TaskScheduler;
using System.Threading;

namespace Bootstrap.Controllers
{
    public class CacheController
    {
        static UsersModel usersModel = new UsersModel();
        static string currentUser;

        public CacheController(string name)
        {
            currentUser = name;
            SetUpTimer(new TimeSpan(0, 0, 30));
        }

        public List<History> GetTopTransactions()
        {
            List<History> highestTransactions = usersModel.users[currentUser].History.OrderByDescending(o => o.Ammount).ToList();
            highestTransactions.RemoveRange(9, highestTransactions.Count - 9);
            return highestTransactions;
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
           /// usersModel.writeJson();

        }

        public void Deposit(float ammount)
        {
            usersModel.users[currentUser].Deposit(ammount);
            ///usersModel.writeJson();

        }


        private System.Threading.Timer timer;
        private void SetUpTimer(TimeSpan alertTime)
        {
            DateTime current = DateTime.Now.AddSeconds(30);
            TimeSpan timeToGo = current.TimeOfDay.Add(alertTime);
            this.timer = new System.Threading.Timer(x =>
            {
                usersModel.writeJson();
            }, null, 3000, 300);
        }
    }
}