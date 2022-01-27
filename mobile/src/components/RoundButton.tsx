import React from 'react';
import {Text, View, Animated, ImageBackground, Image, StatusBar} from 'react-native';
// @ts-ignore
import styled from "styled-components/native";
import colors from "../constant/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IContactCard = {
    children?: any;
    onPress?: Function;
    icon?: any
}
export default function RoundButton({ children, onPress, icon }: IContactCard) {

    return (
        <Container onPress={onPress}>
            { icon || <MaterialCommunityIcons name="plus" size={24} color="white" />}
        </Container>
    );
}

const Container = styled.Pressable`
   width: 58px;
   height: 58px;
   border-radius: 3000px;
   background: ${colors.blue};
   
   alignItems: center;
   justifyContent: center;
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