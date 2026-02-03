using OxyPlot;
using OxyPlot.Axes;
using OxyPlot.Series;
using OxyPlot.Wpf;
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
        public string total_revenue { get; set; }
    }
    public class MonthlyUsers
    {
        public int year { get; set; }
        public int month { get; set; }
        public int new_users { get; set; }
    }

    public partial class Home : UserControl
    {
        HttpClient client = new HttpClient();
        private string token;
        public PlotModel MyModel { get; set; }
        
        public Home(string token)
        {
            InitializeComponent();
            DataContext = this;
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
                var jsonArray = JsonSerializer.Deserialize<List<JsonElement>>(responseBody);
                var stats = JsonSerializer.Deserialize<Stats>(jsonArray[0].GetRawText());
                var monthlyUsers = jsonArray
                    .Skip(1)
                    .Select(x => JsonSerializer.Deserialize<MonthlyUsers>(x.GetRawText()))
                    .ToList();

                userCount.Content = stats.users_count.ToString();
                servicesCount.Content = (stats.pending_services + stats.approved_services + stats.rejected_services).ToString();
                pendingServicesCount.Content = stats.pending_services.ToString();
                bookingCount.Content = stats.bookings_count.ToString();

                createGraph(monthlyUsers);
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message, "Error");
            }
        }

        public void createGraph(List<MonthlyUsers> monthlyUsers)
        {
            MyModel = new PlotModel { Title = "Monthly New Users" };

            // 2. Define the Axes
            MyModel.Axes.Add(new DateTimeAxis
            {
                Position = AxisPosition.Bottom,
                StringFormat = "MMM yyyy",
                Title = "Date",
                IntervalType = DateTimeIntervalType.Months
            });

            MyModel.Axes.Add(new LinearAxis
            {
                Position = AxisPosition.Left,
                Title = "New Users",
                Minimum = 0
            });

            // 3. Create the Line Series
            var lineSeries = new LineSeries
            {
                Title = "Users",
                Color = OxyColors.SkyBlue,
                MarkerType = MarkerType.Circle
            };

            foreach (var item in monthlyUsers)
            {
                // Convert year/month to a DateTime object
                DateTime date = new DateTime(item.year, item.month, 1);

                // Add point (X must be a double for OxyPlot, use DateTimeAxis.ToDouble)
                lineSeries.Points.Add(new DataPoint(DateTimeAxis.ToDouble(date), item.new_users));
            }

            MyModel.Series.Add(lineSeries);
        }


    }
}
