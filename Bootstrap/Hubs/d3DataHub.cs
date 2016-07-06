using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading;
using System.Threading.Tasks;
using System.Diagnostics;

namespace Bootstrap.Hubs
{
    public class d3DataHub : Hub
    {
        //  d3DataHub() {

        // }

        public void StrartUpdatingValues()
        {
            int i = 0;
            var task = Task.Factory.StartNew(async () =>
            {
                while (true)
                {
                    i += 5;
                    SendGaugeData(i);
                    await Task.Delay(1000);
                    Console.WriteLine("Send");
                    if (i >= 100)
                    {
                        i = 0;
                    }
                }
            }, TaskCreationOptions.LongRunning);

        }

        public int Value { get; set; }

        public void SendGaugeData(int message)
        {
            Clients.All.gaugeState(
                    message
                );
        }
    }
}