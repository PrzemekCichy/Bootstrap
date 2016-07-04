using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Bootstrap.Hubs
{
    public class d3DataHub : Hub
    {
        public void SendGaugeData(int message)
        {
            Clients.All.newMessage(
                    message
                );
        }
    }
}