using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Bootstrap.Models
{
    public class UsersModel
    {
        public Dictionary<string, PersonModel> users;

        public UsersModel()
        {
            users = JsonConvert.DeserializeObject<Dictionary<string, PersonModel>>(readJson());
        }

        private string readJson(string path = "C:/Users/przemyslaw.cichy/Documents/Visual Studio 2015/Projects/Bootstrap/Bootstrap/Models/Users.json")
        {
            using (StreamReader r = new StreamReader(path))
                return r.ReadToEnd();
        }

        public void writeJson(string path = "C:/Users/przemyslaw.cichy/Documents/Visual Studio 2015/Projects/Bootstrap/Bootstrap/Models/Users.json")
        {
            string json = JsonConvert.SerializeObject(users, Formatting.Indented);
            using (StreamWriter sw = new StreamWriter(path))
                sw.Write(json);
        }
    }
}