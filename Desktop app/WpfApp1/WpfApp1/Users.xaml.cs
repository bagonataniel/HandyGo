using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
        public string bio { get; set; }
        public string skills { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string location { get; set; }
        public string created_at { get; set; }
        public int is_verified { get; set; }
        public string is_verified_text { get; set; }
    }
    public partial class Users : UserControl
    {
        private string token;
        HttpClient client = new HttpClient();
        public ObservableCollection<UserDto> UsersData { get; } = new ObservableCollection<UserDto>();
        List<UserDto> users;
        public Users(string TOKEN)
        {
            InitializeComponent();
            token = TOKEN;
            DataContext = this;
            client.DefaultRequestHeaders.Add("x-admin-auth-token", token);
            _ = apiCall();
        }

        public async Task apiCall()
        {

            Table table = new Table();
            try
            {
                var response = await client.GetAsync("http://localhost:3000/admin/users");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                users = await response.Content.ReadFromJsonAsync<List<UserDto>>();
                UsersData.Clear();
                foreach (var item in users)
                {
                    if (item.bio == "" || item.bio == null) { item.bio = "{nincs megadva}"; }
                    if (item.location == "" || item.location == null) { item.location = "{nincs megadva}"; }
                    if (item.latitude == "" || item.latitude == null) { item.latitude = "{nincs megadva}"; }
                    if (item.longitude == "" || item.longitude == null) { item.longitude = "{nincs megadva}"; }
                    if (item.skills == "" || item.skills == null) { item.skills = "{nincs megadva}"; }
                    if (item.is_verified == 0)
                    {
                        item.is_verified_text = "Nem hitelesített";
                    }
                    else
                    {
                        item.is_verified_text = "Hitelesített";
                    }
                    UsersData.Add(item);
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

            for (int i = 0; i < users.Count; i++)
            {
                var s = users[i];

                bool match =
                    (!string.IsNullOrEmpty(s.id) && s.id.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.name) && s.name.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.bio) && s.bio.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.skills) && s.skills.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.location) && s.location.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    //(!string.IsNullOrEmpty(s.is_verified) && s.is_verified.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    (!string.IsNullOrEmpty(s.email) && s.email.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                    s.latitude.ToString().Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    s.longitude.ToString().Contains(search, StringComparison.OrdinalIgnoreCase);

                if (match)
                    matchingIndexes.Add(i);
            }

            Console.WriteLine($"Found {matchingIndexes.Count} matches at indexes: {string.Join(", ", matchingIndexes)}");

            UsersData.Clear();
            foreach (var i in matchingIndexes)
            {
                UsersData.Add(users[i]);
            }

        }

        private void filterClick(object sender, EventArgs e)
        {
            RadioButton button = sender as RadioButton;
            if (button.Content.ToString() == "Hitelesített")
            {
                UsersData.Clear();
                foreach (var item in users)
                {
                    if (item.is_verified == 1)
                    {
                        UsersData.Add(item);
                    }
                }
            }
            else if (button.Content.ToString() == "Összes")
            {
                UsersData.Clear();
                foreach (var item in users)
                {
                    UsersData.Add(item);
                }
            }
            else if (button.Content.ToString() == "Nem hitelesített")
            {
                UsersData.Clear();
                foreach (var item in users)
                {
                    if (item.is_verified == 0)
                    {
                        UsersData.Add(item);
                    }
                }
            }
        }
    }
}
