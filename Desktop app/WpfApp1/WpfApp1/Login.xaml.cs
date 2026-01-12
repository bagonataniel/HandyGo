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
using System.Windows.Shapes;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for Login.xaml
    /// </summary>
    public partial class Login : Window
    {
        public string Result { get; private set; }
        public Login()
        {
            InitializeComponent();
        }

        public async void apiCall()
        {
            string TOKEN = "";
            using var client = new HttpClient();

            string url = "http://localhost:3000/admin/login";

            var data = new
            {
                username = username.Text,
                password = password.Text
            };

            string json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                HttpResponseMessage response = await client.PostAsync(url, content);
                response.EnsureSuccessStatusCode();

                string query_result = await response.Content.ReadAsStringAsync();
                result.Content = query_result;

                JsonNode node = JsonNode.Parse(query_result);
                TOKEN = node["JWT"]!.ToString();
                Result = TOKEN;
                DialogResult = true;

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
    }
}
