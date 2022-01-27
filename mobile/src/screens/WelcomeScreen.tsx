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

export default function Welcome() {
    const navigation = useNavigation();

    const [searchInputValue, setSearchInputValue] = React.useState<null | string>(null);


    const onSubmit = async () => {
        if (!searchInputValue)return;
        await AsyncStorage.setItem(
            environment.userStorageName,
            searchInputValue
        );
        if (navigation) {
            navigation.navigate('Terms');
        }
    }
    return (
        <View style={styles.container}>

            <Image source={require('../assets/emmsdan.png')} style={{ width: 100, height: 100}} />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />

            {
                searchInputValue ? <Title>Hello {searchInputValue},</Title> : <Title>Hi what should I call you?</Title>
            }

            <Spacer />
            <Input
                onChangeText={setSearchInputValue}
                value={searchInputValue}
                placeholder="Enter a nice name"
                placeholderTextColor={colors.grayDark}
            />
            {searchInputValue && searchInputValue.length >= 2 ? < Button onPress={onSubmit}>
                <ButtonText> Get Started </ButtonText>
                </Button> : <></>}
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
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

const Input = styled.TextInput`
width: ${layout.window.width - 100}px;
height: 60px;

background: #FFFFFF;
box-shadow: 3px 5px 20px rgba(182, 182, 182, 0.15);
border-radius: 3100px;
paddingHorizontal: 30px;
marginHorizontal: 20px;
`

const Spacer = styled.View`
height: 30px;
`

const Title = styled.Text`
text-align: center;
font-size: 20px;
`

const ButtonText = styled.Text`
text-align: center;
font-size: 16px;
color: ${colors.grayLight}
`
const Button = styled.Pressable`
background: ${colors.icon};
box-shadow: 3px 5px 20px rgba(182, 182, 182, 0.15);
border-radius: 3100px;
paddingHorizontal: 30px;
width: ${layout.window.width - 100}px;
max-height: 60px;
flex: 1;
alignItems: center;
justifyContent: center;
margin-top: 10px
`
