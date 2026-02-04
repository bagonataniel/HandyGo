using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
    /// Interaction logic for LoginView.xaml
    /// </summary>
    public partial class LoginView : UserControl
    {
        public List<string> Result { get; private set; }
        public event Action LoginSucceeded;
        public LoginView()
        {
            InitializeComponent();
        }

        public async void apiCall()
        {
            string TOKEN = "";
            string usernameField = username.Text;
            using var client = new HttpClient();

            string url = "http://localhost:3000/admin/login";

            var data = new
            {
                username = username.Text,
                password = password.Password
            };

            string json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                HttpResponseMessage response = await client.PostAsync(url, content);
                response.EnsureSuccessStatusCode();

                string query_result = await response.Content.ReadAsStringAsync();

                JsonNode node = JsonNode.Parse(query_result);
                TOKEN = node["JWT"]!.ToString();
                Result = new List<string>() { TOKEN, usernameField };
                LoginSucceeded?.Invoke();

            }
            catch (HttpRequestException httpEx) when (httpEx.StatusCode.HasValue)
            {
                var statusCode = (int)httpEx.StatusCode.Value;

                if (statusCode >= 400 && statusCode < 500)
                {
                    Console.WriteLine($"Client error ({statusCode}): {httpEx.Message}");
                    MessageBox.Show("Hibás adatok, kérlek ellenőrizd a beírtakat.");
                }
                else if (statusCode >= 500)
                {
                    Console.WriteLine($"Server error ({statusCode}): {httpEx.Message}");
                    MessageBox.Show("Szerverhiba történt, próbáld meg később.");
                }
                else
                {
                    Console.WriteLine($"HTTP error ({statusCode}): {httpEx.Message}");
                    MessageBox.Show("Ismeretlen HTTP hiba.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                MessageBox.Show(ex.Message);
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            apiCall();
        }

        private void enter_keyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                apiCall();
            }
        }
    }
}
