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

        private string readJson(string path = "C:/Users/Przemek/Documents/GitHubVisualStudio/Bootstrap/Bootstrap/Models/Users.json")
        {
            //Path to the file defined by user should be passed here, otherwise default location of file 
            //Defined as shown. Needs to be completed by ali/stuart
            using (StreamReader r = new StreamReader(path))
                return r.ReadToEnd();
        }

        //converts a List object into JSON string and saves into file
        //Defined as shown. Needs to be completed by ali
        private void writeJson(string path = "C:/Users/Przemek/Documents/GitHubVisualStudio/Bootstrap/Bootstrap/Models/Users.json")
        {
            string json = JsonConvert.SerializeObject(users, Formatting.Indented);
            using (StreamWriter sw = new StreamWriter(path))
                sw.Write(json);
        }
    }
}