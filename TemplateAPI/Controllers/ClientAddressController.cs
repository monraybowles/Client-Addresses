using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Web.Http.Cors;
using System.Web.Http.Description;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{

   [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
   public class ClientAddressController : ApiController
   {

        string ConnectionString = (ConfigurationManager.ConnectionStrings["ClientConnection"].ConnectionString);
        public HttpResponseMessage Get()
        {
            // Must move this a stored procedure, didnt have much time 
            string query = @"
                    select ClientAddressId,ClientID, ClientAddressType,ClientAddress,Street,City,Province,PostCode from
                    dbo.ClientAddress
                    ";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["ClientConnection"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);


        }

       
        public string Post(ClientAddressModel InsertClientAddressModel)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(ConnectionString))
                {
                    //Create the command object
                    SqlCommand cmd = new SqlCommand("[dbo].[InsertAddressClient]", connection);
                    cmd.CommandType = CommandType.StoredProcedure;

                    //add input parameter                   
                    cmd.Parameters.AddWithValue("@ClientID", InsertClientAddressModel.ClientID);
                    cmd.Parameters.AddWithValue("@ClientAddressType", InsertClientAddressModel.ClientAddressType);
                    cmd.Parameters.AddWithValue("@ClientAddress", InsertClientAddressModel.ClientAddress);
                    cmd.Parameters.AddWithValue("@Street", InsertClientAddressModel.Street);
                    cmd.Parameters.AddWithValue("@City", InsertClientAddressModel.City);
                    cmd.Parameters.AddWithValue("@Province", InsertClientAddressModel.Province);
                    cmd.Parameters.AddWithValue("@PostCode", InsertClientAddressModel.PostCode);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }

                return "Updated Successfully!!";
            }
            catch (Exception)
            {

                return "Failed to Update!!";
            }
        }


        public string Put(ClientAddressModel UpdateClientAddressModel)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(ConnectionString))
                {
                    //Create the command object
                    SqlCommand cmd = new SqlCommand("[dbo].[UpdateAddressClient]", connection);
                    cmd.CommandType = CommandType.StoredProcedure;

                    //add input parameter
                    cmd.Parameters.AddWithValue("@ClientAddressID", UpdateClientAddressModel.ClientAddressID);
                    cmd.Parameters.AddWithValue("@ClientID", UpdateClientAddressModel.ClientID);
                    cmd.Parameters.AddWithValue("@ClientAddressType", UpdateClientAddressModel.ClientAddressType);
                    cmd.Parameters.AddWithValue("@ClientAddress", UpdateClientAddressModel.ClientAddress);
                    cmd.Parameters.AddWithValue("@Street", UpdateClientAddressModel.Street);
                    cmd.Parameters.AddWithValue("@City", UpdateClientAddressModel.City);
                    cmd.Parameters.AddWithValue("@Province", UpdateClientAddressModel.Province);
                    cmd.Parameters.AddWithValue("@PostCode", UpdateClientAddressModel.PostCode);
                    connection.Open();
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }

                return "Updated Successfully!!";
            }
            catch (Exception)
            {

                return "Failed to Update!!";
            }
        }


        public string Delete(int id)
        {
            try
            {
                // Must move the inline query to a stored procedure, didnt have much time 
                string query = @"
                    delete from dbo.ClientAddress 
                    where ClientAddressID=" + id + @"
                    ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["ClientConnection"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Successfully!!";
            }
            catch (Exception)
            {

                return "Failed to Delete!!";
            }
        }



    }
}