using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading;

namespace Bootstrap.Hubs
{
    public class d3DataHub : Hub
    {
        d3DataHub()
        {
            StrartUpdatingValues();
            Value = 0;
        }

        public void StrartUpdatingValues()
        {
            int i = 0;
            while (true)
            {
                i+=10;
                Thread.Sleep(1000); // in milliseconds
                if(i > 530)
                {
                    i = 0;
                }
            }
        }
        public int Value { get; set; }

        public void SendGaugeData(int message)
        {
            Clients.All.newMessage(
                    message
                );
        }
    }
}