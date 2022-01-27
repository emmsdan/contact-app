import React from 'react';
import {Text, View, Animated, ImageBackground, Image, StatusBar} from 'react-native';
// @ts-ignore
import styled from "styled-components/native";
import colors from "../constant/colors";
import AsyncStorage from "@react-native-community/async-storage";
import {environment} from "../environments/environment";

type IContactCard = {
    children?: any;
    text?: string;
}
export default function Header({ children, text }: IContactCard) {

    const [name, setName] = React.useState<null | string>('')
    React.useEffect(() => {
        (async () => {
            const newName = await AsyncStorage.getItem(environment.userStorageName)
            setName(newName)
        })();
    }, []);

    return (
        <Container>
            <Image  source={require('../assets/header.png')} style={{ width: '100%', position: "absolute"}} />
            <StatusBar />
            <Spacer />
            <Title>Hello {name},</Title>
            <SubText>{text}</SubText>
            {children}
        </Container>
    );
}

const Container = styled.View`
   width: 100%;
   min-height: 100px;
   max-height: 168px;
   alignItems: flex-start;
   justifyContent: center;
   z-index: 1000
`;
const Spacer = styled.View`
height: 60px;
`
const Title = styled.Text`
font-family: ABeeZee;
font-style: normal;
font-weight: normal;
font-size: 21px;
line-height: 25px;
color: #FFFFFF;
   paddingHorizontal: 25px;
   paddingBottom: 5px;
`

const SubText = styled.Text`
font-family: ABeeZee;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 17px;
color: #FFFFFF;
opacity: 0.8;
   paddingHorizontal: 25px;
`