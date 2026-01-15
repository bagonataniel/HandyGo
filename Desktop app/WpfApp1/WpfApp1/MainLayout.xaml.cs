using System;
using System.Collections.Generic;
using System.Linq;
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
    /// Interaction logic for MainLayout.xaml
    /// </summary>
    public partial class MainLayout : UserControl
    {
        string TOKEN;
        Brush brush;
        Brush background;
        Brush defaultText;
        Path[] paths;
        Label[] labels;
        public MainLayout(string token)
        {
            InitializeComponent();
            TOKEN = token;
            brush = (Brush)this.FindResource("ActiveNav");
            background = (Brush)this.FindResource("ActiveNavBg");
            defaultText = (Brush)this.FindResource("TextLight2");
            paths = new Path[] { homeLogo, serviceLogo, usersLogo, bookingsLogo};
            labels = new Label[] { homeText, servicesText, usersText, bookingsText };
            Button_Click(null,null);
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            control.Content = new Home(TOKEN);
            homeLogo.Fill = brush;
            homeText.Foreground = brush;
            homeElement.Background = background;
            foreach (Path path in paths) {
                if (path != homeLogo)
                {
                    path.Fill = defaultText;
                }
            }
            foreach (Label label in labels)
            {
                if (label != homeText)
                {
                    label.Foreground = defaultText;
                }
            }
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            control.Content = new Services(TOKEN);
            serviceLogo.Fill = brush;
            servicesText.Foreground = brush;
            servicesElement.Background = background;
            foreach (Path path in paths)
            {
                if (path != serviceLogo)
                {
                    path.Fill = defaultText;
                }
            }
            foreach (Label label in labels)
            {
                if (label != servicesText)
                {
                    label.Foreground = defaultText;
                }
            }
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            control.Content = new Users(TOKEN);
            usersLogo.Fill = brush;
            usersText.Foreground = brush;
            usersElement.Background = background;
            foreach (Path path in paths)
            {
                if (path != usersLogo)
                {
                    path.Fill = defaultText;
                }
            }
            foreach (Label label in labels)
            {
                if (label != usersText)
                {
                    label.Foreground = defaultText;
                }
            }
        }

        private void Button_Click_3(object sender, RoutedEventArgs e)
        {
            control.Content = new Users(TOKEN);
            bookingsLogo.Fill = brush;
            bookingsText.Foreground = brush;
            bookingsElement.Background = background;
            foreach (Path path in paths)
            {
                if (path != bookingsLogo)
                {
                    path.Fill = defaultText;
                }
            }
            foreach (Label label in labels)
            {
                if (label != bookingsText)
                {
                    label.Foreground = defaultText;
                }
            }
        }
    }
}
