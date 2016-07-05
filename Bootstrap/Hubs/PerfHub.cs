using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;

namespace Bootstrap.Hubs
{
    public class PerfHub : Hub
    {        
        public void Send(string message)
        {
            Clients.All.newMessage(
                Context.User.Identity.Name + "says " + message
            );
        }
    }
}