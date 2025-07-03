import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Home from '../screens/Home/home';
import { PlaylistsScreen } from '../screens/playlistScreen';
import MoodsScreen from '../screens/MoodsScreen';
import Profile from '../screens/profile/Profile';
import ImagemDetalhes from '../screens/ImagemDetalhes/imagemDetalhes';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Feather.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Login':
              iconName = 'log-in';
              break;
            case 'Playlist':
              iconName = 'music';
              break;
            case 'Moods':
              iconName = 'moon';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            default:
              iconName = 'circle';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7FB3FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#0B0B22',
          borderTopColor: '#222',
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Playlist" component={PlaylistsScreen} />
      <Tab.Screen name="Moods" component={MoodsScreen} />
      <Tab.Screen name="Profile" component={Profile} />
      
    </Tab.Navigator>
  );
};