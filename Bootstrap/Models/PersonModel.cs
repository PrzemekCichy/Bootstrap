using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bootstrap.Models
{
    public class PersonModel
    {
        public string Name { get; set; }
        public float Balance { get; set; }
        public int Id { get; set; }
        public List<History> History { get; set; }

        public void Withdraw(float ammount)
        {
            if (Balance - ammount < 0)
                return;

            Balance -= ammount;
            addHistory("Withdraw", ammount);

        }

        public void Deposit(float ammount)
        {
            Balance += ammount;
            addHistory("Deposit", ammount);
        }
    public void addHistory(string type, float ammount)
        {
            History.Add(new History
            {
                Id = History.Count,
                Date = new DateTime(),
                Ammount = ammount,
                Type = type,
            });
        }

    }
}