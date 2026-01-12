using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
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
    /// Interaction logic for Services.xaml
    /// </summary>
    public class ServiceDto
    {
        public string id {  get; set; }
        public string worker_id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public decimal price { get; set; }
        public string category { get; set; }
        public float latitude { get; set; }
        public float longitude { get; set; }
        public string availability { get; set; }
        public string status { get; set; }
    }

    public partial class Services : UserControl
    {
        private string token;
        HttpClient client = new HttpClient();
        public Services(string TOKEN)
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
                var response = await client.GetAsync("http://localhost:3000/admin/Services");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                List<ServiceDto> services = await response.Content.ReadFromJsonAsync<List<ServiceDto>>();
                

                ServicesGrid.ItemsSource = services;

            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message, "Error");
            }
        }

        private async void statusChange_DropDownClosed(object sender, EventArgs e)
        {

            var combo = sender as ComboBox;
            var selected = combo.SelectedValue;
            var rowData = combo.DataContext;
            string id = "";
            if (ServicesGrid.Items.Count > 0)
            {
                var firstRow = ServicesGrid.Items[0] as ServiceDto;
                if (firstRow != null)
                {
                    id = firstRow.id;
                }
            }


            try
            {
                if (selected.ToString() == "approved")
                {
                    HttpResponseMessage response = await client.PostAsync($"http://localhost:3000/admin/Services/{id}/approve", null);
                    response.EnsureSuccessStatusCode();
                    MessageBox.Show(response.ToString());
                }
                else if(selected.ToString() == "rejected")
                {
                    HttpResponseMessage response = await client.PostAsync($"http://localhost:3000/admin/Services/{id}/reject", null);
                    response.EnsureSuccessStatusCode();
                }
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
                throw;
            }

        }
    }
}
