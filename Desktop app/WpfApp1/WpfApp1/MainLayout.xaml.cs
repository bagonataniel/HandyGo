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
        Brush fontcolor;
        Brush background;
        Brush defaultText;
        Brush transparentBackground;
        Path[] paths;
        Label[] labels;
        Border[] borders;
        public MainLayout(string token)
        {
            InitializeComponent();
            TOKEN = token;
            fontcolor = (Brush)this.FindResource("ActiveNav");
            background = (Brush)this.FindResource("ActiveNavBg");
            defaultText = (Brush)this.FindResource("TextLight2");
            paths = new Path[] { homeLogo, serviceLogo, usersLogo, bookingsLogo, settingsLogo, profileLogo};
            labels = new Label[] { homeText, servicesText, usersText, bookingsText, settingsText, profileText };
            borders = new Border[] { homeElement, servicesElement, usersElement, bookingsElement, settingsElement, profileElement };
            Button_Click(null,null);
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            control.Content = new Home(TOKEN);
            homeLogo.Fill = fontcolor;
            homeText.Foreground = fontcolor;
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
            foreach (Border element in borders)
            {
                if (element != homeElement)
                {
                    element.Background = transparentBackground;
                }
            }
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            control.Content = new Services(TOKEN);
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

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            control.Content = new Users(TOKEN);
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

        private void Button_Click_3(object sender, RoutedEventArgs e)
        {
            control.Content = new Users(TOKEN);
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

        private void settingsElement_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            //control.Content = new Users(TOKEN);
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

        private void profileElement_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            //control.Content = new Users(TOKEN);
            profileLogo.Fill = fontcolor;
            profileText.Foreground = fontcolor;
            profileElement.Background = background;
            foreach (Path path in paths)
            {
                if (path != profileLogo)
                {
                    path.Fill = defaultText;
                }
            }
            foreach (Label label in labels)
            {
                if (label != profileText)
                {
                    label.Foreground = defaultText;
                }
            }
            foreach (Border element in borders)
            {
                if (element != profileElement)
                {
                    element.Background = transparentBackground;
                }
            }
        }

        private void bookingsElement_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            control.Content = new Bookings(TOKEN);
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
    }
}
