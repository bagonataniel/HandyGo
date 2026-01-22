using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
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
        public string worker_name { get; set; }
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
        public ObservableCollection<ServiceDto> ServicesData { get; } = new ObservableCollection<ServiceDto>();
        List<ServiceDto> services;
        public string selectedFilter = "Összes";
        public Services(string TOKEN)
        {
            InitializeComponent();
            DataContext = this;
            token = TOKEN;
            client.DefaultRequestHeaders.Add("x-admin-auth-token", token);
            _ = getServices();
        }

        public async Task getServices()
        {

            Table table = new Table();
            try
            {
                var response = await client.GetAsync("http://localhost:3000/admin/Services");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                services = await response.Content.ReadFromJsonAsync<List<ServiceDto>>();
                ServicesData.Clear();
                foreach (var item in services)
                {
                    ServicesData.Add(item);
                }

            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message, "Error");
            }
        }

        private void FilterButton_Click(object sender, RoutedEventArgs e)
        {
            RadioButton button = sender as RadioButton;
            if (button.Content.ToString() == "Összes")
            {
                ServicesData.Clear();
                foreach (var item in services)
                {
                    ServicesData.Add(item);
                }

            }
            else if (button.Content.ToString() == "Elfogadott")
            {
                ServicesData.Clear();
                foreach (var item in services)
                {
                    if (item.status == "approved")
                    {
                        ServicesData.Add(item);
                    }
                }
            }
            else if (button.Content.ToString() == "Elutasított")
            {
                ServicesData.Clear();
                foreach (var item in services)
                {
                    if (item.status == "rejected")
                    {
                        ServicesData.Add(item);
                    }
                }
            }
            else if (button.Content.ToString() == "Függő")
            {
                ServicesData.Clear();
                foreach (var item in services)
                {
                    if (item.status == "pending")
                    {
                        ServicesData.Add(item);
                    }
                }
            }
            selectedFilter = button.Content.ToString();
        }

        private void searchbox_TextChanged(object sender, TextChangedEventArgs e)
        {
            string search = searchbox.Text;
            List<int> matchingIndexes = new List<int>();

            for (int i = 0; i < services.Count; i++)
            {
                var s = services[i];

                bool match =
                    (!string.IsNullOrEmpty(s.id) && s.id.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.worker_id) && s.worker_id.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.worker_name) && s.worker_name.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.title) && s.title.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.description) && s.description.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.category) && s.category.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.availability) && s.availability.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.status) && s.status.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    s.price.ToString().Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    s.latitude.ToString().Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    s.longitude.ToString().Contains(search, StringComparison.OrdinalIgnoreCase);

                if (match)
                    matchingIndexes.Add(i);
            }

            Console.WriteLine($"Found {matchingIndexes.Count} matches at indexes: {string.Join(", ", matchingIndexes)}");

            ServicesData.Clear();
            foreach (var i in matchingIndexes)
            {
                ServicesData.Add(services[i]);
            }

        }

        private async void setApprovalStatus(object sender, MouseButtonEventArgs e)
        {
            Border button = sender as Border;
            string tag = button.Tag.ToString();
            try
            {
                if (button.Name.Contains("approve"))
                {
                    HttpResponseMessage response = await client.PostAsync($"http://localhost:3000/admin/Services/{tag}/approve", null);
                    response.EnsureSuccessStatusCode();
                    foreach (var item in ServicesData)
                    {
                        if (item.id == tag)
                        {
                            item.status = "approved";
                        }
                    }
                }
                else if (button.Name.Contains("reject"))
                {
                    HttpResponseMessage response = await client.PostAsync($"http://localhost:3000/admin/Services/{tag}/reject", null);
                    response.EnsureSuccessStatusCode();
                    foreach (var item in ServicesData)
                    {
                        if (item.id == tag)
                        {
                            item.status = "rejected";
                        }
                    }
                }
                CollectionViewSource.GetDefaultView(ServicesData).Refresh();
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
                throw;
            }
        }
    }
}
