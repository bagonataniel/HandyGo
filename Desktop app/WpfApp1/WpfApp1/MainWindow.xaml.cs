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
        private LoginView _loginView;
        List<string> Result;
        public MainWindow()
        {
            InitializeComponent();
            _loginView = new LoginView();
            _loginView.LoginSucceeded += OnLoginSuccess;
            rootContent.Content = _loginView;
        }

        private void OnLoginSuccess()
        {
            Result = _loginView.Result;
            rootContent.Content = new MainLayout(Result[0], Result[1]);
        }

    }
}