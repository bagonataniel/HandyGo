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
        public string worker_name  { get; set;}
        public string client_name {get; set;}
        public string service_name {get; set;}
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
        private void searchbox_TextChanged(object sender, TextChangedEventArgs e)
        {
            string search = searchbox.Text;
            List<int> matchingIndexes = new List<int>();

            for (int i = 0; i < bookings.Count; i++)
            {
                var s = bookings[i];
                bool match =
                    (!string.IsNullOrEmpty(s.id) && s.id.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.worker_name) && s.worker_name.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.client_name) && s.client_name.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.service_name) && s.service_name.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
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
    }
}
