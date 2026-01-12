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
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        string TOKEN;
        public MainWindow()
        {
            InitializeComponent();
            Login window = new Login();
            window.ShowDialog();
            TOKEN = window.Result;
            control.Content = new Home(TOKEN);
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            control.Content = new Home(TOKEN);
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            control.Content = new Services(TOKEN);
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            control.Content = new Users(TOKEN);
        }

        private void Button_Click_3(object sender, RoutedEventArgs e)
        {

        }
    }
}