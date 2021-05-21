using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

using System.Web.Http.Cors;
using System.Web.Http.Description;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{


    // [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]

   
    public class ClientController : ApiController
    {
        string ConnectionString = (ConfigurationManager.ConnectionStrings["ClientConnection"].ConnectionString);
        ///api/Client/get
        public HttpResponseMessage Get()
        {
            //string query = @"
            //        select ClientID,NAME, Surname, Email, Phone, Gender from
            //        dbo.Client
            //        ";

            string query = @"
                        SELECT DISTINCT 
                         Client.NAME, Client.ClientID,ClientAddress.ClientAddressID, Client.Surname, Client.Email, Client.Phone, 
                          Client.Gender, ClientAddress.PostCode, 
                         ClientAddress.Province, ClientAddress.City, 
                         ClientAddress.Street, ClientAddress.ClientAddress, 
                         ClientAddress.ClientAddressType
                         FROM Client LEFT OUTER JOIN
                         ClientAddress ON Client.ClientID = ClientAddress.ClientID";
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

        // public HttpResponseMessage Get(ClientModel ClientID)
     
        public HttpResponseMessage Get(int ClientID)
        {

       
                string query = @"
                         SELECT TOP (1) Client.ClientID, Client.NAME, Client.Surname, Client.Email, Client.Phone, 
                         Client.Gender, ClientAddress.ClientAddressID, ClientAddress.ClientAddressType,
                         ClientAddress.Street, ClientAddress.ClientAddress, 
                         ClientAddress.Province, ClientAddress.City, ClientAddress.PostCode
                         FROM Client INNER JOIN
                         ClientAddress ON Client.ClientID = ClientAddress.ClientID
                         WHERE Client.ClientID = '" + ClientID + "'";

                // need to get rid of this duplication var blocks in every method. 
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


        public string Post(ClientModel UpdateClientModel)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(ConnectionString))
                {
                    //Create the command object

                    SqlCommand cmd = new SqlCommand("[dbo].[InsertClient]", connection);
                    cmd.CommandType = CommandType.StoredProcedure;

                    //add input parameter                   
                    cmd.Parameters.AddWithValue("@Email", UpdateClientModel.Email);
                    cmd.Parameters.AddWithValue("@Surname", UpdateClientModel.Surname);
                    cmd.Parameters.AddWithValue("@NAME", UpdateClientModel.NAME);
                    cmd.Parameters.AddWithValue("@Phone", UpdateClientModel.Phone);
                    cmd.Parameters.AddWithValue("@Gender", UpdateClientModel.Gender);
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


        public string Put(ClientModel UpdateClientModel)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(ConnectionString))
                {
                    //Create the command object
                                    
                    SqlCommand cmd = new SqlCommand("[dbo].[UpdateClient]", connection);
                    cmd.CommandType = CommandType.StoredProcedure;

                    //add input parameter
                    cmd.Parameters.AddWithValue("@ClientID", UpdateClientModel.ClientID);
                    cmd.Parameters.AddWithValue("@Email", UpdateClientModel.Email);
                    cmd.Parameters.AddWithValue("@Surname", UpdateClientModel.Surname);
                    cmd.Parameters.AddWithValue("@NAME", UpdateClientModel.NAME);
                    cmd.Parameters.AddWithValue("@Phone", UpdateClientModel.Phone);
                    cmd.Parameters.AddWithValue("@Gender", UpdateClientModel.Gender);
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
                string query = @"
                    delete from dbo.Client 
                    where ClientID=" + id + @"
                    ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConnectionString)) 
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