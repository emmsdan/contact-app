import React from 'react';
import {Text, View, Animated, ImageBackground, Image, StatusBar} from 'react-native';
// @ts-ignore
import styled from "styled-components/native";
import colors from "../constant/colors";
import layout from "../constant/layout";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ContactSvgComponent from "../svgs/Contact";
import SettingsSvgComponent from "../svgs/Settings";
import RoundButton from "./RoundButton";

type IContactCard = {
    children?: any;
    text?: string;
}
export default function Footer({ children, text }: IContactCard) {
    const [showDetails, shouldShowDetails] = React.useState(false)


    const name = 'EmmsDan'
    return (
        <Container>
            <Image  source={require('../assets/footer.png')} style={{ width: layout.window.width, height: 150, position: "absolute"}} />
            <MenuNav>
                <Item>
                    <ContactSvgComponent active={true} />
                </Item>
                <Item>
                <SettingsSvgComponent />
                </Item>

                <RoundButton />
            </MenuNav>
        </Container>
    );
}

const Container = styled.View`
   width: 100%;
   height: 140px;
   position: absolute;
   bottom: 0;
`;

const Item = styled.Pressable`
padding: 15px; 
margin-top: 40px
`

const MenuNav = styled.View`
    flex: 1;
    flex-direction: row;
   justifyContent: space-between;
   alignItems: center;
   padding: 15px;
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