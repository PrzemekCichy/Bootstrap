using Bootstrap.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bootstrap.Controllers
{
    public class BankController : Controller
    {

        static PersonModel model = new PersonModel
        {
            Balance = 1010123,//I wish
            Name = "Przemek Cichy",
            Id = 0,
            History = new List<History> {
                new History
                {
                    Id = 0,
                    Date = DateTime.Now,
                    Ammount = 100,
                    Type = "Withdraw",
                },
                new History
                {
                    Id = 1,
                    Date = new DateTime(2016, 07, 23, 10, 22, 11),
                    Ammount = 12241,
                    Type = "Deposit",
                },
                new History
                {
                    Id = 2,
                    Date = new DateTime(2016, 07, 11, 10, 22, 11),
                    Ammount = 32321,
                    Type = "Withdraw",
                }
            },
        };

        public ActionResult Index()
        {
            return View(model);
        }

        public ActionResult Withdraw()
        {
            model.Withdraw(100000);
            return RedirectToAction("Index");

        }

        public ActionResult Deposit()
        {
            model.Deposit(31231);
            return RedirectToAction("Index");
        }
    }
}