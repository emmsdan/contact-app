import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import ContactCard from "../components/ContactCard";
// @ts-ignore
import Faker from 'faker'
import Header from "../components/Header";
import * as Contacts from 'expo-contacts';

// @ts-ignore
import styled from "styled-components/native";
import colors from "../constant/colors";
import layout from "../constant/layout";


import AsyncStorage from "@react-native-community/async-storage";
import {environment} from "../environments/environment";
import { useNavigation } from '@react-navigation/native';
import RoundButton from "../components/RoundButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function TermsAndConditions() {
    const navigation = useNavigation();
    const [name, setName] = React.useState<null | string>('')
    React.useEffect(() => {
        (async () => {
            const newName = await AsyncStorage.getItem(environment.userStorageName)
            setName(newName)
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Spacer />

            <Image source={require('../assets/emmsdan.png')} style={{ width: 100, height: 100}} />

            <Spacer />

            <ScrollView style={{ maxWidth: '80%'}}>
                <Terms>
                    Hello <Terms style={{ fontWeight: 'bold'}}>{ name || ''}</Terms>,
                </Terms>
                <Terms>
                    Please note that.
                </Terms>
                <Spacer />
                <Terms>
                    We only store data you give us access to, and you have the right to permantly remove them from our safe, without notice.
                </Terms>
                <Terms>
                    * No log of any kind is been stored.
                </Terms>
                <Terms>
                    * We dont know you, we only have a reference that enable us to arrange your contaxts in an orderly manner, to enable smooth syncing across all devices.
                </Terms>
                <Terms>
                    * YOYO & WOTR applies
                </Terms>
            </ScrollView>



            <Spacer />
            <Spacer />
            <View style={{ width: '80%', justifyContent: 'flex-end', flexDirection: 'row'}}>
                <RoundButton onPress={()=> navigation.navigate('Home')} icon={() => <MaterialCommunityIcons name="check" size={24} color="white" />} />
            </View>
            <Spacer />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Spacer = styled.View`
height: 30px;
`

const Terms = styled.Text`
text-align: left;
font-size: 20px;
padding: 5px;
`
