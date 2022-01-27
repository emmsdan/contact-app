import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import ContactCard from "../components/ContactCard";
// @ts-ignore
import Faker from 'faker'
import Header from "../components/Header";
import * as Contacts from 'expo-contacts';

// @ts-ignore
import styled from "styled-components/native";
import colors from "../constant/colors";
import layout from "../constant/layout";

import Footer from "../components/Footer";
import phone from "../svgs/phone";
export default function ContactList() {

    const [text, onChangeText] = React.useState("Useless Text");
    const [searchInputValue, setSearchInputValue] = React.useState(null);
    const [contacts, getContacts] = React.useState<null | [] | {}>(null)
    const [defaultContacts, getDefaultContacts] = React.useState<null | [] | {}>(null)
    const fields = [Contacts.Fields.Emails, Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Company, Contacts.Fields.JobTitle];
    React.useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            console.log({status})
            if (status === 'granted') {
                const req = await Contacts.getContactsAsync({fields, pageSize: 500,
                    pageOffset: 0, });

                if (req.data.length > 0) {
                    getContacts(req.data)
                    getDefaultContacts(req.data)
                }
            }
        })();
    }, []);
    const onChangeSearchInput = (value: any) => {
        setSearchInputValue(value);
        const contacts = Array.isArray(defaultContacts) ? defaultContacts.filter(contact => {
            return JSON.stringify(contact).toLowerCase().includes(value.toString().toLowerCase());
        }) : [];

        getContacts(contacts)
    }
    return (
        <View style={styles.container}>
            <Header text={'Here are all your synced contacts'}>
                <Spacer />
                <Input
                    onChangeText={onChangeSearchInput}
                    value={searchInputValue}
                    placeholder="Search contaxt"
                    placeholderTextColor={colors.grayDark}
                />
            </Header>
            <Spacer />
            <Spacer />

            <ScrollView style={{ marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
            {
               contacts && Array.isArray(contacts) ?
                contacts.map((contact: any) =>  {
                    const phone = (contact.phoneNumbers ? contact.phoneNumbers[0] : {}).number
                    const email = String((contact.emails ? contact.emails[0] :  {}).email || '')
                    const description = contact.company || contact.jobTitle;
                    return <ContactCard key={contact.id} avatar={'https://picsum.photos/200'} name={contact.name} email={email} phone={phone} description={description} onPress={()=>{}} />
                })
                   : contacts ? <NotFoundText>No contact</NotFoundText> :             <ActivityIndicator size="large" color={colors.icon} />
            }

                <Spacer />
                <Spacer />
                <Spacer />
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

const Input = styled.TextInput`
width: ${layout.window.width - 40}px;
height: 50px;

background: #FFFFFF;
box-shadow: 3px 5px 20px rgba(182, 182, 182, 0.15);
border-radius: 3100px;
paddingHorizontal: 30px;
marginHorizontal: 20px;
margin-bottom: -35px 
`

const Spacer = styled.View`
height: 30px;
`

const NotFoundText = styled.Text`
text-align: center;
font-size: 25px;
`