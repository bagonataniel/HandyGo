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
        List<string> authDetails;
        Brush fontcolor;
        Brush background;
        Brush defaultText;
        Brush transparentBackground;
        Path[] paths;
        Label[] labels;
        Border[] borders;
        public MainLayout(string token, string username)
        {
            InitializeComponent();
            TOKEN = token;
            authDetails = new List<string>() { token, username };
            fontcolor = (Brush)this.FindResource("ActiveNav");
            background = (Brush)this.FindResource("ActiveNavBg");
            defaultText = (Brush)this.FindResource("TextLight2");
            paths = new Path[] { homeLogo, serviceLogo, usersLogo, bookingsLogo, settingsLogo };
            labels = new Label[] { homeText, servicesText, usersText, bookingsText, settingsText };
            borders = new Border[] { homeElement, servicesElement, usersElement, bookingsElement, settingsElement };
            homeButton_Click(null, null);
        }

        private void homeButton_Click(object sender, RoutedEventArgs e)
        {
            control.Content = new Home(TOKEN);
            control.Content = new Home(authDetails[0]);
            homeLogo.Fill = fontcolor;
            homeText.Foreground = fontcolor;
            homeElement.Background = background;
            foreach (Path path in paths)
            {
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
            foreach (Border element in borders)
            {
                if (element != homeElement)
                {
                    element.Background = transparentBackground;
                }
            }
        }

        private void serviceButton_Click(object sender, RoutedEventArgs e)
        {
            control.Content = new Services(TOKEN);
            control.Content = new Services(authDetails[0]);
            serviceLogo.Fill = fontcolor;
            servicesText.Foreground = fontcolor;
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
            foreach (Border element in borders)
            {
                if (element != servicesElement)
                {
                    element.Background = transparentBackground;
                }
            }
        }

        private void usersButton_Click(object sender, RoutedEventArgs e)
        {
            control.Content = new Users(TOKEN);
            control.Content = new Users(authDetails[0]);
            usersLogo.Fill = fontcolor;
            usersText.Foreground = fontcolor;
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
            foreach (Border element in borders)
            {
                if (element != usersElement)
                {
                    element.Background = transparentBackground;
                }
            }
        }

        private void bookingsButton_Click(object sender, RoutedEventArgs e)
        {
            control.Content = new Bookings(TOKEN);
            control.Content = new Bookings(authDetails[0]);
            bookingsLogo.Fill = fontcolor;
            bookingsText.Foreground = fontcolor;
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
            foreach (Border element in borders)
            {
                if (element != bookingsElement)
                {
                    element.Background = transparentBackground;
                }
            }
        }

        private void settingsButton_Click(object sender, MouseButtonEventArgs e)
        {
            control.Content = new Settings(authDetails[0], authDetails[1]);
            settingsLogo.Fill = fontcolor;
            settingsText.Foreground = fontcolor;
            settingsElement.Background = background;
            foreach (Path path in paths)
            {
                if (path != settingsLogo)
                {
                    path.Fill = defaultText;
                }
            }
            foreach (Label label in labels)
            {
                if (label != settingsText)
                {
                    label.Foreground = defaultText;
                }
            }
            foreach (Border element in borders)
            {
                if (element != settingsElement)
                {
                    element.Background = transparentBackground;
                }
            }
        }
    }
}
