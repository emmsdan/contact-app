import React from 'react';
import {Text, View, Animated, Pressable,Share } from 'react-native';
// @ts-ignore
import styled from "styled-components/native";
import PhoneSvgComponent from "../svgs/phone";
import MessageSvgComponent from "../svgs/Message";
import MailSvgComponent from "../svgs/Mail";
import ShareSvgComponent from "../svgs/Share";
import colors from "../constant/colors";
import {colorfulLanguage, ifNotEmpty} from "../shared/function";
import MoreSvgComponent from "../svgs/More";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import layout from "../constant/layout";

type IContactCard = {
    avatar:string;
    name: string;
    email: string;
    phone: string;
    description: string;
    onPress: Function
}
const EmailIconType = (email: string) => {
    const gmail = email.toLowerCase().endsWith('@gmail.com');
    const outlook = email.toLowerCase().endsWith('@outlook.com');
    const yahoo = email.toLowerCase().endsWith('@yahoo.com');
    const color = colors.icon
    return () => {
        if (gmail) return <MaterialCommunityIcons name="gmail" size={24} color={color}/>
        if (outlook) return <MaterialCommunityIcons name="yahoo" size={24} color={color}/>
        if (yahoo) return <MaterialCommunityIcons name="microsoft-outlook" size={24} color={color}/>
        return <MaterialCommunityIcons name="email-outline" size={24} color={color} />
    }
}
const DropInView = (props: any) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                useNativeDriver: false,
                toValue: 150,
                duration: 500
            }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                height: fadeAnim,
                overflow: 'hidden'
            }}
        >
            {props.children}
        </Animated.View>
    );
}
export const List  = ({ icon: Icon, text, border}: any) => {
    return (text ? <View style={{ flexDirection: 'row', marginVertical: 3}}>
        <View style={{ justifyContent: "center", flexDirection: 'row', borderColor: colors.grayDark,  borderRadius: 50, borderWidth: 1, marginLeft:  -22, marginRight: 15, padding: 3, backgroundColor: colors.background }}>
            <Icon stroke={colors.background} />
        </View>
        <ListText selectable selectionColor={colors.background}>{text}</ListText>
    </View> : <></>);
}

export default function ContactCard({ avatar, name, email, phone, description, onPress }: IContactCard) {
    const [showDetails, shouldShowDetails] = React.useState(false)
    const uri ='https://s3-alpha-sig.figma.com/img/7e92/6ae1/333d4f8377de9650839f1ed90cabec13?Expires=1618185600&Signature=LOPH21n8uX9n06W0egmeS~b7faDNr6BK2Xkne~bGOmdckykvLShrExPpqBON3-z6gBGEh1R~HCX~-rPW5lFwQIqkmiLy3c7wnVl9PSSU4mah~GPXi6ErmFsg-JLNg4X0iEGlFUQdqpSp6cjHiT1GcBsrsIdxUXEzoXuPEFZiHsytpSJUZjYd2XjjmOLc7E2temERv73PFyvcSpUFevIra7H57PGRirsw4NHU3DhQvb1fY7RIxNIEUlyO0MNveKTvro0-HGi636tDP1J1wkPPoZ17b5rG8XgGEGoa6DP8M~bloeMiWZ5dvOa8GKOFQ95y4K4PWSyPC5PnBbdXfi6OXw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'

    const border = { borderColor: '#EEEEEE', borderBottomWidth: 1, borderTopWidth: 1 }

    const customOnPress = () => {
        shouldShowDetails(!showDetails);
        if (onPress) onPress();
    }
    const openUrl = (page: string) => Linking.openURL(page);
    const onShare = (tel:string) => async () => {
        try {
            const result = await Share.share({
                message: tel,
            });

        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <Container style={ showDetails ? border : {} }>
            <PressableObject onPress={customOnPress}>
                <GenerateImage style={{ backgroundColor: colorfulLanguage(name)}}>
                    <Text style={{ fontSize: 26, color: colorfulLanguage(name, true)}}>
                        {name[0]}
                    </Text>
                </GenerateImage>
                <View style={{ width: layout.window.width - 180, marginHorizontal: 20, }}>
                    <Title selectable selectionColor={colors.background}>{name}</Title>
                    <Phone selectable selectionColor={colors.background}>{phone}</Phone>
                </View>
                <View style={{ justifyContent: 'center', alignContent: 'center', width: 45 }}>
                    {showDetails ? <MoreSvgComponent horizontal /> :
                        <Pressable  onPress={() => openUrl(`tel:${phone}`)}>
                            <PhoneSvgComponent />
                        </Pressable>
                    }
                </View>
            </PressableObject>

            {
                ifNotEmpty(showDetails,
                   <DropInView>
                       <View>

                        <PressableObject style={{ marginVertical: 6}}>
                            <View  style={{ width: 10}} />
                            <Pressable  style={{ width: 10}} onPress={() => openUrl(`tel:${phone}`)}>
                                <PhoneSvgComponent />
                            </Pressable>

                            <Pressable  style={{ width: 30}}  onPress={() => openUrl(`sms:${phone}`)}>
                                <MessageSvgComponent />
                            </Pressable>

                            <Pressable  style={{ width: 30}}  onPress={() => openUrl(`mailto: ${email}`)}>
                                { email ? <MailSvgComponent /> : <></>}
                            </Pressable>

                            <Pressable  style={{ width: 30}}  onPress={onShare(phone)}>
                                <ShareSvgComponent />
                            </Pressable>

                            <View  style={{ width: 44}} />
                        </PressableObject>

                           {email || description ? <View style={{
                               borderLeftWidth: 2,
                               borderColor: '#8F92A1',
                               marginLeft: 30,
                               padding: 5,
                               paddingVertical: 20
                           }}>
                               <List icon={EmailIconType(email)} text={email}/>
                               <List icon={PhoneSvgComponent} text={description}/>
                           </View> : <></>}

                    </View>
                   </DropInView>)
            }

        </Container>
    );
}

const Container = styled.View`
  paddingVertical: 13px;
   maxWidth: 100%;
`;

const PressableObject = styled.Pressable`
  padding-right: 10px;
  flexDirection: row;
  justifyContent: space-between;
  width: 100%;
`;

const Title = styled.Text`
font-family: ABeeZee;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 20px;
color: #1E1F20;
`

const Phone = styled.Text`
    font-family: ABeeZee;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.grayDark};
`

const Image = styled.Image`
width: 48px;
height: 48px;
maxWidth: 48px;
borderRadius: 50px;
`
const GenerateImage = styled.View`
width: 48px;
height: 48px;
borderRadius: 5000px;
background: red;
   alignItems: center;
   justifyContent: center;
`
const ListText = styled.Text`
font-family: ABeeZee;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 22px;
color: ${colors.grayDark};
 paddingTop: 5px;
 borderBottomWidth: 1px;
 borderBottomColor: red;
`