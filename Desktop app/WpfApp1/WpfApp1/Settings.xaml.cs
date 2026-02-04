using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Reflection;
using System.Text;
using System.Text.Json;
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
    /// Interaction logic for Settings.xaml
    /// </summary>
    public class AdminsDto
    {
        public int id { get; set; }
        public string username { get; set; }
        public DateTime created_at { get; set; }
    }
    public partial class Settings : UserControl
    {
        private string token;
        private string username;
        private int CurrentUserId;
        HttpClient client = new HttpClient();
        public ObservableCollection<AdminsDto> AdminsData { get; } = new ObservableCollection<AdminsDto>();
        List<AdminsDto> admins;
        public Settings(string TOKEN, string username)
        {
            InitializeComponent();
            DataContext = this;
            this.username = username;
            token = TOKEN;
            client.DefaultRequestHeaders.Add("x-admin-auth-token", token);
            _ = getAdmins();
        }

        public async Task getAdmins()
        {
            try
            {
                var response = await client.GetAsync("http://localhost:3000/admin/admins");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                admins = await response.Content.ReadFromJsonAsync<List<AdminsDto>>();
                AdminsData.Clear();
                foreach (var item in admins)
                {
                    AdminsData.Add(item);
                }

                admins.ForEach(x => {
                    if (x.username == this.username)
                    {
                        CurrentUserId = x.id;
                    }
                });
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message, "Error");
            }
        }

        public async void addAdministrator(object sender, MouseButtonEventArgs e)
        {
            if (usernameField.Text.Length == 0 || passwordField.Text.Length == 0)
            {
                MessageBox.Show("A felhasználónév és a jelszó kitöltése kötelező!");
                return;
            }
            try
            {
                var payload = new
                {
                    username = usernameField.Text,
                    password = passwordField.Text,
                };
                string json = JsonSerializer.Serialize(payload);
                using var content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync($"http://localhost:3000/admin/register", content);
                response.EnsureSuccessStatusCode();

                MessageBox.Show("Fiók létrehozva!");

                admins.Clear();
                usernameField.Text = "";
                passwordField.Text = "";
                getAdmins();
            }
            catch (Exception)
            {
                throw;
            }
        }

        private async void removeAccountBtn(object sender, RoutedEventArgs e)
        {
            Border button = sender as Border;
            string id = button.Tag.ToString();
            try
            {
                var response = await client.DeleteAsync($"http://localhost:3000/admin/admins/{id}");
                response.EnsureSuccessStatusCode();

                admins.Clear();
                getAdmins();
            }
            catch (Exception)
            {
                throw;
            }
        }

        private void Border_Loaded(object sender, RoutedEventArgs e)
        {
            Border button = sender as Border;
            int id = int.Parse(button.Tag.ToString());
            if (id == CurrentUserId)
            {
                button.Visibility = Visibility.Hidden;
            }
        }
    }
}
