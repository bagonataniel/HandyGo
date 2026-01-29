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

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for Settings.xaml
    /// </summary>
    public partial class Settings : UserControl
    {
        private string token;
        HttpClient client = new HttpClient();
        public Settings(string TOKEN)
        {
            InitializeComponent();
            DataContext = this;
            token = TOKEN;
            client.DefaultRequestHeaders.Add("x-admin-auth-token", token);
            //_ = apiCall();
        }
    }
}
