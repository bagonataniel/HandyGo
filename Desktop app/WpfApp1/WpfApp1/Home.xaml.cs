using System.Diagnostics;
using System.Net.Http;
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
    /// Interaction logic for Home.xaml
    /// </summary>
    public class Stats
    {
        public int users_count { get; set; }
        public int pending_services { get; set; }
        public int rejected_services { get; set; }
        public int approved_services { get; set; }
        public int bookings_count { get; set; }
    }
    public partial class Home : UserControl
    {
        HttpClient client = new HttpClient();
        private string token;
        public Home(string token)
        {
            InitializeComponent();
            this.token = token;
            client.DefaultRequestHeaders.Add("x-admin-auth-token", token);
            _ = getStats();
        }
        private async Task getStats()
        {
            try
            {
                var response = await client.GetAsync("http://localhost:3000/admin/stats");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                var stats = JsonSerializer.Deserialize<Stats>(responseBody);

                userCount.Content = stats.users_count.ToString();
                servicesCount.Content = (stats.pending_services+stats.approved_services+stats.rejected_services).ToString();
                pendingServicesCount.Content = stats.pending_services.ToString();
                bookingCount.Content = stats.bookings_count.ToString();
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message, "Error");
            }
        }
    }
}
