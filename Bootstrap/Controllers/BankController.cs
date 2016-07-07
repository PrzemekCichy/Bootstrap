using Bootstrap.Models;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bootstrap.Controllers
{
    public class BankController : Controller
    {
        static CacheController cacheController = new CacheController("UserName1");

        public ActionResult Index()
        {
            return View(cacheController.GetUser());
        }

        [HttpGet]
        public ActionResult getTopTransactions()
        {
            return Json(cacheController.GetTopTransactions(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Withdraw()
        {
            cacheController.Withdraw(100000);
            return RedirectToAction("Index");

        }

        public ActionResult Deposit()
        {
            cacheController.Deposit(100000);
            return RedirectToAction("Index");
        }
    }
}