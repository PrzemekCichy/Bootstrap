using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bootstrap.Models
{

    public class History
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public float Ammount { get; set; }
        //true == withdraw
        public string Type { get; set; }
    }
}