import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import colors from '../Style/Colors';

// Screens
import SearchScreen from '../Screens/SearchScreen';
import LibraryScreen from '../Screens/LibraryScreen';

// Components
import TabBar from '../Components/TabBar';

const Tab = createBottomTabNavigator();

function MainNavigation() {
    
    return (
        <Tab.Navigator
            tabBar={props => <TabBar/> }
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen 
                name="Search" 
                component={SearchScreen}
            />
            <Tab.Screen name="Library" component={LibraryScreen} />
        </Tab.Navigator>
    )
}

export default MainNavigation;