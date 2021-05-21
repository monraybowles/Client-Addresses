using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication4.Models
{
    public class ClientAddressModel
    {

        public int ClientAddressID { get; set; }
        public int ClientID { get; set; }
        public string ClientAddressType { get; set; }
        public string ClientAddress { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostCode { get; set; }


    }
}