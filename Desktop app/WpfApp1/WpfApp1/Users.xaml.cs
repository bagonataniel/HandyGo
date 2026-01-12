using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for Users.xaml
    /// </summary>
    /// 
    public class UserDto
    {
        public string id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        //public string password_hash { get; set; }
        public string bio { get; set; }
        public string skills { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string location { get; set; }
        public string created_at { get; set; }
        public int is_verified { get; set; }
    }
    public partial class Users : UserControl
    {
        private string token;
        HttpClient client = new HttpClient();
        public Users(string TOKEN)
        {
            InitializeComponent();
            token = TOKEN;
            client.DefaultRequestHeaders.Add("x-admin-auth-token", token);
            _ = apiCall();
        }

        public async Task apiCall()
        {

            Table table = new Table();
            try
            {
                var response = await client.GetAsync("http://localhost:3000/admin/Users");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                List<UserDto> services = await response.Content.ReadFromJsonAsync<List<UserDto>>();

                ServicesGrid.ItemsSource = services;

            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message, "Error");
            }
        }
    }
}
