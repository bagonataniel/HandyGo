using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net.Http;
using System.Text;
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
using System.Net.Http;
using System.Net.Http.Json;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for Bookings.xaml
    /// </summary>
    public class BookingsDto
    {
        public string id { get; set; }
        public string service_id { get; set; }
        public string client_id { get; set; }
        public string worker_id { get; set; }
        public string status { get; set; }
        public DateTime date { get; set; }
    }

    public partial class Bookings : UserControl
    {
        private string token;
        HttpClient client = new HttpClient();
        public ObservableCollection<BookingsDto> BookingsData { get; } = new ObservableCollection<BookingsDto>();
        List<BookingsDto> bookings;
        public Bookings(string TOKEN)
        {
            InitializeComponent();
            DataContext = this;
            token = TOKEN;
            client.DefaultRequestHeaders.Add("x-admin-auth-token", token);
            _ = getBookings();
        }

        public async Task getBookings()
        {

            Table table = new Table();
            try
            {
                var response = await client.GetAsync("http://localhost:3000/admin/bookings");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                bookings = await response.Content.ReadFromJsonAsync<List<BookingsDto>>();
                BookingsData.Clear();
                foreach (var item in bookings)
                {
                    BookingsData.Add(item);
                }

            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message, "Error");
            }
        }

        //private void FilterButton_Click(object sender, RoutedEventArgs e)
        //{
        //    RadioButton button = sender as RadioButton;
        //    if (button.Content.ToString() == "Összes")
        //    {
        //        ServicesData.Clear();
        //        foreach (var item in services)
        //        {
        //            ServicesData.Add(item);
        //        }

        //    }
        //    else if (button.Content.ToString() == "Elfogadott")
        //    {
        //        ServicesData.Clear();
        //        foreach (var item in services)
        //        {
        //            if (item.status == "approved")
        //            {
        //                ServicesData.Add(item);
        //            }
        //        }
        //    }
        //    else if (button.Content.ToString() == "Elutasított")
        //    {
        //        ServicesData.Clear();
        //        foreach (var item in services)
        //        {
        //            if (item.status == "rejected")
        //            {
        //                ServicesData.Add(item);
        //            }
        //        }
        //    }
        //    else if (button.Content.ToString() == "Függő")
        //    {
        //        ServicesData.Clear();
        //        foreach (var item in services)
        //        {
        //            if (item.status == "pending")
        //            {
        //                ServicesData.Add(item);
        //            }
        //        }
        //    }
        //    selectedFilter = button.Content.ToString();
        //}

        private void searchbox_TextChanged(object sender, TextChangedEventArgs e)
        {
            string search = searchbox.Text;
            List<int> matchingIndexes = new List<int>();

            for (int i = 0; i < bookings.Count; i++)
            {
                var s = bookings[i];
                bool match =
                    (!string.IsNullOrEmpty(s.id) && s.id.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.worker_id) && s.worker_id.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.client_id) && s.client_id.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.service_id) && s.service_id.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.status) && s.status.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.date.ToString()) && s.date.ToString().Contains(search, StringComparison.OrdinalIgnoreCase));
                if (match)
                    matchingIndexes.Add(i);
            }

            Console.WriteLine($"Found {matchingIndexes.Count} matches at indexes: {string.Join(", ", matchingIndexes)}");

            BookingsData.Clear();
            foreach (var i in matchingIndexes)
            {
                BookingsData.Add(bookings[i]);
            }

        }

        //private async void setApprovalStatus(object sender, MouseButtonEventArgs e)
        //{
        //    Border button = sender as Border;
        //    string tag = button.Tag.ToString();
        //    try
        //    {
        //        if (button.Name.Contains("approve"))
        //        {
        //            HttpResponseMessage response = await client.PostAsync($"http://localhost:3000/admin/Services/{tag}/approve", null);
        //            response.EnsureSuccessStatusCode();
        //            foreach (var item in ServicesData)
        //            {
        //                if (item.id == tag)
        //                {
        //                    item.status = "approved";
        //                }
        //            }
        //        }
        //        else if (button.Name.Contains("reject"))
        //        {
        //            HttpResponseMessage response = await client.PostAsync($"http://localhost:3000/admin/Services/{tag}/reject", null);
        //            response.EnsureSuccessStatusCode();
        //            foreach (var item in ServicesData)
        //            {
        //                if (item.id == tag)
        //                {
        //                    item.status = "rejected";
        //                }
        //            }
        //        }
        //        CollectionViewSource.GetDefaultView(ServicesData).Refresh();
        //    }
        //    catch (Exception err)
        //    {
        //        MessageBox.Show(err.Message);
        //        throw;
        //    }
        //}
    }
}
