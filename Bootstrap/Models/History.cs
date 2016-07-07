using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bootstrap.Models
{

    public class History
    {
        [JsonProperty("Id")]
        public int Id { get; set; }
        [JsonProperty("Date")]
        public DateTime Date { get; set; }
        [JsonProperty("Ammount")]
        public float Ammount { get; set; }
        [JsonProperty("Type")]
        //true == withdraw
        public string Type { get; set; }
    }
}